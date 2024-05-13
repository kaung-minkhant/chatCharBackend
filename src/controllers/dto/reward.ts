import {z} from 'zod'

export const TaskTypesSchema = z.enum(['SignUp', 'ProfileSetup', 'AiSetup'], {
  required_error: "taskType is required"
})

export const GiveRewardDtoSchema = z.object({
  taskType: TaskTypesSchema
})


export type TaskTypesType = z.infer<typeof TaskTypesSchema>
export type GiveRewardDtoType = z.infer<typeof GiveRewardDtoSchema>