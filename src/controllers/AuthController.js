import bcrypt from 'bcryptjs'
import ApiError from '../helpers/apiError'
import AuthService from '../services/AuthService'

class AuthController {
  async getUser(req, res, next) {
    try {
      const { id } = req.params
      if (!id) {
        throw ApiError.badRequest('id not specified')
      }

      const user = await AuthService.getUser(id)
      if (!post) {
        throw ApiError.notFound()
      }
      res.status(200).json(user)
    } catch (e) {
      next(e)
    }
  }

  async register(req, res, next) {
    try {
      const { username, password } = req.body
      if (!username || !password) {
        throw ApiError.badRequest('Missing required username or password fields')
      }
      const candidate = await AuthService.getUser(username)
      if (candidate) {
        return res.status(400).json({ message: { error: 'user already exist' } })
      }
      const hashPassword = bcrypt.hashSync(password, 7)
      await AuthService.createUser({ username, password: hashPassword })
      res.status(201).json({ message: 'user was successful created' })

    } catch (e) {
      next(e)
    }
  }

  async login() {

  }

  async delete(req, res, next) {
    const { id } = req.params
    try {
      if (!id) {
        throw ApiError.badRequest('id not specified')
      }
      const user = await AuthService.deleteUser(id)
      if (!post) {
        throw ApiError.badGateway('can not deleted')
      }
      res.json(user)
    } catch (e) {
      next(e)
    }
  }

}

export default new AuthController()