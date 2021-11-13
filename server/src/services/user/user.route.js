const router = require("express").Router()

const {
	signup,
	signin,
	signout,
	updateEmail,
	updatePassword,
	updateProfileColor,
	updatePicture,
	updateNick,
	deleteUser,
	verifyEmail,
} = require("./user.controller")
const isLoggedIn = require("../../lib/middlewares/isLoggedIn")

// 회원가입
router.post("/user", signup)

// 로그인
router.post("/user/signin", signin)

// 로그아웃
router.post("/user/signout", isLoggedIn, signout)

// 이메일 인증 (params: token[이메일 인증용 JWT 토큰])
router.post("/user/email/:token", verifyEmail)

// 유저정보 업데이트 (순서대로: email, password, picture, nick)
router.patch("/user/email", isLoggedIn, updateEmail)
// 수정사항: updatePassword -> updatePicture
router.patch("/user/nick", isLoggedIn, updateNick)
router.patch("/user/picture", isLoggedIn, updatePicture)
// 수정사항: updatePicture -> updatePassword
router.patch("/user/password", isLoggedIn, updatePassword)
router.patch("/user/color", isLoggedIn, updateProfileColor)

// 회원탈퇴
router.delete("/user", isLoggedIn, deleteUser)

module.exports = router
