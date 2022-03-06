const FORBIDDEN_REQUEST_CODE = 403;

class ForbiddenRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_REQUEST_CODE;
  }
}

module.exports = ForbiddenRequestError;
