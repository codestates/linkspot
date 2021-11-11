  export const userInfo=[{
    email : "test@gmail.com",
    userName : "test",
    userNumber:'#4039',
    joinedServer : [
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
    ]
  },{
    email : "roro@homail.com",
    userName : "roro",
    userNumber: '#3421',
    joinedServer : [
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
    ]
  }]

  export const server = {"Server1" : {
          serverId: 'Server1',
          serverName:'Server1',
          channel:[{
            channelTitle: 'information',
            channel1:{
              channelName: "공유", 
              channelId:'13' } },
              {
                channelTitle: '채팅채널',
                channel1:{
                  channelName: "대화", 
                  channelId:'12' },
                  channel2:{
                    channelName: "아이디어", 
                    channelId:'63' } },
                    {
                      channelTitle: '음성채널',
                      channel1:{
                        channelName: "대화", 
                        channelId:'241' },
                        channel2:{
                          channelName: "영상", 
                          channelId:'2344' } }],
          userInfos: [
                      {userName: 'asgfs', userNumber:'#4201',email:'asgfs@gomail.com', thumbnail: 'sdfsd', profilecolor:'#222',isAdmin:true},
                      {userName: 'einfa',userNumber:'#2304',email:'einfa@tomail.com', thumbnail: 'sdfsd', profilecolor:'#222',isAdmin:false}
                    ],
                    thumbnail: '#sdfwe'
        },
        "Server2" : {
          serverId: 'Server2',
          serverName:'Server2',
          channel:[{
            channelTitle: 'information2',
            channel1:{
              channelName: "공유2", 
              channelId:'13' } },
              {
                channelTitle: '채팅채널2',
                channel1:{
                  channelName: "대화2", 
                  channelId:'12' },
                  channel2:{
                    channelName: "아이디어2", 
                    channelId:'63' } },
                    {
                      channelTitle: '음성채널2',
                      channel1:{
                        channelName: "대화2", 
                        channelId:'241' },
                        channel2:{
                          channelName: "영상2", 
                          channelId:'2344' } }],
          userInfos: [
                      {userName: 'bravo',userNumber:'#3211',email:'브라보', thumbnail: '#sasdfdfsd', profilecolor:'#222', isAdmin:true},
                      {userName: 'einfa',userNumber:'#2304',email:'einfa@tomail.com', thumbnail: 'sdfsd', profilecolor:'#222', isAdmin:false}
                    ],
                    thumbnail: '#sdfwe'
        },
        "Server3" : {
          serverId: 'Server3',
          serverName:'Server3',
          channel:[{
            channelTitle: 'information3',
            channel1:{
              channelName: "공유3", 
              channelId:'13' } },
              {
                channelTitle: '채팅채널3',
                channel1:{
                  channelName: "대화3", 
                  channelId:'12' },
                  channel2:{
                    channelName: "아이디어3", 
                    channelId:'63' } },
                    {
                      channelTitle: '음성채널3',
                      channel1:{
                        channelName: "대화3", 
                        channelId:'241' },
                        channel2:{
                          channelName: "영상3", 
                          channelId:'2344' } }],
          userInfos: [
                      {userName: 'alpa',userNumber:'#1201',email:'alpa@gomail.com', thumbnail: 'sdfsd', profilecolor:'#yellow',isAdmin:false},
                      {userName: 'einfa',userNumber:'#2304',email:'einfa@tomail.com', thumbnail: 'sdfsd', profilecolor:'#222',isAdmin:false}
                    ],
                    thumbnail: '#sdfwe'
        },
    }
    //serverId, channelId, thumnail  
    //다른 유저 정보 썸네일 닉네임, #네자리 아이디
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