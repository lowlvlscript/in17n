import { Plugin, preInitialization, preLogin, SapphireClient } from '@sapphire/framework';
import { Awaited } from '@sapphire/pieces';
import type { ClientOptions, Message } from 'discord.js';
import { InitOptions } from 'i18next';
import { i18nextFsBackend } from 'i18next-fs-backend';
import { In17nHandler } from './utils/In17nHandler';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class In17n implements Plugin {

	public static preInitializationHook(this: SapphireClient, _options: ClientOptions) {
		this.i18n = new In17nHandler(this);
	}

	public static async preLoginHook(this: SapphireClient, _options: ClientOptions) {
		await (this.i18n as In17nHandler).init();
	}

	public static [preInitialization](scopedThis: SapphireClient, options: ClientOptions): void {
		return this.preInitializationHook.call(scopedThis, options);
	}

	public static [preLogin](scopedThis: SapphireClient, options: ClientOptions): Promise<void> {
		return this.preLoginHook.call(scopedThis, options);
	}

}

export interface In17nFetchLanguage {
	(message: Message): Awaited<string | null>;
}

declare module 'discord.js' {
	interface Client {
		fetchLanguage: In17nFetchLanguage;
	}
}

declare module '@sapphire/framework' {
	interface ClientInternationalizationOptions {
		backend?: i18nextFsBackend.i18nextFsBackendOptions;
		i18next?: InitOptions;
	}
}