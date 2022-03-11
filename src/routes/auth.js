import { Router } from 'express'
import Auth from '../controllers/AuthController'

const authRouter = new Router()

authRouter.post('/register', Auth.register)
authRouter.put('/login', Auth.login)

export default authRouter
