const { StatusCodes } = require("http-status-codes")
const { ObjectId } = require("mongoose").Types

const db = require("../../lib/db")
const { asyncWrapper } = require("../../lib/middlewares/async")
const { ConflictError, UnauthenticatedError, NotFoundError, BadRequestError } = require("../../lib/errors")

const friendRequest = asyncWrapper(async (req, res) => {
	const isInvalid = await db.friend.freindRequest(req.userInfo._id, req.body.username, req.body.userNumber)
	if (isInvalid) {
		return res.status(isInvalid.code).json({ message: isInvalid.message })
	}

	res.status(StatusCodes.OK).json({ message: "친구 요청을 보냈습니다." })
})

const rejectFriendRequest = asyncWrapper(async (req, res) => {
	if (!ObjectId.isValid(req.params.userId)) throw new BadRequestError("userId를 잘 못 입력했습니다.")
	await db.friend.rejectFriendRequest(req.params.userId, req.userInfo._id)

	res.status(StatusCodes.OK).send({ message: "친구 요청을 거절했습니다." })
})

const createFriend = asyncWrapper(async (req, res) => {
	// req 구성
	// Authorization: accessToken
	// body: senderId, receiverId
	if (!ObjectId.isValid(req.params.userId)) throw new BadRequestError("userId를 잘 못 입력했습니다.")
	const user = await db.user.findUserInfoByUserId(req.params.userId)
	if (!user) throw new BadRequestError("없는 유저입니다.")
	const friendInfo = await db.friend.isFriend(req.userInfo._id, req.params.userId)
	if (friendInfo) throw new BadRequestError("이미 친구 입니다.")

	const data = await db.friend.addFreind(req.userInfo._id, req.params.userId)
	await db.friend.rejectFriendRequest(req.userInfo._id, req.params.userId)

	res.status(StatusCodes.OK).json({ data })
})

const readFriendList = asyncWrapper(async (req, res) => {
	// req 구성
	// Authorization: accessToken
	// body: userId
	const friendList = await db.friend.readFreindList(req.userInfo._id)

	res.status(StatusCodes.OK).json({ data: friendList })
})

const deleteFriend = asyncWrapper(async (req, res) => {
	// req 구성
	// Authorization: accessToken
	// body: userId1, userId2
	if (!ObjectId.isValid(req.params.userId)) throw new BadRequestError("userId를 잘 못 입력했습니다.")
	await db.friend.deleteFriend(req.userInfo._id, req.params.userId)

	res.status(StatusCodes.OK).json({ message: "친구 삭제 성공" })
})

module.exports = {
	friendRequest,
	rejectFriendRequest,
	createFriend,
	readFriendList,
	deleteFriend,
}
