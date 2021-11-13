const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const FriendSchema = new mongoose.Schema(
	{ friends: [{ type: ObjectId, ref: "User" }] },
	{
		timestamps: true,
	}
);

const Friend = mongoose.model("Freiend", FriendSchema, "friends");
module.exports = Friend;
