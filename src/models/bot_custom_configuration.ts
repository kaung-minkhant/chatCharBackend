import {z} from 'zod'

export const BotCustomConfigurationSchema = z.object({
  id: z.number().optional(),
  created_ad: z.string().date().optional(),
  user_id: z.string().uuid()
})

export type BotCustomConfigurationType = z.infer<typeof BotCustomConfigurationSchema>