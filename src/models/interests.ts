import {z} from 'zod'

export const InterestsSchema = z.object({
  id: z.number().optional(),
  interest_label: z.string(),
  icon_name: z.string(),
  color: z.string(),
})

export type InterestsType = z.infer<typeof InterestsSchema>