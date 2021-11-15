const { StatusCodes } = require("http-status-codes")
const { ObjectId } = require("mongoose").Types

const db = require("../../lib/db")
const { asyncWrapper } = require("../../lib/middlewares/async")

const { ConflictError, UnauthenticatedError, NotFoundError, BadRequestError } = require("../../lib/errors")

const createChannelMessage = asyncWrapper(async (req, res) => {
	// req 구성
	// Authorization: accessToken
	// serverId, TextChannelId, senderId, mentionId, text
	const { _id: senderId } = req.userInfo
	console.log(req.userInfo._id, senderId)
	const { serverId, channelId } = req.params
	const { mentionIds, text } = req.body

	// UnprocessableEntityError(code: 422) 는 WebDav 서버 전용 응답코드라 제외
	if (!text) {
		throw new BadRequestError("유효하지 않은 body 데이터입니다.")
	}

	if (!ObjectId.isValid(serverId) || !ObjectId.isValid(channelId)) {
		throw new BadRequestError("유효하지 않은 serverId 혹은 channelId 입니다.")
	}

	await db.channel.addMessage({ serverId, channelId, channelType: "Text", senderId, mentionIds, text })

	res.status(StatusCodes.CREATED).json({ message: "채널 메세지 저장 성공" })
})

const readChannelMessage = asyncWrapper(async (req, res) => {
	// req 구성
	// Authorization: accessToken
	// query: limit, skip

	const { serverId, channelId } = req.params
	const { skip, limit } = req.query

	// UnprocessableEntityError(422)는 WebDav 서버 전용 응답코드라 제외
	if (!ObjectId.isValid(serverId) || !ObjectId.isValid(channelId)) {
		throw new BadRequestError("유효하지 않은 serverId 혹은 channelId 입니다.")
	}

	if (!skip || !limit) {
		throw new BadRequestError("유효하지 않은 skip 혹은 limit 입니다.")
	}

	const messages = await db.channel.readMessage({ serverId, channelId, limit, skip })

	res.status(StatusCodes.OK).json({ messages })
})

const updateChannelMessage = asyncWrapper(async (req, res) => {
	// req 구성
	// Authorization: accessToken
	// body: messageId, mentionIds, text
	const { messageId } = req.params
	const { mentionIds, text } = req.body

	if (!ObjectId.isValid(messageId)) {
		throw new BadRequestError("유효하지 않은 messageId 입니다.")
	}

	if (!mentionIds || !text) {
		throw new BadRequestError("유효하지 않은 body 데이터입니다.")
	}

	for await (const mentionId of mentionIds) {
		if (!ObjectId.isValid(mentionId)) {
			throw new BadRequestError("유효하지 않은 mentionId 입니다.")
		}
	}

	await db.channel.updateMessage({ messageId, text, mentionIds })

	res.status(StatusCodes.OK).json({ message: "채널 메세지 수정 성공" })
})

const deleteChannelMessage = asyncWrapper(async (req, res) => {
	// req 구성
	// Authorization: accessToken
	// body: messageId, mentionId, text
	const { messageId } = req.params

	if (!ObjectId.isValid(messageId)) {
		throw new BadRequestError("유효하지 않은 messageId 입니다.")
	}

	const isDelete = await db.channel.deletMessage(messageId)
	if (!isDelete.deletedCount) {
		throw new BadRequestError("유효하지 않은 메시지입니다.")
	}

	res.status(StatusCodes.NO_CONTENT).json()
})

// 채널 생성
const createChannel = asyncWrapper(async (req, res) => {
	// req 구성
	// Authorization: accessToken
	// const server = await db.server.findServersInfo(req.params.serverId)
	const { serverId } = req.params
	const { channelName } = req.body

	if (!ObjectId.isValid(serverId)) {
		throw new BadRequestError("유효하지 않은 serverId 입니다.")
	}

	if (!channelName) {
		throw new BadRequestError("유효하지 않은 body 데이터입니다.")
	}

	const { users } = await db.server.findUsersInServer(serverId)
	const channelInfo = await db.channel.createChannel({ users, serverId, channelName, channelType: "Text" })

	res.status(StatusCodes.OK).json({ channelInfo })
})

const deleteChannel = asyncWrapper(async (req, res) => {
	// req 구성
	// Authorization: accessToken
	const { channelId } = req.params
	if (!ObjectId.isValid(channelId)) {
		throw new BadRequestError("유효하지 않은 channelId 입니다.")
	}

	const { deletedCount } = await db.channel.deleteChannel(channelId)
	if (!deletedCount) {
		throw new BadRequestError("유효하지 않은 채널입니다.")
	}

	res.status(StatusCodes.NO_CONTENT).json()
})

const addUserInChannel = asyncWrapper(async (req, res) => {
	const { userInfo } = req
	const { serverId, channelId, userId } = req.params

	// UnprocessableEntityError(422)는 WebDav 서버 전용 응답코드라 제외
	if (!ObjectId.isValid(serverId) || !ObjectId.isValid(channelId)) {
		throw new BadRequestError("유효하지 않은 serverId 혹은 channelId 입니다.")
	}

	const isChannelInServer = await db.server.findChannelInServer(serverId, channelId)
	if (!isChannelInServer) {
		throw new BadRequestError("유효하지 않은 서버 혹은 채널입니다.")
	}

	const { admin } = await db.server.findAdminInServer(userInfo._id, serverId)
	if (!admin) {
		throw new UnauthenticatedError("관리자 권한이 필요합니다.")
	}

	const users = await db.channel.findUserInChannel(channelId, userId)
	if (users) {
		throw new ConflictError("이미 서버에 존재하는 유저입니다.")
	}

	// 채널이 서버안에 있는지 확인
	await db.channel.addUserInChannel(channelId, userId)

	res.status(StatusCodes.OK).json({ message: "채널 유저 추가 성공" })
})

const deleteUserInChannel = asyncWrapper(async (req, res) => {
	const { userInfo } = req
	const { serverId, channelId, userId } = req.params

	// UnprocessableEntityError(422)는 WebDav 서버 전용 응답코드라 제외
	if (!ObjectId.isValid(serverId) || !ObjectId.isValid(channelId)) {
		throw new BadRequestError("유효하지 않은 serverId 혹은 channelId 입니다.")
	}

	const isChannelInServer = await db.server.findChannelInServer(serverId, channelId)
	if (!isChannelInServer) {
		throw new BadRequestError("유효하지 않은 서버 혹은 채널입니다.")
	}

	const { admin } = await db.server.findAdminInServer(userInfo._id, serverId)
	if (!admin) {
		throw new UnauthenticatedError("관리자 권한이 필요합니다.")
	}

	const users = await db.channel.findUserInChannel(channelId, userId)
	if (!users) {
		throw new BadRequestError("유효하지 않은 userId 입니다.")
	}

	await db.channel.deleteUserInChannel(channelId, userId)

	res.status(StatusCodes.NO_CONTENT).json()
})

const updateChannel = asyncWrapper(async (req, res) => {
	// req 구성
	// Authorization: accessToken
	const { serverId, channelId } = req.params
	const { channelName } = req.body
	const { userInfo } = req

	if (!ObjectId.isValid(serverId) || !ObjectId.isValid(channelId)) {
		throw new BadRequestError("유효하지 않은 serverId 혹은 channelId 입니다.")
	}

	if (!channelName) {
		throw new BadRequestError("유효하지 않은 body 데이터입니다.")
	}

	const isChannelInServer = await db.server.findChannelInServer(serverId, channelId)
	if (!isChannelInServer) {
		throw new BadRequestError("유효하지 않은 서버 혹은 채널입니다.")
	}

	const { admin } = await db.server.findAdminInServer(userInfo._id, serverId)
	if (!admin) {
		throw new UnauthenticatedError("관리자 권한이 필요합니다.")
	}

	await db.channel.editChannelName(channelName, channelId)
	res.status(StatusCodes.OK).json({ message: "채널이름 수정 완료" })
})

const isAdminInChannel = asyncWrapper(async (req, res) => {
	const { userInfo } = req
	const { channelId } = req.params

	const isAdmin = await db.channel.findAdminInChannel(userInfo._id, channelId)

	res.status(StatusCodes.OK).json({ isAdmin })
})

module.exports = {
	createChannel,
	addUserInChannel,
	deleteUserInChannel,
	updateChannel,
	deleteChannel,
	createChannelMessage,
	readChannelMessage,
	updateChannelMessage,
	deleteChannelMessage,
	isAdminInChannel,
}
