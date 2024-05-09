import express, { Response } from "express";
import { AuthRequestObject, RewardRequestObject } from "../middlewares/type";
import { giveRewards } from "../handlers/rewards";

import dotenv from "dotenv";
import { RewardMiddleWare } from "../middlewares";
import { GiveRewardDto } from "./dto/reward";
import { ControllerResponseObject } from "./types";

dotenv.config();

const rewardsRouter = express.Router();


rewardsRouter.use('/', RewardMiddleWare);

rewardsRouter.get("/", (req: AuthRequestObject, res: Response) => {
  res.status(200).send("Reward GET endpoint\n");
});

rewardsRouter.post("/", async (req: RewardRequestObject, res: Response) => {
  const supabase = req.supabase;
  const userId = req.user!.id;
  const taskMap = req.taskMap;
  const requestBody: GiveRewardDto = req.body;
  const task = taskMap?.get(requestBody.taskType);
  const {
    error,
    data: { token },
    code,
  } = await giveRewards(supabase!, userId!, task!.id, task!.token);
  const response: ControllerResponseObject = {
    code: code,
    data: null,
    error: null,
  };
  if (error) {
    response.error = error
    res.status(code).send(response);
    return;
  }
  response.data = {token}
  res.status(code).send({ token });
  return;
});

export default rewardsRouter;
