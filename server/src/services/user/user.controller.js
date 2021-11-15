const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { StatusCodes } = require("http-status-codes")

const db = require("../../lib/db")
const sendVerificationEmail = require("../../lib/verificationMail")
const { userNumberGenerator } = require("../../lib/userNumberGenerator")
const { config } = require("../../../config/config")
const { asyncWrapper } = require("../../lib/middlewares/async")
const { ConflictError, UnauthenticatedError, NotFoundError, BadRequestError } = require("../../lib/errors")
const { validator, emailValidator, nickValidator, passwordValidator } = require("../../lib/validator")
const { crossOriginEmbedderPolicy } = require("helmet")

// 화원가입 컨트롤러
const signup = asyncWrapper(async (req, res) => {
	const { email, password } = req.body
	
	const isWrongData = validator(email, password)
	if (isWrongData) {
		throw new BadRequestError(isWrongData.message)
	}

	const userByEmail = await db.user.findUser({ email })
	if (userByEmail) {
		throw new ConflictError("이미 사용 중인 이메일입니다.")
	}

	const nick = email.substring(0, email.indexOf("@"))

	const userNumber = await userNumberGenerator(nick)

	if (!userNumber) {
		throw new ConflictError("해당 유저 이름 사용자가 너무 많습니다.")
	}

	const hashedPassword = await bcrypt.hash(password, 12)

	const userInfo = await db.user.addUser(email, hashedPassword, userNumber, nick)

	// 이메일 인증용 토큰 생성 { expiresIn: 30 minutes }
	const token = userInfo.generateAccessToken({ expiresIn: 60 * 30 })

	sendVerificationEmail(nick, email, token)

	res.status(StatusCodes.CREATED).json({ message: "이메일이 전송되었습니다." })
})

// 로그인 컨트롤러
const signin = asyncWrapper(async (req, res) => {
	const { email, password } = req.body

	const isWrongData = validator(email, password)
	if (isWrongData) {
		throw new BadRequestError(isWrongData.message)
	}

	const userInfo = await db.user.findUser({ email })

	if (!userInfo) {
		throw new UnauthenticatedError("존재하지 않는 사용자입니다.")
	}

	const isMatch = await userInfo.comparePassword(password)
	if (!isMatch) {
		throw new UnauthenticatedError("비밀번호가 맞지 않습니다.")
	}

	const { password: _, ...userData } = userInfo._doc

	const token = userInfo.generateAccessToken({ expiresIn: 60 * 60 * 24 * 24 })
	res.cookie("authorization", token, {
		SameSite: "None",
		httpOnly: true,
		secure: true,
	})

	if (!userInfo.serverIds.length) {
		return res.status(StatusCodes.OK).json({ userInfo: userData, servers: [] })
	}

	const serverlList = userInfo.serverIds.map((serverId) => {
		return { serverIds: serverId }
	})

	const serverData = await db.server.findServersInfo(serverlList)

	res.status(StatusCodes.OK).json({ userInfo: userData, servers: serverData })
})

// 이메일 인증 컨트롤러
const verifyEmail = asyncWrapper(async (req, res) => {
	const { token } = req.params
	const { _id } = await jwt.verify(token, config.jwtSecret)

	const userById = await db.user.findUser({ userId: _id })
	if (!userById) {
		throw new BadRequestError("유효하지않은 인증링크 입니다.")
	}

	if (userById.verified) {
		throw new ConflictError("이미 인증되었습니다.")
	}

	await db.user.updateVerified(_id, true)
	res.status(StatusCodes.OK).json({ message: "인증성공" })
})

const signout = (req, res) => {
	res.clearCookie("authorization")
	res.status(StatusCodes.OK).json({ message: "로그아웃에 성공했습니다." })
}

// 이메일 변경 컨트롤러
const updateEmail = asyncWrapper(async (req, res) => {
	const { email, password } = req.body
	const { _id, nick, email: currentEmail } = req.userInfo

	const isMatch = await req.userInfo.comparePassword(password)
	if (!isMatch) {
		throw new UnauthenticatedError("비밀번호가 맞지 않습니다.")
	}

	const isValidEmail = emailValidator(email)
	if (!isValidEmail) {
		throw new BadRequestError("이메일 양식을 맞춰주세요.")
	}

	if (currentEmail === email) {
		throw new ConflictError("현재 이메일과 동일합니다.")
	}

	const userByEmail = await db.user.findUser({ email })
	if (userByEmail) {
		throw new ConflictError("이미 사용중인 이메일입니다.")
	}

	// 이메일 인증용 토큰 생성 { expiresIn: 30 minutes }
	const token = req.userInfo.generateAccessToken({ expiresIn: 60 * 30 })

	sendVerificationEmail(nick, email, token)

	await db.user.editUserInfo({ _id, email })
	await db.user.updateVerified(_id, false)

	res.status(StatusCodes.OK).json({ email, message: "이메일을 수정했습니다." })
})

const updatePassword = asyncWrapper(async (req, res) => {
	const { currentPassword, changePassword } = req.body
	const { userInfo } = req
	const isMatch = await userInfo.comparePassword(currentPassword)
	if (!isMatch) {
		throw new UnauthenticatedError("비밀번호가 맞지 않습니다.")
	}

	const isValidPassword = passwordValidator(changePassword)
	if (!isValidPassword) {
		throw new BadRequestError("비밀번호 양식을 맞춰주세요.")
	}

	const hashedPassword = await bcrypt.hash(changePassword, 12)
	await db.user.editUserInfo({ _id: userInfo._id, password: hashedPassword })

	res.status(StatusCodes.OK).json({ message: "비밀번호를 수정했습니다." })
})

const updateNick = asyncWrapper(async (req, res) => {
	const { nick, password } = req.body
	const { _id } = req.userInfo
	const { userInfo } = req

	const isMatch = await userInfo.comparePassword(password)
	if (!isMatch) {
		throw new UnauthenticatedError("비밀번호가 일치하지 않습니다.")
	}

	const isValidNick = nickValidator(nick)
	if (!isValidNick) {
		throw new BadRequestError("닉네임 양식을 맞춰주세요.")
	}

	const userNumber = await userNumberGenerator(nick)
	if (!userNumber) {
		throw new ConflictError("해당 유저이름 사용자가 너무 많습니다.")
	}

	await db.user.editUserInfo({
		_id,
		username: nick,
		userNumber,
	})

	res.status(StatusCodes.OK).json({ nick, message: "닉네임을 수정했습니다." })
})

const updatePicture = asyncWrapper(async (req, res) => {
	const { profilePicture, password } = req.body
	const { _id } = req.userInfo

	const { userInfo } = req

	const isMatch = await userInfo.comparePassword(password)
	if (!isMatch) {
		throw new UnauthenticatedError("비밀번호가 맞지 않습니다.")
	}

	if (!profilePicture) {
		throw new BadRequestError("프로필 사진이 존재하지 않습니다.")
	}

	await db.user.editUserInfo({
		_id,
		profilePicture,
	})

	res.status(StatusCodes.OK).json({ profilePicture, message: "프로필 사진을 수정했습니다." })
})

const updateProfileColor = asyncWrapper(async (req, res) => {
	const { profileColor, password } = req.body
	const { _id } = req.userInfo
	// 수정사항: userInfo가 undefined가 되서 isMatch 실행 안 됨
	const { userInfo } = req
	const isMatch = await userInfo.comparePassword(password)
	if (!isMatch) {
		throw new UnauthenticatedError("비밀번호가 맞지 않습니다.")
	}

	if (!profileColor) {
		throw new BadRequestError("프로필 색상이 존재하지 않습니다.")
	}

	if (!/^#(?:[0-9a-fA-F]{3}){1,2}$/i.test(profileColor)) {
		throw new BadRequestError("Hex color code가 아닙니다.")
	}

	await db.user.editUserInfo({
		_id,
		profileColor,
	})

	res.status(StatusCodes.OK).json({ profileColor, message: "프로필 사진을 수정했습니다." })
})

const deleteUser = asyncWrapper(async (req, res) => {
	const { userInfo } = req
	await db.user.deleteUser(userInfo._id)

	for await (const serverId of userInfo.serverIds) {
		await db.server.leaveServer(userInfo._id, serverId, req.body.channelIds)
	}

	res.clearCookie("authorization")
	res.status(StatusCodes.NO_CONTENT).json()
})

module.exports = {
	signup,
	signin,
	signout,
	verifyEmail,
	updateEmail,
	updatePassword,
	updatePicture,
	updateProfileColor,
	updateNick,
	deleteUser,
}
