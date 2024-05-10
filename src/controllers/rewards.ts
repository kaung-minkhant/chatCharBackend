import express, { Response } from "express";
import { AuthRequestObject, RewardRequestObject } from "../middlewares/type";
import { giveRewards } from "../handlers/rewards";

import { RewardMiddleWare } from "../middlewares";
import { GiveRewardDto } from "./dto/reward";
import { ControllerResponseObject } from "./types";

const rewardsRouter = express.Router();

rewardsRouter.use("/", RewardMiddleWare);

rewardsRouter.get("/", (req: AuthRequestObject, res: Response) => {
  res.status(200).send("Reward GET endpoint\n");
});

rewardsRouter.post("/", async (req: RewardRequestObject, res: Response) => {
  const supabase = req.supabase;
  const userId = req.user!.id;
  const taskMap = req.taskMap;
  const requestBody: GiveRewardDto = req.body;
  const task = taskMap?.get(requestBody.taskType);
  const response: ControllerResponseObject = {
    code: 200,
    data: null,
    error: null,
  };
  if (!task) {
    response.code = 404;
    response.error = "Task not found";
    res.status(404).send(response);
    return;
  }
  const { error, data, code } = await giveRewards(
    supabase!,
    userId!,
    task!.id,
    task!.token
  );
  if (error) {
    response.code = code;
    response.error = error;
    res.status(code).send(response);
    return;
  }
  const token = data.token;
  response.data = { token };
  res.status(code).send({ token });
  return;
});

export default rewardsRouter;
