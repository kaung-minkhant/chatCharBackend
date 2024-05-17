import express from "express";
import rewardsRouter from "./rewards";
import { AuthMiddleWare } from "../middlewares";
import balanceRouter from "./balance";

const router = express.Router();

/**
 *
 *  Rewards API
 *
 *  POST /rewards
 *  Give Rewards to user
 *  Body:
 *    - taskType: SignUp | ProfileSetup | AiSetup
 *  Additional Headers:
 *    - authorization: JWT Token
 *
 *
 * user signup -> go to supabase auth -> if successful get session data -> if session valid, POST /rewards with SIGN_UP ->
 * INSERT into Task_Table with complete true -trigger-> INSERT into Token_Table with correct token
 *                                           -> response with 200 status and token data
 *
 * profile_complete -> POST /rewards with PROFILE_SETUP ->
 * INSERT into Task_Table with complete true -trigger-> INSERT into Token_Table with correct token
 *                                           -> response with 200 status and token data
 *
 * AI_complete -> POST /rewards with AI_SETUP ->
 * INSERT into Task_Table with complete true -trigger-> INSERT into Token_Table with correct token
 *                                           -> response with 200 status and token data
 */

router.get("/", (req, res) => {
  res.status(200).send("OK");
  return;
});

router.use(AuthMiddleWare);

router.use("/rewards", rewardsRouter);

router.use("/balance", balanceRouter);

export default router;
