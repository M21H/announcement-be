import jwt, { decode } from 'jsonwebtoken'
import ApiError from '../helpers/apiError'
import 'dotenv/config'
import UserSchema from '../models/UserSchema'

const authMiddleware = async (req, res, next) => {
	if (req.method === 'OPTIONS') {
		next()
	}
	try {
		const token = req.headers.authorization.split(' ')[1]
		if (!token) {
			throw ApiError.Unauthorized()
		}
		const { id } = jwt.verify(token, process.env.JWT_ACCESS_SECRET)

		const user = await UserSchema.findById(id)

		if (!user) {
			return ApiError.Unauthorized()
		}

		req.user = user
		next()
	} catch (e) {
		next(ApiError.Unauthorized())
	}
}

// const authMiddleware = async (req, res, next) => {
// 	let token
// 	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
// 		token = req.headers.authorization.split(' ')[1]
// 	}
// 	if (!token) {
// 		return next(new ApiError.Unauthorized())
// 	}
// 	try {
// 		const { id } = jwt.verify(token, process.env.JWT_SECRET)
// 		const user = await UserSchema.findById(id)
// 		if (!user) {
// 			return next(new ApiError(404, 'No user found with this id'))
// 		}
// 		req.user = user
// 		next()
// 	} catch (e) {
// 		next(new ApiError(404, 'Unauthorized'))
// 	}
// }

export default authMiddleware
