const { User } = require("../../models")

const addUser = async (email, password, userNumber, username) => {
	return User.create({
		email,
		password,
		username,
		userNumber,
		directList: [],
		serverIds: [],
	})
}

const deleteUserInUser = async (_id) => {
	return User.deleteOne({ _id: _id })
}

const deleteUser = async (userId) => {
	return await deleteUserInUser(userId)
}

const editUserInfo = async ({ _id, username, email, password, profileColor, profilePicture }) => {
	return User.findOneAndUpdate(
		{ _id },
		{
			username: username,
			email: email,
			password: password,
			profileColor: profileColor,
			profilePicture: profilePicture,
		}
	)
}

const findUser = async ({ email, userId }) => {
	// await User.findOne({ $or: [{ email: email }, { userId: userId }] })
	return User.findOne({ $or: [{ email: email }, { _id: userId }] })
		.populate({
			path: "directList",
			select: ["_id", "username", "userNumber", "profilePicture"],
		})
		.populate({
			path: "friendRequests",
			select: ["_id", "username", "userNumber", "profilePicture"],
		})
}

const updateVerified = async (_id, status) => {
	return User.updateOne({ _id }, { $set: { verified: status } })
}

const findUserInfoByUserId = async (userId) =>
	User.findOne({ _id: userId }).select(["_id", "username", "userNumber", "profilePicture", "directList"])

const updateDirectList = async (senderId, receiverId) =>
	User.updateOne(
		{ _id: senderId },
		{
			$push: {
				directList: receiverId,
			},
		}
	)

module.exports = {
	addUser,
	findUser,
	editUserInfo,
	deleteUser,
	updateVerified,
	findUserInfoByUserId,
	updateDirectList,
}
