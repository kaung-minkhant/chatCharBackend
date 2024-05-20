"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageSchema = void 0;
const zod_1 = require("zod");
exports.LanguageSchema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    value: zod_1.z.string(),
    label: zod_1.z.string(),
});
