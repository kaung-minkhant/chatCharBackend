"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenTableSchema = void 0;
const task_master_1 = require("./task_master");
const zod_1 = require("zod");
const credit_types_1 = require("./credit_types");
exports.TokenTableSchema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    created_at: zod_1.z.string().date().optional(),
    debit: zod_1.z.boolean(),
    token: zod_1.z.number(),
    credit_type: zod_1.z.union([zod_1.z.number(), credit_types_1.CreditTypesSchema]),
    task_type: zod_1.z.union([zod_1.z.number(), task_master_1.TaskMasterSchema]),
    user_id: zod_1.z.string().uuid(),
});
