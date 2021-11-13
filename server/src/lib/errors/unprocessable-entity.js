const { StatusCodes } = require("http-status-codes")

const CustomError = require("./custom-error")

// 422 code
class UnprocessableEntityError extends CustomError {
	constructor(message) {
		super(message)
		this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY
	}
}

module.exports = UnprocessableEntityError
