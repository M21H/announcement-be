import jwt from 'jsonwebtoken'
import ApiError from '../helpers/apiError'
import 'dotenv/config'

const authMiddleware = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		next()
	}

	try {
		const token = req.headers.authorization.split(' ')[1]
		if (!token) {
			throw ApiError.Unauthorized()
		}
		const decodedData = jwt.verify(token, process.env.SECRET_KEY)
		req.user = decodedData
		next()
	} catch (e) {
		throw ApiError.Unauthorized()
	}
}

export default authMiddleware
