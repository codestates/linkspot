const { User, Message } = require("../../models")
const { addMessage, readMessage, updateMessage, deletMessage } = require("./function.db")

// 2. 대화한 유저 목록 추가
const addDirectList = async (senderId, receiverId, username, profilePicture) => {
	return User.updateOne({ _id: senderId }, { $push: { directList: { userId: receiverId, username, profilePicture } } })
}
// 3. 대화한 유저 목록 삭제
const deletDirectList = async (senderId, receiverId) => {
	return User.updateOne({ _id: senderId }, { $pull: { directList: receiverId } })
}

const findDMbyMessageId = async (messageId) => {
	return Message.findOne({ _id: messageId })
}

module.exports = {
	addMessage,
	readMessage,
	updateMessage,
	deletMessage,
	addDirectList,
	deletDirectList,
	findDMbyMessageId,
}
