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
	// req 구성
	// body: email[가입 이메일], password[가입 패스워드]

	const { email, password } = req.body

	// 전달받은 데이터중 이메일 혹은 패스워드가 존재하지 않을 시
	// 응답코드(400)과 { message: "잘못된 바디 데이터입니다." } 응답
	// 전달받은 데이터가 validation을 지키고 있지 않을 경우
	// 응답코드(400)과 각각 { message: "이메일 양식을 맞춰주세요." }, { message: "비밀번호 양식을 맞춰주세요." } 응답
	const isWrongData = validator(email, password)
	if (isWrongData) {
		throw new BadRequestError(isWrongData.message)
	}

	// 전달받은 이메일이 DB에 이미 존재 할 경우
	// 응답코드(409)와 { message: "이미 사용중인 이메일입니다." } 응답
	const userByEmail = await db.user.findUser({ email })
	if (userByEmail) {
		throw new ConflictError("이미 사용 중인 이메일입니다.")
	}

	// 이메일의 '@' 기호 앞의 아이디를 닉네임으로 사용
	const nick = email.substring(0, email.indexOf("@"))

	// 4자리 유저넘버 생성
	const userNumber = await userNumberGenerator(nick)

	// 해당 닉네임의 4자리 유저넘버를 더 이상 생성할수 없는 경우
	// 응답코드(409)와 { message: "해당 유저이름 사용자가 너무 많습니다." } 응답
	if (!userNumber) {
		throw new ConflictError("해당 유저 이름 사용자가 너무 많습니다.")
	}

	const hashedPassword = await bcrypt.hash(password, 12)

	const userInfo = await db.user.addUser(email, hashedPassword, userNumber, nick)

	// 이메일 인증용 토큰 생성 { expiresIn: 30 minutes }
	const token = userInfo.generateAccessToken({ expiresIn: 60 * 30 })

	// 인증용 이메일 전송
	sendVerificationEmail(nick, email, token)

	// 정상적으로 회원가입이 왼료된 경우
	// 응답코드(201)외 { message: "이메일이 전송되었습니다." } 응답
	res.status(StatusCodes.CREATED).json({ message: "이메일이 전송되었습니다." })
})

// 로그인 컨트롤러
const signin = asyncWrapper(async (req, res) => {
	// req 구성
	// body: email[로그인 이메일], password[로그인 패스워드]

	const { email, password } = req.body

	// 전달받은 데이터중 이메일 혹은 패스워드가 존재하지 않을 시
	// 응답코드(400)와 { message: "잘못된 바디 데이터입니다." } 응답
	// 전달받은 데이터가 validation을 지키고 있지 않을 경우
	// 응답코드(400)와 각각 { message: "이메일 양식을 맞춰주세요." }, { message: "비밀번호 양식을 맞춰주세요." } 응답
	const isWrongData = validator(email, password)
	if (isWrongData) {
		throw new BadRequestError(isWrongData.message)
	}

	const userInfo = await db.user.findUser({ email })

	// 전달받은 이메일이 DB에 존재하지 않을 경우 응답코드(401)와 { message: "존재하지 않는 사용자입니다." } 응답
	if (!userInfo) {
		throw new UnauthenticatedError("존재하지 않는 사용자입니다.")
	}

	// 전달받은 패스워드가 DB의 유저정보와 일치하지 않을 경우 응답코드(401)와 { message: "비밀번호가 맞지 않습니다." } 응답
	const isMatch = await userInfo.comparePassword(password)
	if (!isMatch) {
		throw new UnauthenticatedError("비밀번호가 맞지 않습니다.")
	}

	const { password: _, ...userData } = userInfo._doc

	// 로그인 인증용 토큰 생성 { expiresIn: 24 hours }
	// cookie에 "authorization"라는 이름으로 전달
	const token = userInfo.generateAccessToken({ expiresIn: 60 * 60 * 24 * 24 })
	res.cookie("authorization", token, {
		SameSite: "None",
		httpOnly: true,
		secure: true,
	})

	//  userInfo, servers 로 response body 변경
	if (!userInfo.serverIds.length) {
		return res.status(StatusCodes.ACCEPTED).json({ userInfo: userData, servers: [] })
	}

	const serverlList = userInfo.serverIds.map((serverId) => {
		return { serverIds: serverId }
	})

	const serverData = await db.server.findServersInfo(serverlList)

	res.status(StatusCodes.ACCEPTED).json({ userInfo: userData, servers: serverData })

	// 정상적으로 로그인이 완료되고 유저가 가입한 서버가 없는 경우 응답코드(200)과 유저정보와 빈 채널목록을 응답
	// if (!userInfo.serverIds.length) {
	// 	return res
	// 		.status(StatusCodes.OK)
	// 		.json({ userInfo: userData, channels: [] });
	// }

	// const channelsByServerId = userInfo.serverIds.map((serverId) => {
	// 	return serverId.channelIds.map((_) => {
	// 		return { _id: serverId };
	// 	});
	// });

	// const channelsIds = channelsByServerId.flat();
	// const channels = await db.channel.findChannelsByChannelId(channelsIds);

	// // 정상적으로 로그인이 완료된 경우
	// // 응답코드(200)와 유저정보와 채널목록을 응답
	// res.status(StatusCodes.OK).json({ userInfo: userData, channels });
})

// 이메일 인증 컨트롤러
const verifyEmail = asyncWrapper(async (req, res) => {
	// req 구성
	// params: token[이메일 인증용 JWT 토큰]

	// 전달받은 토큰이 유효한지 확인
	const { token } = req.params
	const { _id } = await jwt.verify(token, config.jwtSecret)

	// 전달받은 토큰이 유효하지 않거나 시간이 지난 경우
	// 응답코드(400)와 { message: "유효하지않은 인증링크 입니다." } 응답
	const userById = await db.user.findUser({ userId: _id })
	if (!userById) {
		throw new BadRequestError("유효하지않은 인증링크 입니다.")
	}

	// 이미 이메일 인증이 완료된 경우
	// 응답코드(400)와 { message: "유효하지않은 인증링크 입니다." } 응답
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
	// req 구성
	// cookies: authorization[로그인 인증용 JWT 토큰]
	// body: email[변경 이메일], password[현재 비밀번호]

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

	// 인증용 이메일 전송
	sendVerificationEmail(nick, email, token)

	// undefined는 수정되지 않습니다.
	await db.user.editUserInfo({ _id, email })
	await db.user.updateVerified(_id, false)

	res.status(StatusCodes.OK).json({ email, message: "이메일을 수정했습니다." })
})

const updatePassword = asyncWrapper(async (req, res) => {
	// req 구성
	// cookies: authorization[로그인 인증용 JWT 토큰]
	// body: currentPassword[현재 비밀번호], changePassword[변경 비밀번호]

	const { currentPassword, changePassword } = req.body
	const { userInfo } = req
	// 수정사항: userInfo가 undefined가 되서 isMatch 실행 안 됨
	const isMatch = await userInfo.comparePassword(currentPassword)
	if (!isMatch) {
		throw new UnauthenticatedError("비밀번호가 맞지 않습니다.")
	}

	const isValidPassword = passwordValidator(changePassword)
	if (!isValidPassword) {
		throw new BadRequestError("비밀번호 양식을 맞춰주세요.")
	}

	const hashedPassword = await bcrypt.hash(changePassword, 12)

	// undefined는 수정되지 않습니다.
	await db.user.editUserInfo({ _id: userInfo._id, password: hashedPassword })

	res.status(StatusCodes.OK).json({ message: "비밀번호를 수정했습니다." })
})

const updateNick = asyncWrapper(async (req, res) => {
	// req 구성
	// cookies: authorization[로그인 인증용 JWT 토큰]
	// body: nick[변경 닉네임], password[현재 비밀번호]

	const { nick, password } = req.body
	const { _id } = req.userInfo
	// 수정사항: userInfo가 undefined가 되서 isMatch 실행 안 됨
	const { userInfo } = req

	const isMatch = await userInfo.comparePassword(password)
	if (!isMatch) {
		throw new UnauthenticatedError("비밀번호가 일치하지 않습니다.")
	}

	const isValidNick = nickValidator(nick)
	if (!isValidNick) {
		throw new BadRequestError("닉네임 양식을 맞춰주세요.")
	}

	// 4자리 유저넘버 생성
	const userNumber = await userNumberGenerator(nick)

	// 해당 닉네임의 4자리 유저넘버를 더 이상 생성할수 없는 경우
	// 응답코드(409)와 { message: "해당 유저이름 사용자가 너무 많습니다." } 응답
	if (!userNumber) {
		throw new ConflictError("해당 유저이름 사용자가 너무 많습니다.")
	}

	// undefined는 수정되지 않습니다.
	await db.user.editUserInfo({
		_id,
		username: nick,
		userNumber,
	})

	res.status(StatusCodes.OK).json({ nick, message: "닉네임을 수정했습니다." })
})

const updatePicture = asyncWrapper(async (req, res) => {
	// req 구성
	// cookies: authorization[로그인 인증용 JWT 토큰]
	// body: profilePicture[변경 프로필사진], password[현재 비밀번호]

	const { profilePicture, password } = req.body
	const { _id } = req.userInfo
	// 수정사항: userInfo가 undefined가 되서 isMatch 실행 안 됨
	const { userInfo } = req

	const isMatch = await userInfo.comparePassword(password)
	if (!isMatch) {
		throw new UnauthenticatedError("비밀번호가 맞지 않습니다.")
	}

	if (!profilePicture) {
		throw new BadRequestError("프로필 사진이 존재하지 않습니다.")
	}

	// undefined는 수정되지 않습니다.
	await db.user.editUserInfo({
		_id,
		profilePicture,
	})

	res.status(StatusCodes.OK).json({ profilePicture, message: "프로필 사진을 수정했습니다." })
})

const updateProfileColor = asyncWrapper(async (req, res) => {
	// req 구성
	// cookies: authorization[로그인 인증용 JWT 토큰]
	// body: profileColor[변경 프로필 색상], password[현재 비밀번호]

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

	// undefined는 수정되지 않습니다.
	await db.user.editUserInfo({
		_id,
		profileColor,
	})

	res.status(StatusCodes.OK).json({ profileColor, message: "프로필 사진을 수정했습니다." })
})

const deleteUser = asyncWrapper(async (req, res) => {
	// req 구성
	// cookies: authorization[로그인 인증용 JWT 토큰]
	// body: channelIds
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
