import { Plugin, preInitialization, preLogin, SapphireClient } from '@sapphire/framework';
import { Awaited } from '@sapphire/pieces';
import type { ClientOptions, Message } from 'discord.js';
import { InitOptions } from 'i18next';
import { i18nextFsBackend } from 'i18next-fs-backend';
import { join } from 'path';
import { I21NextHandler } from './utils/I21NextHandler';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class I21Next implements Plugin {

	public static preInitializationHook(this: SapphireClient, _options: ClientOptions) {
		this.i18n = new I21NextHandler(this);
	}

	public static preLoginHook(this: SapphireClient, _options: ClientOptions) {
		this.events.registerPath(join(__dirname, '..', 'events'));
	}

	public static [preInitialization](scopedThis: SapphireClient, options: ClientOptions): void {
		return this.preInitializationHook.call(scopedThis, options);
	}

	public static [preLogin](scopedThis: SapphireClient, options: ClientOptions): void {
		return this.preLoginHook.call(scopedThis, options);
	}

}

export interface I21NextFetchLanguage {
	(message: Message): Awaited<string | null>;
}

declare module 'discord.js' {
	interface Client {
		fetchLanguage: I21NextFetchLanguage;
	}
}

declare module '@sapphire/framework' {
	interface ClientInternationalizationOptions {
		backend: i18nextFsBackend.i18nextFsBackendOptions;
		i18next: InitOptions;
	}
}
