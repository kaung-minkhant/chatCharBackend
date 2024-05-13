import {z} from 'zod'

export const AgeSchema = z.object({
  id: z.number().optional(),
  age_label: z.number()
})

export type AgeType = z.infer<typeof AgeSchema>