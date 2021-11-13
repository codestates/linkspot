const { StatusCodes } = require("http-status-codes")

const CustomError = require("./custom-error")

// 406 code
class NotAceptableError extends CustomError {
	constructor(message) {
		super(message)
		this.statusCode = StatusCodes.NOT_ACCEPTABLE
	}
}

module.exports = NotAceptableError
