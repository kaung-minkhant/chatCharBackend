"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotPurposesSchema = void 0;
const zod_1 = require("zod");
exports.BotPurposesSchema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    created_at: zod_1.z.string().date().optional(),
    myanmar: zod_1.z.string(),
    english: zod_1.z.string(),
    chinese: zod_1.z.string(),
});
