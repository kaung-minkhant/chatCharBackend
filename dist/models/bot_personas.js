"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotPersonasSchema = void 0;
const zod_1 = require("zod");
const bot_gender_1 = require("./bot_gender");
const language_1 = require("./language");
exports.BotPersonasSchema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    created_at: zod_1.z.string().date().optional(),
    myanmar: zod_1.z.string().optional(),
    english: zod_1.z.string().optional(),
    chinese: zod_1.z.string().optional(),
    user_created: zod_1.z.boolean(),
    gender: zod_1.z.union([zod_1.z.number(), bot_gender_1.BotGenderSchema]),
    name: zod_1.z.string(),
    avarter_url: zod_1.z.string().optional(),
    language: zod_1.z.union([zod_1.z.number(), language_1.LanguageSchema]),
});
