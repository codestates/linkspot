  export const user = {
    "email" : "test@gmail.com",
    "nickname" : "test",
    "joinedServer" : [
      {
        "serverId" : 1,
        "serverName" : "Server1"
      },
      {
        "serverId" : 2,
        "serverName" : "Server2"
      },
      {
        "serverId" : 3,
        "serverName" : "Server3",
      },
      {
        "serverId" : 4,
        "serverName" : "Server4"
      }
    ]
  }

  export const server = [{serverName: 'server3',chattingChannel: ['일반'], voiceChannel:['일반']}, {serverName: 'server1',chattingChannel: ['일반'],voiceChannel:['일반'] }]
    //   "Server1" : {
    //       "채팅 채널" : [1,2,3,4,5,6,7,8],
    //       "음성 채널" : [1,2,3,4]
    //     },
    //   "Server2" : {
    //     "Everyone" : ["a_notice"],
    //     "CODE STATES ALUMNI" : ["Student-notice", "dinner-club", "contents-sharing"]
    //   },
    //   "Server3" : {
    //     "채팅 채널" : ["일반"],
    //     "음성 채널" : ["일반"]
    //   },
    //   "Server4" : {
    //     "채팅 채널" : ["일반"],
    //     "음성 채널" : ["일반"]
    //   }
    // }
export  const data = {
    time:
      new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
  };