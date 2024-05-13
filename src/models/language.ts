import { z } from "zod";

export const LanguageSchema = z.object({
  id: z.number().optional(),
  value: z.string(),
  label: z.string(),
});

export type LanguageType = z.infer<typeof LanguageSchema>;