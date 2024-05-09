import express, {  Response } from "express";
import { AuthMiddleWare } from "../middlewares/auth";
import { AuthRequestObject, TaskRequestObject } from "../middlewares/type";
import { giveRewards } from "../handlers/rewards";

import dotenv from "dotenv";
import { RewardMiddleWare } from "../middlewares";
import { GiveRewardDto } from "./dto/reward";

dotenv.config();

const rewardsRouter = express.Router();

rewardsRouter.use(AuthMiddleWare);

rewardsRouter.use(RewardMiddleWare);

rewardsRouter.get("/", (req: AuthRequestObject, res: Response) => {
  res.status(200).send("Reward GET endpoint\n");
});

rewardsRouter.post("/", async (req: TaskRequestObject, res: Response) => {
  const supabase = req.supabase;
  const userId = req.user?.id;
  const taskMap = req.taskMap;
  const requestBody: GiveRewardDto = req.body;
  const taskType = requestBody.taskType
  const taskId = taskMap?.get(taskType)
  const { error, token, code } = await giveRewards(supabase!, userId!, taskId!);
  if (error) {
    res.status(code).send(error);
    return;
  }
  res.status(code).send({ token });
  return;
});

export default rewardsRouter;
