import { TaskMasterSchema} from './task_master'

import { z } from "zod";

export const TaskTableSchema = z.object({
  id: z.number().optional(),
  created_at: z.string().date().optional(),
  complete: z.boolean(),
  token: z.number(),
  user_id: z.string().uuid(),
  type: z.union([z.number(), TaskMasterSchema])
});

export type TaskTableType = z.infer<typeof TaskTableSchema>;
