"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/unbound-method */
const framework_1 = require("@sapphire/framework");
const In17n_1 = require("./lib/In17n");
framework_1.SapphireClient.plugins.registerPreInitializationHook(In17n_1.In17n.preInitializationHook);
framework_1.SapphireClient.plugins.registerPreLoginHook(In17n_1.In17n.preLoginHook);
//# sourceMappingURL=register.js.map