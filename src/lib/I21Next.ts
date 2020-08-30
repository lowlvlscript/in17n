import { Plugin, postInitialization, preInitialization, SapphireClient } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';
import { join } from 'path';
import { I21NextHandler } from './utils/I21NextHandler';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class I21Next implements Plugin {

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public static preInitializationHook(this: SapphireClient, _options?: ClientOptions) {
		this.localization = new I21NextHandler('');
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public static postInitializationHook(this: SapphireClient, _options?: ClientOptions) {
		this.events.registerPath(join(__dirname, '..', 'events'));
	}

	public static [preInitialization](scopedThis: SapphireClient, options?: ClientOptions): void {
		return this.preInitializationHook.call(scopedThis, options);
	}

	public static [postInitialization](scopedThis: SapphireClient, options?: ClientOptions): void {
		return this.postInitializationHook.call(scopedThis, options);
	}

}

declare module 'discord.js' {
	interface Client {
		localization: I21NextHandler;
	}
}
