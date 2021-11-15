const { StatusCodes } = require("http-status-codes")
const { ObjectId } = require("mongoose").Types

const db = require("../../lib/db")
const { asyncWrapper } = require("../../lib/middlewares/async")
const { ConflictError, UnauthenticatedError, NotFoundError, BadRequestError } = require("../../lib/errors")

const friendRequest = asyncWrapper(async (req, res) => {
	const { username, userNumber } = req.body
	const { userInfo } = req

	if (!username || !userNumber) {
		throw new newBadRequestError("유효하지 않은 body 데이터입니다.")
	}

	const isInvalid = await db.friend.freindRequest(userInfo._id, username, userNumber)

	if (isInvalid.code === 400) {
		throw new BadRequestError("유효하지 않은 userId 입니다.")
	}

	if (isInvalid.code === 409) {
		throw new ConflictError("이미 친구 요청을 보냈습니다.")
	}

	res.status(StatusCodes.OK).json({ message: "친구 요청 성공" })
})

const rejectFriendRequest = asyncWrapper(async (req, res) => {
	const { userId } = req.params
	const { userInfo } = req

	if (!ObjectId.isValid(userId)) {
		throw new BadRequestError("유효하지 않은 userId 입니다.")
	}

	await db.friend.rejectFriendRequest(userId, userInfo._id)

	res.status(StatusCodes.OK).send({ message: "친구 요청 거절" })
})

const createFriend = asyncWrapper(async (req, res) => {
	// req 구성
	// Authorization: accessToken
	// body: senderId, receiverId
	const { userId } = req.params
	const { userInfo } = req

	if (!ObjectId.isValid(userId)) {
		throw new BadRequestError("유효하지 않은 userId 입니다.")
	}

	const user = await db.user.findUserInfoByUserId(userId)
	if (!user) {
		throw new BadRequestError("존재하지 않는 userId 입니다.")
	}

	const friendInfo = await db.friend.isFriend(userInfo._id, userId)
	if (friendInfo) {
		throw new ConflictError("이미 친구 입니다.")
	}

	const result = await db.friend.addFreind(userInfo._id, userId)
	await db.friend.rejectFriendRequest(userInfo._id, userId)

	res.status(StatusCodes.OK).json({ result })
})

const readFriendList = asyncWrapper(async (req, res) => {
	// req 구성
	// Authorization: accessToken
	// body: userId
	const { userInfo } = req

	const friendList = await db.friend.readFreindList(userInfo._id)

	res.status(StatusCodes.OK).json({ friendList })
})

const deleteFriend = asyncWrapper(async (req, res) => {
	// req 구성
	// Authorization: accessToken
	// body: userId1, userId2
	const { userId } = req.params
	const { userInfo } = req

	if (!ObjectId.isValid(userId)) {
		throw new BadRequestError("유효하지 않은 userId 입니다.")
	}

	await db.friend.deleteFriend(userInfo._id, userId)

	res.status(StatusCodes.NO_CONTENT).json()
})

module.exports = {
	friendRequest,
	rejectFriendRequest,
	createFriend,
	readFriendList,
	deleteFriend,
}
