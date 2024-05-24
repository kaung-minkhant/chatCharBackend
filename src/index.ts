import express, { Request, Response } from "express";
import router from "./controllers";
import ip from "ip";
import cors from "cors";
import { LoggerMiddleWare } from "./middlewares";
import bodyParser from "body-parser";
import swaggerDocs from "./swagger";
import dotenv from 'dotenv'

dotenv.config()

const app = express();
const port = parseInt(process.env.SERVICE_PORT || '4000');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

swaggerDocs(app, port)

app.use(LoggerMiddleWare);

app.use("/", router);

const server = app.listen(port, () => {
  console.log(`Chat char server started on http://${ip.address()}:${port}`);
});

async function closeGracefully(signal: any) {
  console.log(`*^!@4=> Received signal to terminate: ${signal}`);

  server.close(() => {
    console.log(`Server closed`)
  });
  // await db.close() if we have a db connection in this app
  // await other things we should cleanup nicely
  process.kill(process.pid, signal);
}

process.once("SIGINT", closeGracefully);
process.once("SIGTERM", closeGracefully);
