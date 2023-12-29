class ApiError extends Error {
        constructor(errorObj) {
            super(errorObj.message);
            this.status = errorObj.status;
            this.statusCode = errorObj.statusCode;
            this.success = errorObj.success;
        }
     }
  module.exports = ApiError;