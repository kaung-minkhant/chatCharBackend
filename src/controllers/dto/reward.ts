import {z} from 'zod'

export const TaskTypesSchema = z.enum(['SignUp', 'ProfileSetup', 'AiSetup'], {
  required_error: "taskType is required: SignUp', 'ProfileSetup', 'AiSetup'",
  invalid_type_error: "Invalid taskType: SignUp, ProfileSetup, AiSetup"
})

/**
 * @swagger
 * components:
 *  schemas:
 *    GiveRewardDto:
 *      type: object
 *      required: [taskType]
 *      properties:
 *        taskType:
 *          type: string
 *          enum: [SignUp, ProfileSetup, AiSetup]
 */
export const GiveRewardDtoSchema = z.object({
  taskType: TaskTypesSchema
})


export type TaskTypesType = z.infer<typeof TaskTypesSchema>
export type GiveRewardDtoType = z.infer<typeof GiveRewardDtoSchema>