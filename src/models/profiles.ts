import { AgeSchema } from "./age";
import { GenderSchema } from "./gender";
import { LanguageSchema } from "./language";

import { z } from "zod";

export const ProfilesSchema = z.object({
  id: z.string().uuid(),
  user_name: z.string(),
  bio: z.string(),
  avatar_url: z.string().url(),
  created_at: z.string().date().optional(),
  updated_at: z.string().date().optional(),
  age: z.union([z.number(), AgeSchema]),
  gender: z.union([z.number(), GenderSchema]),
  language: z.union([z.number(), LanguageSchema]),
  interests: z.array(z.string()),
});

export type ProfilesType = z.infer<typeof ProfilesSchema>;
