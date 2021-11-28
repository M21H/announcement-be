import ApiError from "../helpers/apiError"

function errorMiddleware(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ error: err.message })
  }
  return res.status(500).json({
    error: 'unforeseen error'
  })
}

export default errorMiddleware