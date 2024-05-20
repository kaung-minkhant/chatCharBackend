"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotCustomConfigurationSchema = void 0;
const zod_1 = require("zod");
const bots_1 = require("./bots");
const bot_personas_1 = require("./bot_personas");
const language_1 = require("./language");
exports.BotCustomConfigurationSchema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    created_at: zod_1.z.string().date().optional(),
    user_id: zod_1.z.string().uuid(),
    bot_id: zod_1.z.union([zod_1.z.number(), bots_1.BotsSchema]),
    persona_id: zod_1.z.union([zod_1.z.number(), bot_personas_1.BotPersonasSchema]),
    language: zod_1.z.union([zod_1.z.number(), language_1.LanguageSchema]),
    name: zod_1.z.string(),
});
