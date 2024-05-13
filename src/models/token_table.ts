import { TaskMasterSchema } from "./task_master";
import { z } from "zod";
import { CreditTypesSchema } from "./credit_types";

export const TokenTableSchema = z.object({
  id: z.number().optional(),
  created_at: z.string().date().optional(),
  debit: z.boolean(),
  token: z.number(),
  credit_type: z.union([z.number(), CreditTypesSchema]),
  task_type: z.union([z.number(), TaskMasterSchema]),
  user_id: z.string().uuid(),
});

export type TokenTableType = z.infer<typeof TokenTableSchema>;
