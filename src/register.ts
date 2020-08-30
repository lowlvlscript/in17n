/* eslint-disable @typescript-eslint/unbound-method */
import { SapphireClient } from '@sapphire/framework';
import { In17n } from './lib/In17n';

SapphireClient.plugins.registerPreInitializationHook(In17n.preInitializationHook);
SapphireClient.plugins.registerPreLoginHook(In17n.preLoginHook);
