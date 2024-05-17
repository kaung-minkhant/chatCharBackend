import { z } from "zod";

export const BotGenderSchema = z.object({
  id: z.number().optional(),
  gender_label: z.string(),
});

export type BotGenderType = z.infer<typeof BotGenderSchema>;