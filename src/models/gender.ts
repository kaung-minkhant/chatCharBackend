import { z } from "zod";

export const GenderSchema = z.object({
  id: z.number().optional(),
  gender_label: z.string(),
});

export type GenderType = z.infer<typeof GenderSchema>;