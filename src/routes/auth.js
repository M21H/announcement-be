import { Router } from 'express'
import Auth from '../controllers/AuthController'

const authRouter = new Router()

authRouter.post('/register', Auth.register)
authRouter.put('/login', Auth.login)
authRouter.put('/refresh', Auth.refresh)

// authRouter.get('/logout', Auth.logout)

export default authRouter
