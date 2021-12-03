import bcrypt from 'bcryptjs'
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
			const hashPassword = bcrypt.hashSync(password, 7)
			await AuthService.createUser({ username, password: hashPassword })
			res.status(201).json({ message: 'user was successful created' })
		} catch (e) {
			next(e)
		}
	}

	async login(req, res, next) {
		try {
			const { username, password } = req.body

			const user = await AuthService.getUser(username)
			if (!user) {
				return res.status(400).json({ message: { error: `user ${username} not founded` } })
			}
			const validPassword = bcrypt.compareSync(password, user.password)
			if (!validPassword) {
				return res.status(400).json({ message: { error: `password not valid` } })
			}
			const token = generateAccessToken(user._id, user.username)
			res.json({ token })
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
