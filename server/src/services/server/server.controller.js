const { StatusCodes } = require("http-status-codes")

const db = require("../../lib/db")
const { asyncWrapper } = require("../../lib/middlewares/async")
const { ConflictError, UnauthenticatedError, NotFoundError, BadRequestError } = require("../../lib/errors")

const createServer = asyncWrapper(async (req, res) => {
	// req 구성
	// cookies: authorization[로그인 인증용 JWT 토큰]
	// body: serverName[생성 서버이름]

	const { serverName } = req.body
	if (!serverName) {
		throw new BadRequestError("유효하지 않은 데이터입니다.")
	}

	const serverData = await db.server.createServer(serverName, req.userInfo._id)
	
	res.status(StatusCodes.CREATED).json({ serverData })
})

const deleteServer = asyncWrapper(async (req, res) => {
	// req 구성
	// cookies: authorization[로그인 인증용 JWT 토큰]
	// params: serverId[삭제 서버 Id]
	
	const { userInfo } = req
	const { serverId } = req.params

	const { admin: isAdmin } = await db.server.findAdminInServer(userInfo._id, serverId)
	if (!isAdmin) {
		throw new UnauthenticatedError("관리자 권한이 필요합니다.")
	}
	
	await db.server.deleteServer(serverId)
	
	res.status(StatusCodes.NO_CONTENT).json()
})

const joinServer = asyncWrapper(async (req, res) => {
	// req 구성
	// cookies: authorization[로그인 인증용 JWT 토큰]
	// params: serverId[가입 서버 Id]

	const result = await db.server.joinServer(req.userInfo._id, req.params.serverId)
	if (!result) {
		throw new ConflictError("이미 가입된 서버입니다.")
	}

	res.status(StatusCodes.CREATED).json({ result })
})

const leaveServer = asyncWrapper(async (req, res) => {
	// req 구성
	// cookies: authorization[로그인 인증용 JWT 토큰]
	// params: serverId[탈퇴 서버 Id]
	
	await db.server.leaveServer(
		req.userInfo._id,
		req.params.serverId
		// req.bodychannelIds
	)

	res.status(StatusCodes.OK).json({ message: "서버 탈퇴에 성공했습니다." })
})

const isAdminInServer = asyncWrapper(async (req, res) => {
	const isAdmin = await db.server.findAdminInServer(req.userInfo._id, req.params.serverId)
	
	res.status(StatusCodes.OK).json({ data: isAdmin })
})

module.exports = { joinServer, leaveServer, createServer, deleteServer, isAdminInServer }
