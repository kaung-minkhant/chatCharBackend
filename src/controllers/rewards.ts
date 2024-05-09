import express, { Request, Response } from "express";
import { AuthMiddleWare } from "../middlewares/auth";
import { AuthRequestObject, TaskRequestObject } from "../middlewares/type";
import { giveRewards } from "../handlers";

import dotenv from "dotenv";
import { conlog } from "../helpers/utils";
import { RewardMiddleWare } from "../middlewares";

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
  // TODO: rethink of how to get taskType from client
  const taskMap = req.taskMap;
  const taskType = 'SignUp'
  const { error, token, code } = await giveRewards(supabase!, userId!, taskMap?.get(taskType)!);
  if (error) {
    res.status(code).send(error);
    return;
  }
  res.status(code).send({ token });
  return;
});

export default rewardsRouter;
