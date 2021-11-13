const router = require("express").Router()

const isLoggedIn = require("../../lib/middlewares/isLoggedIn")
const { joinServer, leaveServer, createServer, deleteServer, isAdminInServer } = require("./server.controller")

// 서버 가입
router.post("/server/:serverId/join", isLoggedIn, joinServer)

// 서버 탈퇴
router.post("/server/:serverId/withdraw", isLoggedIn, leaveServer)

// 서버 생성
router.post("/server", isLoggedIn, createServer)

// 서버 삭제
router.delete("/server/:serverId", isLoggedIn, deleteServer)

// 서버 Admin 체커
router.get("/server/:serverId/admin", isLoggedIn, isAdminInServer)

module.exports = router
