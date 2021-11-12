const { StatusCodes } = require("http-status-codes")

exports.errorHandlerMiddleware = (err, req, res, next) => {
	const error = {
		//* default
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		message: err.message || "Internal server error",
	}
	return res.status(error.statusCode).json({ message: error.message })
}
