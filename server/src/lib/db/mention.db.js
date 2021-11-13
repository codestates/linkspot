const { Message } = require("../../models")

// 1. mention 목록
const readMention = async (userId) => {
	return Message.find({ mentionIds: { $all: [userId] } })
}

module.exports = {
	readMention,
}
