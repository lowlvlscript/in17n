"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const framework_1 = require("@sapphire/framework");
const index_1 = require("./index");
framework_1.SapphireClient.plugins.registerPreInitializationHook(index_1.In17n[framework_1.preInitialization], 'In17nPreInitialization');
framework_1.SapphireClient.plugins.registerPreLoginHook(index_1.In17n[framework_1.preLogin], 'In17nPreLogin');
tslib_1.__exportStar(require("./index"), exports);
//# sourceMappingURL=register.js.map