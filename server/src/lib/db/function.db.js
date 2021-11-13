const { Server, Message, TextChannel } = require("../../models")

const findServersByUserId = async (userId) => await Server.find({ $all: { users: { userId } } })

const addMessage = async ({ serverId, channelId, channelType, senderId, receiverId, metionIds, text }) => {
	return Message.create({
		serverId,
		channelId,
		channelType,
		senderId,
		receiverId,
		metionIds,
		text,
	})
}

const readMessage = async ({
	serverId,
	channelId,
	// channelType,
	senderId,
	receiverId,
	limit,
	skip,
}) => {
	return Message.find({
		$or: [
			{ $and: [{ serverId: serverId }, { channelId: channelId }] },
			{ $and: [{ senderId: senderId }, { receiverId: receiverId }] },
		],
	})
		.limit(limit)
		.skip(skip)
}

const updateMessage = async ({ messageId, text, mentionIds }) => {
	return Message.updateOne({ _id: messageId }, { text, mentionIds })
}

const deletMessage = async (messageId) => {
	return Message.deleteOne({ _id: messageId })
}
// 1. mention 목록
const readMention = async (userId) => {
	return Message.find({ $all: { metionId: userId } })
}

module.exports = {
	findServersByUserId,
	addMessage,
	readMessage,
	updateMessage,
	deletMessage,
	readMention,
}
