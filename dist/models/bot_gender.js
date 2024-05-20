"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotGenderSchema = void 0;
const zod_1 = require("zod");
exports.BotGenderSchema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    gender_label: zod_1.z.string(),
});
