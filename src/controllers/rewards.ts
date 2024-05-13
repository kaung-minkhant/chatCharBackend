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
  const task = taskMap?.get(requestBody.taskType);
  const response: ControllerResponseObject = {
    code: 200,
    data: null,
    error: null,
  };
  const results = GiveRewardDtoSchema.safeParse(requestBody)
  if (!results.success) {
    response.code = 404;
    const error = formatZodIssuesWithPath(results.error.issues, Object.keys(GiveRewardDtoSchema.shape), false);
    response.error = error;
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

rewardsRouter.delete("/all", async (req: RewardRequestObject, res: Response) => {
  const supabase = req.supabase;
  const {code, error} = await deleteAllRewards(supabase!)
  const response: ControllerResponseObject = {
    code: 200,
    data: null,
    error: null,
  };
  if (error) {
    response.code = code;
    response.error = error
    return res.status(code).send(response)
  }
  return res.status(200).send(response)

})

export default rewardsRouter;
