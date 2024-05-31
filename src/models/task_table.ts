import { ModelTypeSchema } from '../controllers/dto/token';
import { TaskMasterSchema} from './task_master'

import { z } from "zod";

export const TaskTableSchema = z.object({
  id: z.number().optional(),
  created_at: z.string().date().optional(),
  complete: z.boolean(),
  token: z.number(),
  user_id: z.string().uuid(),
  type: z.union([z.number(), TaskMasterSchema]),
  model: ModelTypeSchema
});

export type TaskTableType = z.infer<typeof TaskTableSchema>;
