import ApiError from '../helpers/apiError'

const createErrorStructure = (status = 0, error) => ({
	status: status,
	data: { message: { error: error } },
})

function errorMiddleware(err, req, res, next) {
	if (err instanceof ApiError) {
		return res.status(err.status).json({ status: 0, data: { message: { error: err.message } } })
	}

	if (err.code === 11000) {
		return res.status(403).json({ status: 0, data: { message: { error: 'this username already exist' } } })
	}

	return res.status(500).json({ status: 0, data: { message: { error: err.message || 'unforeseen error' } } })
}

export default errorMiddleware
