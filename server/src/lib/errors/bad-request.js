const { StatusCodes } = require("http-status-codes")

const CustomError = require("./custom-error")

// 400 code
class BadRequestError extends CustomError {
	constructor(message) {
		super(message)
		this.statusCode = StatusCodes.BAD_REQUEST
	}
}

module.exports = BadRequestError
