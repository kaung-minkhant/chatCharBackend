import { BotPersonasSchema } from "./bot_personas";
import { BotCommunicationStylesSchema } from "./bot_communication_styles";
import { BotPurposesSchema } from "./bot_purposes";
import { LanguageSchema } from "./language";

import { z } from "zod";

export const BotsSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  description: z.string(),
  created_at: z.string().date().optional(),
  updated_at: z.string().date().optional(),
  instruction: z.string(),
  personality: z.union([z.number(), BotPersonasSchema]),
  communication_style: z.union([z.number(), BotCommunicationStylesSchema]),
  purpose: z.union([z.number(), BotPurposesSchema]),
  language: z.union([z.number(), LanguageSchema]),
});

export type BotsType = z.infer<typeof BotsSchema>;
