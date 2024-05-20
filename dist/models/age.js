"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgeSchema = void 0;
const zod_1 = require("zod");
exports.AgeSchema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    age_label: zod_1.z.number()
});
