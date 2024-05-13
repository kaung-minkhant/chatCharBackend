import {z} from 'zod'

export const BotPersonasSchema = z.object({
  id: z.number().optional(),
  created_ad: z.string().date().optional(),
  myanmar: z.string(),
  english: z.string(),
  chinese: z.string(),
})

export type BotPersonasType = z.infer<typeof BotPersonasSchema>