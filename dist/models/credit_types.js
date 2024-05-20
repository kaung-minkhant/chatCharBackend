"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditTypesSchema = void 0;
const zod_1 = require("zod");
exports.CreditTypesSchema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    type: zod_1.z.string()
});
