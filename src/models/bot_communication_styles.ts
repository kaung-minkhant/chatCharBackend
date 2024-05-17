import {z} from 'zod'

export const BotCommunicationStylesSchema = z.object({
  id: z.number().optional(),
  created_at: z.string().date().optional(),
  myanmar: z.string(),
  english: z.string(),
  chinese: z.string(),
})

export type BotCommunicationStylesType = z.infer<typeof BotCommunicationStylesSchema>