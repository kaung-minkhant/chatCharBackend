export type TaskTypes = 'SignUp' | 'ProfileSetup' | 'AiSetup'

export interface GiveRewardDto {
  taskType: TaskTypes 
}