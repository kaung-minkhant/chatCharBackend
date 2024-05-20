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
const controllers_1 = __importDefault(require("./controllers"));
const ip_1 = __importDefault(require("ip"));
const cors_1 = __importDefault(require("cors"));
const middlewares_1 = require("./middlewares");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 4000;
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(middlewares_1.LoggerMiddleWare);
app.use("/", controllers_1.default);
const server = app.listen(port, () => {
    console.log(`Chat char server started on http://${ip_1.default.address()}:${port}`);
});
function closeGracefully(signal) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`*^!@4=> Received signal to terminate: ${signal}`);
        server.close(() => {
            console.log(`Server closed`);
        });
        // await db.close() if we have a db connection in this app
        // await other things we should cleanup nicely
        process.kill(process.pid, signal);
    });
}
process.once("SIGINT", closeGracefully);
process.once("SIGTERM", closeGracefully);
