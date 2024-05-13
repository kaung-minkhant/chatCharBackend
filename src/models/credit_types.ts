import { z } from "zod";

export const CreditTypesSchema = z.object({
  id: z.number().optional(),
  type: z.string()
});

export type CreditTypesType = z.infer<typeof CreditTypesSchema>;