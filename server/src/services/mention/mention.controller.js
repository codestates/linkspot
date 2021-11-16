const { StatusCodes } = require("http-status-codes")

const db = require("../../lib/db")
const { asyncWrapper } = require("../../lib/middlewares/async")
const { ConflictError, UnauthenticatedError, NotFoundError, BadRequestError } = require("../../lib/errors")

// 맨션 get 컨트롤러
const readMention = asyncWrapper(async (req, res) => {
	const userIds = req.body

	if (!userIds) {
		throw new BadRequestError("유효하지 않은 body 데이터입니다.")
	}

	const data = await db.mention.readMention(userIds)
	res.status(StatusCodes.OK).json({ data })
})

module.exports = { readMention }
