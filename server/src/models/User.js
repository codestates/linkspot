const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { ObjectId } = mongoose.Schema.Types

const { config } = require("../../config/config")

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			require: true,
			// min: 5,
			// max: 15,
			// unique: true,
		},
		userNumber: Number,
		email: {
			type: String,
			require: true,
			// max: 50,
			// unique: true,
		},
		password: {
			type: String,
			require: true,
			// min: 8,
		},
		profileColor: String,
		profilePicture: String,
		friendRequests: [
			{
				type: ObjectId,
				ref: "User",
			},
		],
		directList: [
			{
				type: ObjectId,
				ref: "User",
			},
		],
		serverIds: [
			{
				type: ObjectId,
				ref: "Server",
			},
		],
		verified: {
			type: Boolean,
			default: false,
		},
	},

	{ timestamps: true }
)

UserSchema.methods.generateAccessToken = function (expiresIn) {
	const { _id } = this
	return jwt.sign({ _id }, config.jwtSecret, expiresIn)
}

UserSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password)
}

const User = mongoose.model("User", UserSchema, "users")

module.exports = User
