const router = require("express").Router()

const isLoggedIn = require("../../lib/middlewares/isLoggedIn")

const {
	createDirectMessage,
	readDirectMessage,
	updateDirectMessage,
	deleteDirectMessage,
	deleteDirectList,
} = require("./direct.controller")

router.post("/direct/:userId", isLoggedIn, createDirectMessage)

router.get("/direct/:userId", isLoggedIn, readDirectMessage)

router.patch("/direct/:userId/messages/:messageId", isLoggedIn, updateDirectMessage)

router.delete("/direct/:userId/messages/:messageId", isLoggedIn, deleteDirectMessage)

router.delete("/direct/:userId", isLoggedIn, deleteDirectList)

module.exports = router
