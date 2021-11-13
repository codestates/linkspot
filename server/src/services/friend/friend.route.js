const router = require("express").Router()

const isLoggedIn = require("../../lib/middlewares/isLoggedIn")

const {
	friendRequest,
	rejectFriendRequest,
	createFriend,
	readFriendList,
	deleteFriend,
} = require("./friend.controller")

// 친구 요청 (params: userId[친구 요청 상대 _id])
router.post("/friend", isLoggedIn, friendRequest)

// 친구 요청 승낙 (params: userId[친구 요청 수락 상대 _id])
router.post("/friend/accept/:userId", isLoggedIn, createFriend)

// 친구 목록 읽기
router.get("/friend", isLoggedIn, readFriendList)

// 친구 요청 거절 (params: userId[친구 요청 거절 상대 _id])
router.post("/friend/reject/:userId", isLoggedIn, rejectFriendRequest)

// 친구 삭제 (params: userId[친구 삭제할 상대 _id])
router.delete("/friend/:userId", isLoggedIn, deleteFriend)

module.exports = router
