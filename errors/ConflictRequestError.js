const CONFLICT_REQUEST_CODE = 409;

class ConflictRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_REQUEST_CODE;
  }
}

module.exports = ConflictRequestError;
