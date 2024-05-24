/**
 * @swagger
 * components:
 *  schemas:
 *    ControllerResponse:
 *      type: object
 *      required: [taskType]
 *      properties:
 *        taskType:
 *          type: string
 *          enum: [SignUp, ProfileSetup, AiSetup]
 */

export interface ControllerResponseObject {
  data: any | null;
  error: any | null;
}