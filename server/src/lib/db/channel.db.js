const { addMessage, readMessage, updateMessage, deletMessage } = require("./function.db")
const { Channel } = require("../../models")

const findAdminInChannel = async (userId, channelId) => {
	const { users } = await Channel.findOne({ _id: channelId }).select("users")
	for await (const user of users) {
		if (String(user.userId) === String(userId)) {
			return { admin: user.admin }
		}
	}
	return { admin: false }
}

const addUserInChannel = async (channelId, userId) => {
	return Channel.updateOne(
		{ _id: channelId, "Channels._id": channelId },
		{ $push: { users: { userId, admin: false } } }
	)
}

const createChannel = async ({ users, serverId, channelName, channelType }) => {
	return Channel.create({
		serverId: serverId,
		channelName: channelName,
		channelType: channelType,
		users: users,
	})
}

const deleteUserInChannel = async (channelId, user) => {
	return Channel.updateOne({ _id: channelId, "Channels._id": channelId }, { $pull: { users: { userId: user } } })
}

const deleteChannelsByServerId = async (serverId) => {
	return Channel.deleteMany({ serverId: serverId })
}

const deleteChannel = async (channelId) => {
	return Channel.deleteOne({ _id: channelId })
}

const editChannelName = async (channelName, channelId) => {
	return Channel.updateOne({ _id: channelId }, { channelName: channelName })
}

const findChannelsByChannelId = async (channelList) => {
	return Channel.find({ $or: channelList })
}

const findUserInChannel = async (channelId, userId) =>
	Channel.findOne({
		$and: [{ _id: channelId }, { "users.userId": userId }],
	}).select("users")

// 채널 이름 수정 추가 안함.

module.exports = {
	addMessage,
	readMessage,
	updateMessage,
	deletMessage,
	editChannelName,
	findChannelsByChannelId,
	createChannel,
	addUserInChannel,
	deleteUserInChannel,
	deleteChannelsByServerId,
	deleteChannel,
	findAdminInChannel,
	findUserInChannel,
}
