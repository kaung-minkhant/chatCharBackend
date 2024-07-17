/**
 * @swagger
 * tags:
 *  name: Reward
 * /rewards:
 *  get:
 *    summary: Get Rewards (unimplemented)
 *    tags: [Reward]
 *    responses:
 *      200:
 *        description: The rewards of the user
 *  post:
 *    summary: Give a reward to user
 *    tags: [Reward]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/GiveRewardDto'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *      404:
 *        description: TaskType not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error: 
 *                  type: string
 *                  description: error string
 *      500:
 *        description: Internal Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error: 
 *                  type: string
 *                  description: error string
 */

import express, { Response } from "express";
import { AuthRequestObject, RewardRequestObject } from "../middlewares/type";
import { deleteAllRewards, giveRewards } from "../handlers/rewards";

import { RewardMiddleWare } from "../middlewares";
import { GiveRewardDtoSchema, GiveRewardDtoType } from "./dto/reward";
import { ControllerResponseObject } from "./types";
import { conlog, formatZodIssuesWithPath } from "../helpers/utils";

const rewardsRouter = express.Router();

rewardsRouter.use("/", RewardMiddleWare);

rewardsRouter.get("/", (req: RewardRequestObject, res: Response) => {
  res.status(200).send("Reward GET endpoint\n");
});

rewardsRouter.post("/", async (req: RewardRequestObject, res: Response) => {
  const supabase = req.supabase;
  const userId = req.user!.id;
  const taskMap = req.taskMap;
  const requestBody: GiveRewardDtoType = req.body;
  const response: ControllerResponseObject = {
    data: null,
    error: null,
  };
  if (req.newJwt) response.newJwt = req.newJwt
  const results = GiveRewardDtoSchema.safeParse(requestBody)
  if (!results.success) {
    const error = formatZodIssuesWithPath(results.error.issues, Object.keys(GiveRewardDtoSchema.shape), false);
    response.error = error;
    res.status(404).send(response);
    return;
  }
  const task = taskMap?.get(requestBody.taskType);
  const { error, data, code } = await giveRewards(
    supabase!,
    userId!,
    task!.id,
    task!.token,
    requestBody.model
  );
  if (error) {
    response.error = error;
    res.status(code).send(response);
    return;
  }
  const token = data.token;
  response.data = { token };
  res.status(code).send(response);
  return;
});

rewardsRouter.delete("/all", async (req: RewardRequestObject, res: Response) => {
  const supabase = req.supabase;
  const {code, error} = await deleteAllRewards(supabase!)
  const response: ControllerResponseObject = {
    data: null,
    error: null,
  };
  if (error) {
    response.error = error
    return res.status(code).send(response)
  }
  return res.status(code).send(response)

})

export default rewardsRouter;
