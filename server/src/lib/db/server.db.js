const { Server, User, Channel } = require("../../models")
const { createChannel, addUserInChannel, deleteUserInChannel, deleteChannelsByServerId } = require("./channel.db")

const findAdminInServer = async (userId, serverId) => {
	const { users } = await Server.findOne({ _id: serverId }).select("users")
	for await (const user of users) {
		if (String(user.userId) === String(userId)) {
			return { admin: user.admin }
		}
	}
	return { admin: false }
}

const findServersInfo = async (serverIds) => {
	return Server.find({ $or: serverIds })
		.populate({
			path: "channelIds",
		})
		.populate({
			path: "users.userId",
			select: ["_id", "username", "userNumber", "profilePicture"],
		})
}

const addServer = async (serverName, userId) => {
	return Server.create({
		serverName,
		gettingStart: {
			inviteUser: false,
			addIcon: false,
			sendMessage: false,
		},
		channelIds: [],
		users: [
			{
				userId,
				admin: true,
			},
		],
	})
}

const addServerInUser = async (userId, serverId) => {
	return User.updateOne({ _id: userId }, { $push: { serverIds: serverId } })
}

const addChannelInServer = async (serverId, channelId) => {
	return Server.updateOne({ _id: serverId, channels: channelId }, { $push: { channelIds: channelId } })
}

const addUserInServer = async (serverId, userId) => {
	return Server.updateOne({ _id: serverId }, { $push: { users: { userId, admin: false } } })
}

const deleteServerInUser = async (userId, serverId) => {
	return User.updateOne({ _id: userId }, { $pull: { serverIds: serverId } })
}

const deleteUserInServer = async (serverId, userId) => {
	return Server.updateOne({ _id: serverId }, { $pull: { users: { userId } } })
}
const findServersByServerId = async (serverId) => {
	return Server.findOne({ _id: serverId })
}

const deleteServerByServerId = async (serverId) => {
	return Server.deleteOne({ _id: serverId })
}

// 추가
const findUsersInServer = async (serverId) => {
	return Server.findOne({ _id: serverId })
}
// .select("users")

const createServer = async (serverName, userId) => {
	const server = await addServer(serverName, userId)
	await addServerInUser(userId, server._id)
	const textChannel = await createChannel({
		userId: userId,
		serverId: server._id,
		channelName: "general",
		channelType: "Text",
	})
	const voiceChannel = await createChannel({
		userId: userId,
		serverId: server._id,
		channelName: "general",
		channelType: "Voice",
	})
	await addChannelInServer(server._id, textChannel._id)
	await addChannelInServer(server._id, voiceChannel._id)
	const newServer = await Server.findOne({ _id: server._id })
		.populate({
			path: "channelIds",
		})
		.populate({
			path: "users.userId",
			select: ["_id", "username", "userNumber", "profilePicture"],
		})
	return newServer
}

const deleteServer = async (serverId) => {
	console.log(serverId)
	const server = await findServersByServerId(serverId)
	const userIds = server.users.map((el) => el.userId)
	for await (const userId of userIds) {
		await User.updateOne({ _id: userId }, { $pull: { serverIds: server._id } })
	}
	await deleteServerByServerId(serverId)
	await deleteChannelsByServerId(serverId)
}

const joinServer = async (userId, serverId) => {
	const joinedUserList = await Server.findOne({
		$and: [{ _id: serverId }, { "users.userId": userId }],
	})
	if (joinedUserList) return false
	await addServerInUser(userId, serverId)
	await addUserInServer(serverId, userId)
	const server = await Server.findOne({ _id: serverId })
	for await (const channelId of server.channelIds) {
		await addUserInChannel(channelId, userId)
	}

	const serverInfo = await Server.findOne({ _id: serverId })
		.populate({
			path: "channelIds",
		})
		.populate({
			path: "users.userId",
			select: ["_id", "username", "userNumber", "profilePicture"],
		})

	return serverInfo
}

const leaveServer = async (userId, serverId) => {
	const channelIdsObject = await Server.findOne({ _id: serverId }).select("channelIds")
	await deleteServerInUser(userId, serverId)
	await deleteUserInServer(serverId, userId)
	for await (const channelId of channelIdsObject.channelIds) {
		await deleteUserInChannel(channelId, userId)
	}
}

const findChannelInServer = async (serverId, channelId) => {
	return Server.findOne({
		$and: [{ _id: serverId }, { channelIds: channelId }],
	})
}

module.exports = {
	createServer,
	joinServer,
	leaveServer,
	deleteServer,
	findServersInfo,
	findAdminInServer,
	findUsersInServer,
	findChannelInServer,
}
