import NodeCache from 'node-cache'
import dotenv from 'dotenv'
import { conlog } from './utils'

dotenv.config()

// conlog('User session expiry', process.env.USER_SESSION_EXPIRY)
const userSessions = new NodeCache({
  stdTTL: parseInt( process.env.USER_SESSION_EXPIRY || '5') * 60,
  checkperiod: 1,
  useClones: false,
  deleteOnExpire: true
})

export default userSessions


