import jwt from 'jsonwebtoken'
import ApiError from '../helpers/apiError'
import AuthService from '../services/AuthService'
import 'dotenv/config'

const generateAccessToken = (id, username) => {
	const payload = { id, username }
	return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class AuthController {
	async register(req, res, next) {
		try {
			const { username, password } = req.body

			if (!username.trim()) {
				throw ApiError.badRequest('Missing required username field')
			} else if (!password.trim()) {
				throw ApiError.badRequest('Missing required password field')
			}
			const candidate = await AuthService.getUser(username)
			if (candidate) {
				return res.status(400).json({ message: { error: `user ${username} already exist` } })
			}
			const newUser = await AuthService.createUser({ username, password })
			res.status(201).json(newUser) // need return token
		} catch (e) {
			next(e)
		}
	}

	async login(req, res, next) {
		try {
			const { username, password } = req.body

			if (!username.trim()) {
				throw ApiError.badRequest('Missing required username field')
			} else if (!password.trim()) {
				throw ApiError.badRequest('Missing required password field')
			}

			const user = await AuthService.getUser(username)

			if (!user) {
				return res.status(400).json({ message: { error: `user ${username} not founded` } })
			}
			const isMatch = await user.matchPasswords(password)
			console.log(isMatch)

			if (!isMatch) {
				return res.status(400).json({ message: { error: `password not valid` } })
			}
			const token = generateAccessToken(user._id, user.username)
			// need just return token
			res.json({ user: { id: user._id, username: user.username, createdAt: user.createdAt }, token })
		} catch (e) {
			next(e)
		}
	}

	async logout(req, res, next) {
		try {
			res.json({ user: { isAuth: false } })
		} catch (e) {
			next(e)
		}
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
