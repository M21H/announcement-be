import ApiError from "../helpers/apiError"

function errorMiddleware(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: { error: err.message } })
  }

  if (err.code === 11000) {
    return res.status(403).json({ message: { error: 'this username already exist' } })
  }

  return res.status(500).json({
    message: { error: err.message || 'unforeseen error' }
  })
}

export default errorMiddleware