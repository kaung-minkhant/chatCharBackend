import { z } from "zod";

export const TaskMasterSchema = z.object({
  id: z.number().optional(),
  created_at: z.string().date().optional(),
  task: z.string(),
  token: z.number(),
});

export type TaskMasterType = z.infer<typeof TaskMasterSchema>;
