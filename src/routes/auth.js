import { Router } from 'express'
import Auth from '../controllers/AuthController'

const auth = new Router()

auth.post('/register', Auth.register)
auth.put('/login', Auth.login)
auth.delete('/login/:id', Auth.delete)

export default auth