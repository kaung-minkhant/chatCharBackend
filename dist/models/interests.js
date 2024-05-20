"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterestsSchema = void 0;
const zod_1 = require("zod");
exports.InterestsSchema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    interest_label: zod_1.z.string(),
    icon_name: zod_1.z.string(),
    color: zod_1.z.string(),
});
