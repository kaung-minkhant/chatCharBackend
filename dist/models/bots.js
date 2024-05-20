"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotsSchema = void 0;
const bot_personas_1 = require("./bot_personas");
const bot_communication_styles_1 = require("./bot_communication_styles");
const bot_purposes_1 = require("./bot_purposes");
const language_1 = require("./language");
const zod_1 = require("zod");
exports.BotsSchema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    created_at: zod_1.z.string().date().optional(),
    updated_at: zod_1.z.string().date().optional(),
    instruction: zod_1.z.string(),
    personality: zod_1.z.union([zod_1.z.number(), bot_personas_1.BotPersonasSchema]),
    communication_style: zod_1.z.union([zod_1.z.number(), bot_communication_styles_1.BotCommunicationStylesSchema]),
    purpose: zod_1.z.union([zod_1.z.number(), bot_purposes_1.BotPurposesSchema]),
    language: zod_1.z.union([zod_1.z.number(), language_1.LanguageSchema]),
});
