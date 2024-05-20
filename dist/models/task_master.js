"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskMasterSchema = void 0;
const zod_1 = require("zod");
exports.TaskMasterSchema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    created_at: zod_1.z.string().date().optional(),
    task: zod_1.z.string(),
    token: zod_1.z.number(),
});
