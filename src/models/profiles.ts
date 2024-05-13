import { AgeSchema } from "./age";
import { GenderSchema } from "./gender";
import { LanguageSchema } from "./language";

import { z } from "zod";

export const ProfilesSchema = z.object({
  id: z.number().optional(),
  username: z.string(),
  bio: z.string(),
  avatar_url: z.string().url(),
  created_at: z.string().date().optional(),
  updated_at: z.string().date().optional(),
  age: z.union([z.number(), AgeSchema]),
  gender: z.union([z.number(), GenderSchema]),
  profiles: z.union([z.number(), LanguageSchema]),
});

export type ProfilesType = z.infer<typeof ProfilesSchema>;
