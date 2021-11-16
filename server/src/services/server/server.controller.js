const { StatusCodes } = require("http-status-codes")

const db = require("../../lib/db")
const { asyncWrapper } = require("../../lib/middlewares/async")
const { ConflictError, UnauthenticatedError, NotFoundError, BadRequestError } = require("../../lib/errors")

// 서버 생성 컨트롤러
const createServer = asyncWrapper(async (req, res) => {
	const { serverName } = req.body
	if (!serverName) {
		throw new BadRequestError("유효하지 않은 데이터입니다.")
	}

	const serverData = await db.server.createServer(serverName, req.userInfo._id)
	
	res.status(StatusCodes.CREATED).json({ serverData })
})

// 서버 삭제 컨트롤러
const deleteServer = asyncWrapper(async (req, res) => {
	const { userInfo } = req
	const { serverId } = req.params

	const { admin: isAdmin } = await db.server.findAdminInServer(userInfo._id, serverId)
	if (!isAdmin) {
		throw new UnauthenticatedError("관리자 권한이 필요합니다.")
	}
	
	await db.server.deleteServer(serverId)
	
	res.status(StatusCodes.NO_CONTENT).json()
})

// 서버 가입 컨트롤러
const joinServer = asyncWrapper(async (req, res) => {
	const result = await db.server.joinServer(req.userInfo._id, req.params.serverId)
	if (!result) {
		throw new ConflictError("이미 가입된 서버입니다.")
	}

	res.status(StatusCodes.CREATED).json({ result })
})

// 서버 탈퇴 컨트롤러
const leaveServer = asyncWrapper(async (req, res) => {
	await db.server.leaveServer(
		req.userInfo._id,
		req.params.serverId
	)

	res.status(StatusCodes.OK).json({ message: "서버 탈퇴에 성공했습니다." })
})

// 유저 어드민 권한 확인 
const isAdminInServer = asyncWrapper(async (req, res) => {
	const isAdmin = await db.server.findAdminInServer(req.userInfo._id, req.params.serverId)
	
	res.status(StatusCodes.OK).json({ data: isAdmin })
})

module.exports = { joinServer, leaveServer, createServer, deleteServer, isAdminInServer }
