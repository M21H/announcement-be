import ApiError from '../helpers/apiError'
import AuthService from '../services/AuthService'
import 'dotenv/config'

const sendToken = (user, statusCode, res) => {
	const token = user.getSignedToken()
	res.status(statusCode).json({ success: true, token })
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
			sendToken(newUser, 201, res)
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

			if (!isMatch) {
				return res.status(400).json({ message: { error: `password not valid` } })
			}
			// const token = generateAccessToken(user._id, user.username)
			// need just return token
			sendToken(user, 200, res)
		} catch (e) {
			next(e)
		}
	}

	refresh(req, res, next) {
		
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
