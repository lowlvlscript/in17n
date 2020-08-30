import { Plugin, preInitialization, preLogin, SapphireClient } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';
import { join } from 'path';
import { I21NextHandler } from './utils/I21NextHandler';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class I21Next implements Plugin {

	public static preInitializationHook(this: SapphireClient, _options: ClientOptions) {
		this.localization = new I21NextHandler('');
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

declare module 'discord.js' {
	interface Client {
		localization: I21NextHandler;
	}
}
