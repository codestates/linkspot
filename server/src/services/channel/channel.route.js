const router = require("express").Router()

const isLoggedIn = require("../../lib/middlewares/isLoggedIn")

const {
	createChannelMessage,
	readChannelMessage,
	updateChannelMessage,
	deleteChannelMessage,
	deleteChannel,
	createChannel,
	addUserInChannel,
	deleteUserInChannel,
	updateChannel,
	isAdminInChannel,
} = require("./channel.controller")

router.post("/server/:serverId/channel/:channelId/message", isLoggedIn, createChannelMessage)

router.get("/server/:serverId/channel/:channelId/message", isLoggedIn, readChannelMessage)

router.patch("/server/:serverId/channel/:channelId/message/:messageId", isLoggedIn, updateChannelMessage)

router.delete("/server/:serverId/channel/:channelId/message/:messageId", isLoggedIn, deleteChannelMessage)

router.post("/server/:serverId/channel", isLoggedIn, createChannel)

router.delete("/server/:serverId/channel/:channelId", isLoggedIn, deleteChannel)

router.patch("/server/:serverId/channel/:channelId/user/:userId", isLoggedIn, addUserInChannel)

router.delete("/server/:serverId/channel/:channelId/user/:userId", isLoggedIn, deleteUserInChannel)

router.patch("/server/:serverId/channel/:channelId", isLoggedIn, updateChannel)

router.get("/server/:serverId/channel/:channelId/admin", isLoggedIn, isAdminInChannel)

module.exports = router
