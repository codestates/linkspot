const { StatusCodes } = require("http-status-codes")

const CustomError = require("./custom-error")

// 401 code
class UnauthenticatedError extends CustomError {
	constructor(message) {
		super(message)
		this.statusCode = StatusCodes.UNAUTHORIZED
	}
}

module.exports = UnauthenticatedError
