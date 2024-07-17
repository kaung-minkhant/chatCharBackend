import express, { Response } from "express";
import { AuthRequestObject } from "../middlewares/type";
import { getMessageToken, getTokenBalance } from "../handlers";
import { ControllerResponseObject } from "./types";
import { MessageTokenDtoSchema, MessageTokenDtoType } from "./dto/token";
import { formatZodIssuesWithPath } from "../helpers/utils";

const tokenRouter = express.Router();

tokenRouter.get("/balance", async (req: AuthRequestObject, res: Response) => {
  const supabase = req.supabase;
  const response: ControllerResponseObject = {
    data: null,
    error: null,
  };
  if (req.newJwt) response.newJwt = req.newJwt
  const { data, error, code } = await getTokenBalance(supabase!);
  if (error) {
    response.error = error;
    return res.status(code).send(response);
  }
  response.data = data;
  return res.status(code).send(response);
});

tokenRouter.post("/", (req: AuthRequestObject, res: Response) => {
  const body: MessageTokenDtoType = req.body;
  const results = MessageTokenDtoSchema.safeParse(body)
  const response: ControllerResponseObject = {
    data: null,
    error: null,
  };
  if (!results.success) {
    const error = formatZodIssuesWithPath(results.error.issues, Object.keys(MessageTokenDtoSchema.shape), false);
    response.error = error;
    res.status(400).send(response);
    return;
  }
  const {code, data, error} = getMessageToken(body.messages, body.model)
  if (error) {
    response.error = error;
    return res.status(code).send(response)
  }
  response.data = data;
  return res.status(code).send(response)
  
})

export default tokenRouter;
