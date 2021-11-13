const ws = async (io) => {
	// users.$ObjectId.userId = ObjectId
	// users.$ObjectId.socketId = socket.id
	// users.$ObjectId.state = "Online", "Idle", "Do not disturb", "Invisible"
	// users[userId].userId
	// { ${userId} : {userId: ${userId, socketId: socketId, state: "Online"}} }
	const users = {}

	io.on("connection", async (socket) => {
		const addUser = (userId, socketId, state) => {
			if (users[userId]) return users[userId]
			users[userId] = {}
			users[userId].socketId = socketId
			users[userId].userId = userId
			state ? (users[userId].state = state) : (users[userId].state = "online")
			return users[userId]
		}

		// 로그인 => 접속 상태를 업데이트 합니다.
		socket.on("online-user", async (userId) => {
			const userInfo = addUser(userId, socket.id)
			console.log(users)
			socket.broadcast.emit("broadcat:online-user", userInfo)
		})

		// 접속 => 상태를 변경 후 유저들에게 상태를 보냅니다.
		socket.on("user-state", async (userId, state) => {
			users[userId].state = state
			const userInfo = users[userId]
			socket.broadcast.emit("broadcat:user-state", userInfo)
		})
		// 로그인 => 온라인한 유저 요청 => 온라인한 유저를 client로 보냅니다. - client에서 io.on("Online users", callback) 작성바랍니다.
		socket.on("online-users", async () => {
			socket.broadcast.emit("online-users", users)
		})
		// direct message를 socketId로 보내기 요청 => DM을 client에 보냅니다. - client에서 io.on("direct message", callback) 작성바랍니다.
		socket.on("direct-message", async (userId, msg) => {
			socket.to(users[userId].socketId).emit("direct-message", socket.id, msg)
		})

		// 채널 입장
		socket.on("join-channel", async (textChannelIds) => {
			for await (const textChannelId of textChannelIds) {
				socket.join(textChannelId)
			}
		})

		// channel로 message를 보내기 요청 => 채널로 메시지를 보냅니다.
		socket.on("channel-message", async (textChannelId, senderId, text) => {
			socket.broadcast.to(textChannelId).emit("channel-message", textChannelId, senderId, text)
		})

		// 보이스 채널 들어가기
		socket.on("join-voice-channel", async (voiceChannelId, userId) => {
			socket.join(voiceChannelId)
			socket.broadcast.to(voiceChannelId).emit("join-voice-channel", voiceChannelId, users[userId])
		})

		// 보이스 채널 나가기
		socket.on("leave-voice-channel", async (voiceChannelId, userId) => {
			socket.leave(voiceChannelId)
			socket.broadcast.to(voiceChannelId).emit("leave-voice-channel", voiceChannelId, users[userId])
		})

		socket.on("disconnect", async () => {
			// for await (const textChannelId of textChannelIds) {
			// 	socket.leave(textChannelId);
			// }
			socket.broadcast.emit("offline user", users[userId])
			delete users[userId]
		})
	})
}

module.exports = ws
