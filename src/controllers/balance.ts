import express, { Response } from "express";
import { AuthRequestObject } from "../middlewares/type";
import { getBalance } from "../handlers";
import { ControllerResponseObject } from "./types";

const balanceRouter = express.Router();

balanceRouter.get("/", async (req: AuthRequestObject, res: Response) => {
  const supabase = req.supabase;
  const response: ControllerResponseObject = {
    code: 200,
    data: null,
    error: null,
  };
  const { data, error, code } = await getBalance(supabase!);
  if (error) {
    response.code = code;
    response.error = error;
    return res.status(code).send(response);
  }
  response.data = data;
  return res.status(response.code).send(response);
});

export default balanceRouter;
