"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskTableSchema = void 0;
const task_master_1 = require("./task_master");
const zod_1 = require("zod");
exports.TaskTableSchema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    created_at: zod_1.z.string().date().optional(),
    complete: zod_1.z.boolean(),
    token: zod_1.z.number(),
    user_id: zod_1.z.string().uuid(),
    type: zod_1.z.union([zod_1.z.number(), task_master_1.TaskMasterSchema])
});
