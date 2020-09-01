"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.In17nHandler = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const framework_1 = require("@sapphire/framework");
const discord_js_1 = require("discord.js");
const RootDir_1 = require("@sapphire/framework/dist/lib/utils/RootDir");
const i18next_1 = __importDefault(require("i18next"));
const i18next_fs_backend_1 = __importDefault(require("i18next-fs-backend"));
const path_1 = require("path");
const utilities_1 = require("@sapphire/utilities");
const fs_1 = require("fs");
class In17nHandler {
    client;
    languagesLoaded = false;
    languages;
    languagesDir = path_1.join(RootDir_1.getRootDirectory(), 'languages');
    backendOptions;
    constructor(client) {
        this.client = client;
        this.backendOptions = utilities_1.mergeDefault({
            loadPath: path_1.join(this.languagesDir, '{{lng}}', '{{ns}}.json'),
            addPath: this.languagesDir
        }, this.client.options.i18n?.backend);
    }
    async init(walkDir) {
        const { namespaces, languages } = await this.walkLanguageDirectory(walkDir ?? this.languagesDir);
        i18next_1.default.use(i18next_fs_backend_1.default);
        await i18next_1.default.init(utilities_1.mergeDefault({
            backend: this.backendOptions,
            fallbackLng: 'en-US',
            initImmediate: false,
            load: 'all',
            ns: namespaces,
            preload: languages
        }, this.client.options.i18n?.i18next));
        this.languages = new discord_js_1.Collection(languages.map(item => [item, i18next_1.default.getFixedT(item)]));
        this.languagesLoaded = true;
    }
    async resolveNameFromMessage(message) {
        const lang = await this.client.fetchLanguage(message);
        return lang ?? message.guild?.preferredLocale ?? this.client.options.i18n?.defaultName ?? 'en-US';
    }
    resolveValue(name, key, replace, options = {}) {
        if (!this.languagesLoaded)
            throw new framework_1.UserError('In17nLanguagesNotLoaded', 'Cannot call this method until In17nHandler#init has been called');
        const language = this.languages.get(name);
        if (!language)
            throw new framework_1.UserError('In17nLanguageNotFound', 'Invalid language provided');
        return language(key, utilities_1.mergeDefault({ defaultValue: language('default:DEFAULT', { fallbackLng: 'en-US', replace: { key } }), replace }, options));
    }
    async walkLanguageDirectory(dir, namespaces = [], folderName = '') {
        const files = await fs_1.promises.readdir(dir);
        const languages = [];
        for (const file of files) {
            const stat = await fs_1.promises.stat(path_1.join(dir, file));
            if (stat.isDirectory()) {
                const isLanguage = file.includes('-');
                if (isLanguage)
                    languages.push(file);
                ({ namespaces } = await this.walkLanguageDirectory(path_1.join(dir, file), namespaces, isLanguage ? '' : `${file}/`));
            }
            else {
                namespaces.push(`${folderName}${file.substr(0, file.length - 5)}`);
            }
        }
        return { namespaces: [...new Set(namespaces)], languages };
    }
}
exports.In17nHandler = In17nHandler;
//# sourceMappingURL=In17nHandler.js.map