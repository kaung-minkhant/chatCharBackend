import express from 'express'
import router from './controllers';
import ip from 'ip'
import cors from 'cors'
import { LoggerMiddleWare } from './middlewares';
import bodyParser from 'body-parser';

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(cors())

app.use(LoggerMiddleWare)

app.use('/', router)

app.listen(port, () => {
  console.log(`Chat char server started on http://${ip.address()}:${port}`);
})