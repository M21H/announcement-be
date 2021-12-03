import { Router } from 'express'
import Auth from '../controllers/AuthController'

const authRouter = new Router()

authRouter.get('/register', Auth.register)
authRouter.get('/login', Auth.login)

export default authRouter
