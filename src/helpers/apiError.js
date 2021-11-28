class ApiError {
  constructor(status, message) {
    this.status = status
    this.message = message
  }
  static badRequest(message) {
    return new ApiError(404, message)
  }
  static badGateway(message = 'can not found') {
    return new ApiError(502, message)
  }
}

export default ApiError