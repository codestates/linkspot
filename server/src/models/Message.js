const mongoose = require("mongoose");
const { ObjectId, String } = mongoose.Schema.Types;

const MessageSchema = new mongoose.Schema(
	{
		serverId: {
			type: ObjectId,
			ref: "Server",
		},
		channelId: {
			type: ObjectId,
			ref: "textChannel",
		},
		receiverId: {
			type: ObjectId,
			ref: "User",
		},
		senderId: {
			type: ObjectId,
			ref: "User",
		},
		mentionIds: [{ type: ObjectId, ref: "User" }],
		text: String,
	},
	{ timestamps: true }
);
const Message = mongoose.model("Message", MessageSchema, "messages");
module.exports = Message;
