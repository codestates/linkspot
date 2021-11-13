const jwt = require("jsonwebtoken")

const { config } = require("../../../config/config")
const { user } = require("../db")
const { BadRequestError, UnauthenticatedError } = require("../errors")
const { asyncWrapper } = require("./async")

// verified access token
const isLoggedIn = asyncWrapper(async (req, res, next) => {
	const { authorization } = req.cookies
	if (!authorization) {
		throw new UnauthenticatedError("로그인이 필요합니다.")
	}

	const { _id } = jwt.verify(authorization, config.jwtSecret)

	const userInfo = await user.findUser({ userId: _id })
	if (!userInfo) {
		throw new BadRequestError("유효하지 않은 토큰입니다.")
	}
	req.userInfo = userInfo
	console.log(req.userInfo.email)
	next()
})

module.exports = isLoggedIn
