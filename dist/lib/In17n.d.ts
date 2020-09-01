import { Plugin, preInitialization, preLogin, SapphireClient } from '@sapphire/framework';
import { Awaited } from '@sapphire/pieces';
import type { ClientOptions, Message } from 'discord.js';
import { InitOptions } from 'i18next';
import { i18nextFsBackend } from 'i18next-fs-backend';
export declare class In17n implements Plugin {
    static preInitializationHook(this: SapphireClient, _options: ClientOptions): void;
    static preLoginHook(this: SapphireClient, _options: ClientOptions): Promise<void>;
    static [preInitialization](this: SapphireClient, _options: ClientOptions): void;
    static [preLogin](this: SapphireClient, _options: ClientOptions): Promise<void>;
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
//# sourceMappingURL=In17n.d.ts.map