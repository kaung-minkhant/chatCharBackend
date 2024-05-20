"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilesSchema = void 0;
const age_1 = require("./age");
const gender_1 = require("./gender");
const language_1 = require("./language");
const zod_1 = require("zod");
exports.ProfilesSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    user_name: zod_1.z.string(),
    bio: zod_1.z.string(),
    avatar_url: zod_1.z.string().url(),
    created_at: zod_1.z.string().date().optional(),
    updated_at: zod_1.z.string().date().optional(),
    age: zod_1.z.union([zod_1.z.number(), age_1.AgeSchema]),
    gender: zod_1.z.union([zod_1.z.number(), gender_1.GenderSchema]),
    language: zod_1.z.union([zod_1.z.number(), language_1.LanguageSchema]),
    interests: zod_1.z.array(zod_1.z.string()),
});
