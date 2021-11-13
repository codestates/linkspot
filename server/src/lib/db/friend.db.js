const { Friend, User } = require("../../models")
const { BadRequestError } = require("../../lib/errors")

// 친구 추가
const addFreind = async (senderId, receiverId) => {
	Friend.create({ friends: [senderId, receiverId] })
	await deleteFriendRequest(senderId, receiverId)

	const friendInfo = await findFriendInfo(senderId)
	return friendInfo
}

// 친구 삭제
const deleteFriend = async (userId, friendId) => {
	return Friend.deleteOne({ freinds: { $and: [userId, friendId] } })
}

const deleteFriendRequest = async (senderId, receiverId) => {
	return User.updateOne({ _id: receiverId }, { $pull: { friendRequests: senderId } })
}

// 친구 정보 찾기
const findFriendInfo = async (friendId) => {
	return User.findOne({ _id: friendId }).select(["_id", "username", "userNumber", "profilePicture"])
}

// 친구 요청
const freindRequest = async (senderId, username, userNumber) => {
	const receiver = await User.findOne({ username, userNumber })
	const friendInfo = await isFriend(senderId, receiver._id)
	if (friendInfo) throw new BadRequestError("이미 친구 입니다.")

	if (!receiver) {
		return { code: 404, message: "해당 아이디는 존재하지 않습니다." }
	}

	if (receiver.friendRequests && receiver.friendRequests.includes(senderId)) {
		return { code: 409, message: "이미 친구요청을 보냈습니다." }
	}

	await User.updateOne({ _id: receiver._id }, { $push: { friendRequests: senderId } })
	return false
}

// 친구 읽기
const readFreindList = async (userId) => {
	return Friend.find({ friends: { $all: userId } }).populate({
		path: "friends",
		select: ["username", "userNumber", "profilePicture"],
	})
}

// 친구 요청 거절
const rejectFriendRequest = async (senderId, receiverId) => {
	return await deleteFriendRequest(senderId, receiverId)
}

const isFriend = async (userId, friendId) =>
	Friend.findOne({
		$and: [{ friends: userId }, { friends: friendId }],
	})

module.exports = {
	addFreind,
	readFreindList,
	deleteFriend,
	freindRequest,
	rejectFriendRequest,
	isFriend,
}
