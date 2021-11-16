const { StatusCodes } = require("http-status-codes")

const ErrorHandlerMiddleware = (err, req, res, next) => {
	let error = {
		//* default
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		message: err.message || "Internal server error",
	}

	if (error.statusCode && (error.message === "jwt malformed" || error.message === "invalid token")) {
		error = { statusCode: StatusCodes.UNAUTHORIZED, message: "유효하지 않은 링크입니다." }
	}

	return res.status(error.statusCode).json({ message: error.message })
}

module.exports = ErrorHandlerMiddleware
