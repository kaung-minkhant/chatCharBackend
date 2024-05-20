"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rewards_1 = require("../handlers/rewards");
const middlewares_1 = require("../middlewares");
const reward_1 = require("./dto/reward");
const utils_1 = require("../helpers/utils");
const rewardsRouter = express_1.default.Router();
rewardsRouter.use("/", middlewares_1.RewardMiddleWare);
rewardsRouter.get("/", (req, res) => {
    res.status(200).send("Reward GET endpoint\n");
});
rewardsRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const supabase = req.supabase;
    const userId = req.user.id;
    const taskMap = req.taskMap;
    const requestBody = req.body;
    console.log(requestBody);
    const task = taskMap === null || taskMap === void 0 ? void 0 : taskMap.get(requestBody.taskType);
    const response = {
        code: 200,
        data: null,
        error: null,
    };
    const results = reward_1.GiveRewardDtoSchema.safeParse(requestBody);
    if (!results.success) {
        response.code = 404;
        const error = (0, utils_1.formatZodIssuesWithPath)(results.error.issues, Object.keys(reward_1.GiveRewardDtoSchema.shape));
        response.error = error.get('taskType');
        res.status(404).send(response);
        return;
    }
    const { error, data, code } = yield (0, rewards_1.giveRewards)(supabase, userId, task.id, task.token);
    if (error) {
        response.code = code;
        response.error = error;
        res.status(code).send(response);
        return;
    }
    const token = data.token;
    response.data = { token };
    res.status(code).send(response);
    return;
}));
rewardsRouter.delete("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const supabase = req.supabase;
    const { code, error } = yield (0, rewards_1.deleteAllRewards)(supabase);
    const response = {
        code: 200,
        data: null,
        error: null,
    };
    if (error) {
        response.code = code;
        response.error = error;
        return res.status(code).send(response);
    }
    return res.status(200).send(response);
}));
exports.default = rewardsRouter;
