const UNAUTHORIZED_REQUEST_CODE = 401;

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_REQUEST_CODE;
  }
}

module.exports = UnauthorizedError;
