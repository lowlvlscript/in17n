"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.In17n = void 0;
const framework_1 = require("@sapphire/framework");
const In17nHandler_1 = require("./utils/In17nHandler");
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class In17n {
    static preInitializationHook(_options) {
        this.i18n = new In17nHandler_1.In17nHandler(this);
    }
    static async preLoginHook(_options) {
        await this.i18n.init();
    }
    static [framework_1.preInitialization](_options) {
        this.i18n = new In17nHandler_1.In17nHandler(this);
    }
    static async [framework_1.preLogin](_options) {
        await this.i18n.init();
    }
}
exports.In17n = In17n;
//# sourceMappingURL=In17n.js.map