const mongoose = require("mongoose");
const { String, Boolean, ObjectId } = mongoose.Schema.Types;

const ServerSchema = new mongoose.Schema(
	{
		serverName: String,
		thumbnail: String,
		gettingStart: {
			inviteUser: Boolean,
			addIcon: Boolean,
			sendMessage: Boolean,
		},
		channelIds: [{ type: ObjectId, ref: "Channel" }],
		users: [
			{
				userId: {
					type: ObjectId,
					ref: "User",
				},
				admin: Boolean,
				userNameInServer: String,
			},
		],
	},
	{ timestamps: true }
);
const Server = mongoose.model("Server", ServerSchema, "servers");

module.exports = Server;
