class ApiError extends Error {
	constructor(message, statusCode, status, success) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.status = status;
        this.success = success;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
	}
  }
  module.exports = ApiError;