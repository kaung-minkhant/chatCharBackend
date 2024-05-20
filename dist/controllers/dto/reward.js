"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiveRewardDtoSchema = exports.TaskTypesSchema = void 0;
const zod_1 = require("zod");
exports.TaskTypesSchema = zod_1.z.enum(['SignUp', 'ProfileSetup', 'AiSetup'], {
    required_error: "taskType is required"
});
exports.GiveRewardDtoSchema = zod_1.z.object({
    taskType: exports.TaskTypesSchema
});
