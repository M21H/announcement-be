class ApiError {
  constructor(status, message) {
    this.status = status
    this.message = message
  }
  static badRequest(message) {
    return new ApiError(404, message)
  }
  static notFound(message = 'not found') {
    return new ApiError(400, message)
  }
}

export default ApiError