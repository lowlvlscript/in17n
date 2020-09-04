import { preInitialization, preLogin, SapphireClient } from '@sapphire/framework';
import { In17n } from './index';

SapphireClient.plugins.registerPreInitializationHook(In17n[preInitialization], 'In17nPreInitialization');
SapphireClient.plugins.registerPreLoginHook(In17n[preLogin], 'In17nPreLogin');

export * from './index';
