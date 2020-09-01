/* eslint-disable @typescript-eslint/naming-convention */
import { IInternationalization, SapphireClient, UserError } from '@sapphire/framework';
import { Collection, Message } from 'discord.js';
import { getRootDirectory } from '@sapphire/framework/dist/lib/utils/RootDir';
import i18next, { InitOptions, StringMap, TFunction, TOptions } from 'i18next';
import Backend, { i18nextFsBackend } from 'i18next-fs-backend';
import { join } from 'path';
import { mergeDefault } from '@sapphire/utilities';
import { promises } from 'fs';

export class In17nHandler implements IInternationalization {

	public languagesLoaded = false;
	public languages!: Collection<string, TFunction>;

	private readonly languagesDir: string = join(getRootDirectory(), 'languages');
	private readonly backendOptions: i18nextFsBackend.i18nextFsBackendOptions;

	public constructor(private readonly client: SapphireClient) {
		this.backendOptions = mergeDefault({
			loadPath: join(this.languagesDir, '{{lng}}', '{{ns}}.json'),
			addPath: this.languagesDir
		} as i18nextFsBackend.i18nextFsBackendOptions, this.client.options.i18n?.backend);
	}

	public async init(walkDir?: string) {
		const { namespaces, languages } = await this.walkLanguageDirectory(walkDir ?? this.languagesDir);

		i18next.use(Backend);
		await i18next.init(mergeDefault({
			backend: this.backendOptions,
			fallbackLng: 'en-US',
			initImmediate: false,
			load: 'all',
			ns: namespaces,
			preload: languages
		} as InitOptions, this.client.options.i18n?.i18next));

		this.languages = new Collection(languages.map(item => [item, i18next.getFixedT(item)]));
		this.languagesLoaded = true;
	}

	public async resolveNameFromMessage(message: Message) {
		const lang = await this.client.fetchLanguage(message);
		return lang ?? message.guild?.preferredLocale ?? this.client.options.i18n?.defaultName ?? 'en-US';
	}

	public resolveValue(name: string, key: string, replace: Record<string, unknown>, options: TOptions<StringMap> = {}): Promise<string> {
		if (!this.languagesLoaded) throw new UserError('In17nLanguagesNotLoaded', 'Cannot call this method until In17nHandler#init has been called');

		const language = this.languages.get(name);
		if (!language) throw new UserError('In17nLanguageNotFound', 'Invalid language provided');

		return language(key, mergeDefault({ defaultValue: language('default:DEFAULT', { fallbackLng: 'en-US', replace: { key } }), replace }, options));
	}

	private async walkLanguageDirectory(dir: string, namespaces: string[] = [], folderName = '') {
		const files = await promises.readdir(dir);

		const languages: string[] = [];
		for (const file of files) {
			const stat = await promises.stat(join(dir, file));
			if (stat.isDirectory()) {
				const isLanguage = file.includes('-');
				if (isLanguage) languages.push(file);

				({ namespaces } = await this.walkLanguageDirectory(join(dir, file), namespaces, isLanguage ? '' : `${file}/`));
			} else {
				namespaces.push(`${folderName}${file.substr(0, file.length - 5)}`);
			}
		}

		return { namespaces: [...new Set(namespaces)], languages };
	}

}
