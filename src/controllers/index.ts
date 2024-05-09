import express from 'express'
import rewardsRouter from './rewards'

const router = express.Router()



/**
 * 
 *  Rewards API 
 *  
 *  POST /
 *  Give Rewards to user
 *  Body:
 *    - type: SignUp | ProfileSetup | AiSetup 
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

router.use('/rewards', rewardsRouter)

router.get('/', (req, res) => {
  res.status(200).send("OK")
})

export default router