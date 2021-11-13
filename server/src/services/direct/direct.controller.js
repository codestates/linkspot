const { StatusCodes } = require("http-status-codes")
const { ObjectId } = require("mongoose").Types

const db = require("../../lib/db")
const { asyncWrapper } = require("../../lib/middlewares/async")
const { ConflictError, UnauthenticatedError, NotFoundError, BadRequestError } = require("../../lib/errors")

const createDirectMessage = asyncWrapper(async (req, res) => {
	// req 구성
	// Authorization: accessToken
	// body: senderId, receiverID, mentionId, text
	if (!ObjectId.isValid(req.params.userId)) throw new BadRequestError("userId를 잘 못 입력했습니다.")
	await db.direct.addMessage({
		senderId: req.userInfo._id,
		receiverId: req.params.userId,
		text: req.body.text,
	})

	// 있으면 추가 안 할 것.
	const userInfo = await db.user.findUserInfoByUserId(req.userInfo._id)
	const receiverInfo = await db.user.findUserInfoByUserId(req.params.userId)
	if (!receiverInfo) throw new BadRequestError("가입하지 않은 사용자의 userId입니다.")

	// DM을 주고 받는 유저끼리 Direct List에 서로가 없을 경우 등록 있을 경우 등록하지 않습니다.
	if (!userInfo.directList.includes(receiverInfo._id)) await db.user.updateDirectList(userInfo._id, receiverInfo._id)
	if (!receiverInfo.directList.includes(userInfo._id)) await db.user.updateDirectList(receiverInfo._id, userInfo._id)

	res.status(StatusCodes.OK).json({ message: "Direct Messsage 저장완료" })
})

const readDirectMessage = asyncWrapper(async (req, res) => {
	// req 구성
	// Authorization: accessToken
	// query: limit, skip
	if (!ObjectId.isValid(req.params.userId)) throw new BadRequestError("userId를 잘 못 입력했습니다.")

	// skip, limit의 기본 설정
	if (!req.query.limit) req.query.limit = 50
	if (!req.query.skip) req.query.limit = 0

	const directMessages = await db.direct.readMessage({
		senderId: req.userInfo._id,
		receiverId: req.params.userId,
		limit: req.query.limit,
		skip: req.query.skip,
	})
	res.status(StatusCodes.OK).json({ data: directMessages })
})

const updateDirectMessage = asyncWrapper(async (req, res) => {
	// req 구성
	// Authorization: accessToken
	// body: messageId, mentionId, text
	if (!ObjectId.isValid(req.params.userId)) throw new BadRequestError("userId를 잘 못 입력했습니다.")
	if (!ObjectId.isValid(req.params.messageId)) throw new BadRequestError("messageId를 잘 못 입력했습니다.")
	const message = await db.direct.findDMbyMessageId(req.params.messageId)
	if (!message) throw new BadRequestError("존재하지 않는 DM입니다.")
	if (!req.body.text) throw new BadRequestError("text를 입력하세요.")
	if (String(message.senderId) !== String(req.userInfo._id)) throw new BadRequestError("권한이 없습니다.")
	await db.direct.updateMessage({
		messageId: req.params.messageId,
		text: req.body.text,
	})

	res.status(StatusCodes.OK).json({ message: "Direct Message 수정완료" })
})

const deleteDirectMessage = asyncWrapper(async (req, res) => {
	// req 구성
	// Authorization: accessToken
	// body: messageId
	if (!ObjectId.isValid(req.params.userId)) throw new BadRequestError("userId를 잘 못 입력했습니다.")
	if (!ObjectId.isValid(req.params.messageId)) throw new BadRequestError("messageId를 잘 못 입력했습니다.")
	const message = await db.direct.findDMbyMessageId(req.params.messageId)
	if (!message) throw new BadRequestError("존재하지 않는 DM입니다.")
	if (String(message.senderId) !== String(req.userInfo._id)) throw new BadRequestError("권한이 없습니다.")
	await db.direct.deletMessage(req.params.messageId)
	res.status(StatusCodes.OK).json({ message: "Direct Message 삭제완료" })
})

const deleteDirectList = asyncWrapper(async (req, res) => {
	// req 구성
	// Authorization: accessToken
	// body: senderId, receiverId
	if (!ObjectId.isValid(req.params.userId)) throw new BadRequestError("userId를 잘 못 입력했습니다.")
	await db.direct.deletDirectList(req.userInfo._id, req.params.userId)
	res.status(StatusCodes.OK).json({ message: "Direct Connection List 삭제완료" })
})

module.exports = {
	createDirectMessage,
	readDirectMessage,
	updateDirectMessage,
	deleteDirectMessage,
	deleteDirectList,
}
