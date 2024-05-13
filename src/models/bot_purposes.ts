import {z} from 'zod'

export const BotPurposesSchema = z.object({
  id: z.number().optional(),
  created_ad: z.string().date().optional(),
  myanmar: z.string(),
  english: z.string(),
  chinese: z.string(),
})

export type BotPurposesType = z.infer<typeof BotPurposesSchema>