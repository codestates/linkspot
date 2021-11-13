const mongoose = require("mongoose");
const { ObjectId, String } = mongoose.Schema.Types;

const channelSchema = new mongoose.Schema(
	{
		serverId: { type: ObjectId, ref: "Server" },
		channelName: String,
		channelType: String,
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
const Channel = mongoose.model("Channel", channelSchema, "channels");

module.exports = Channel;
