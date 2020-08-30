import { IInternationalization, SapphireClient } from '@sapphire/framework';
import { Collection, Message } from 'discord.js';
import { StringMap, TFunction, TOptions } from 'i18next';
export declare class In17nHandler implements IInternationalization {
    private readonly client;
    languagesLoaded: boolean;
    languages: Collection<string, TFunction>;
    private readonly languagesDir;
    private readonly backendOptions;
    constructor(client: SapphireClient);
    init(walkDir?: string): Promise<void>;
    resolveNameFromMessage(message: Message): Promise<string>;
    resolveValue(name: string, key: string, replace: Record<string, unknown>, options?: TOptions<StringMap>): Promise<string>;
    private walkLanguageDirectory;
}
//# sourceMappingURL=In17nHandler.d.ts.map