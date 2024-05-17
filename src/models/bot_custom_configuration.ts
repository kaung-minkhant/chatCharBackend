import {z} from 'zod'
import { BotsSchema } from './bots'
import { BotPersonasSchema } from './bot_personas'
import { LanguageSchema } from './language'

export const BotCustomConfigurationSchema = z.object({
  id: z.number().optional(),
  created_at: z.string().date().optional(),
  user_id: z.string().uuid(),
  bot_id: z.union([z.number(), BotsSchema]),
  persona_id: z.union([z.number(), BotPersonasSchema]),
  language: z.union([z.number(), LanguageSchema]),
  name: z.string(),
})

export type BotCustomConfigurationType = z.infer<typeof BotCustomConfigurationSchema>