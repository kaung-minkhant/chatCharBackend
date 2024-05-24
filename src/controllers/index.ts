import express from "express";
import rewardsRouter from "./rewards";
import { AuthMiddleWare } from "../middlewares";
import tokenRouter from "./token";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("OK");
  return;
});

router.use(AuthMiddleWare);

router.use("/rewards", rewardsRouter);

router.use("/token", tokenRouter);

export default router;
