const { StatusCodes } = require("http-status-codes")
const { ObjectId } = require("mongoose").Types

const db = require("../../lib/db")
const { asyncWrapper } = require("../../lib/middlewares/async")
const { ConflictError, UnauthenticatedError, NotFoundError, BadRequestError } = require("../../lib/errors")

const createDirectMessage = asyncWrapper(async (req, res) => {
	// req 구성
	// Authorization: accessToken
	// body: senderId, receiverID, mentionId, text

	const { userId: receiverId } = req.params
	const { text } = req.body
	const { _id: senderId } = req.userInfo

	if (!ObjectId.isValid(receiverId)) {
		throw new BadRequestError("유효하지 않은 userId 입니다.")
	}

	await db.direct.addMessage({ senderId, receiverId, text })

	// 있으면 추가 안 할 것.
	const userInfo = await db.user.findUserInfoByUserId(senderId)
	const receiverInfo = await db.user.findUserInfoByUserId(receiverId)
	if (!receiverInfo) {
		throw new BadRequestError("존재하지 않는 userId 입니다.")
	}

	// DM을 주고 받는 유저끼리 Direct List에 서로가 없을 경우 등록 있을 경우 등록하지 않습니다.
	if (!userInfo.directList.includes(receiverInfo._id)) {
		await db.user.updateDirectList(userInfo._id, receiverInfo._id)
	}
	if (!receiverInfo.directList.includes(userInfo._id)) {
		await db.user.updateDirectList(receiverInfo._id, userInfo._id)
	}

	res.status(StatusCodes.OK).json({ message: "Direct Messsage 저장 성공" })
})

const readDirectMessage = asyncWrapper(async (req, res) => {
	// req 구성
	// Authorization: accessToken
	// query: limit, skip
	const { userId: receiverId } = req.params
	const { limit, skip } = req.body
	const { _id: senderId } = req.userInfo

	if (!ObjectId.isValid(req.params.userId)) {
		throw new BadRequestError("유효하지 않은 userId입니다.")
	}

	// skip, limit의 기본 설정
	// 기본설정을 제공할 시 페이지네이션에서 skip 과 limit가 둘 다 없는 요청이 여러 번 들어올 경우
	// 중복된 데이터를 여러번 응답할 수도 있음.
	if (!limit || !skip) {
		throw new BadRequestError("유효하지 않은 limit 혹은 skip 입니다.")
	}

	const directMessages = await db.direct.readMessage({ senderId, receiverId, limit, skip })

	res.status(StatusCodes.OK).json({ data: directMessages })
})

const updateDirectMessage = asyncWrapper(async (req, res) => {
	// req 구성
	// Authorization: accessToken
	// body: messageId, mentionId, text

	const { text } = req.body
	const { userId, messageId } = req.params
	const { userInfo } = req

	if (!text) {
		throw new BadRequestError("유효하지 않은 body 데이터입니다.")
	}

	if (!ObjectId.isValid(userId)) {
		throw new BadRequestError("유효하지 않은 userId 입니다.")
	}

	if (!ObjectId.isValid(messageId)) {
		throw new BadRequestError("유효하지 않은 messageId 입니다.")
	}

	const message = await db.direct.findDMbyMessageId(messageId)
	if (!message) {
		throw new BadRequestError("존재하지 않는 messageId 입니다.")
	}

	if (String(message.senderId) !== String(userInfo._id)) {
		throw new UnauthenticatedError("권한이 필요합니다.")
	}

	await db.direct.updateMessage({ messageId, text })

	res.status(StatusCodes.OK).json({ message: "Direct Message 수정완료" })
})

const deleteDirectMessage = asyncWrapper(async (req, res) => {
	// req 구성
	// Authorization: accessToken
	// body: messageId

	const { userId, messageId } = req.params
	const { userInfo } = req

	if (!ObjectId.isValid(userId)) {
		throw new BadRequestError("유효하지 않은 userId 입니다.")
	}

	if (!ObjectId.isValid(messageId)) {
		throw new BadRequestError("유효하지 않은 messageId 입니다.")
	}

	const message = await db.direct.findDMbyMessageId(messageId)
	if (!message) {
		throw new BadRequestError("존재하지 않는 messageId 입니다.")
	}

	if (String(message.senderId) !== String(userInfo._id)) {
		throw new UnauthenticatedError("권한이 필요합니다.")
	}

	await db.direct.deletMessage(messageId)
	res.status(StatusCodes.OK).json({ message: "Direct Message 삭제 성공" })
})

const deleteDirectList = asyncWrapper(async (req, res) => {
	// req 구성
	// Authorization: accessToken
	// body: senderId, receiverId

	const { userId } = req.params
	const { userInfo } = req

	if (!ObjectId.isValid(userId)) {
		throw new BadRequestError("유효하지 않은 userId 입니다.")
	}

	await db.direct.deletDirectList(userInfo._id, userId)

	res.status(StatusCodes.NO_CONTENT).json()
})

module.exports = {
	createDirectMessage,
	readDirectMessage,
	updateDirectMessage,
	deleteDirectMessage,
	deleteDirectList,
}
