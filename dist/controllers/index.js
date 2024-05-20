"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rewards_1 = __importDefault(require("./rewards"));
const middlewares_1 = require("../middlewares");
const balance_1 = __importDefault(require("./balance"));
const router = express_1.default.Router();
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
router.use(middlewares_1.AuthMiddleWare);
router.use("/rewards", rewards_1.default);
router.use("/balance", balance_1.default);
exports.default = router;
