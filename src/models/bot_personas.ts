import {z} from 'zod'
import { BotGenderSchema } from './bot_gender'
import { LanguageSchema } from './language'

export const BotPersonasSchema = z.object({
  id: z.number().optional(),
  created_at: z.string().date().optional(),
  myanmar: z.string().optional(),
  english: z.string().optional(),
  chinese: z.string().optional(),
  user_created: z.boolean(),
  gender: z.union([z.number(), BotGenderSchema]),
  name: z.string(),
  avarter_url: z.string().optional(),
  language: z.union([z.number(), LanguageSchema]),
})

export type BotPersonasType = z.infer<typeof BotPersonasSchema>