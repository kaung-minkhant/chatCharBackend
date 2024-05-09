import express from 'express'
import rewardsRouter from './rewards'

const router = express.Router()




/**
 * 
 *  Rewards API 
 *  
 *  GET / 
 *  Retrieve the rewards 
 *  Additional Headers:
 *    - authorization: JWT Token 
 *  
 *  POST /
 *  Give Rewards to user
 *  Body:
 *    - type: SIGN_UP | PROFILE_SETUP | AI_SETUP 
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