import { useContext, useEffect } from 'react'
import axios from "axios"
import ServerList from '../../modules/ServerList/ServerList'
import SectionContainer from "../../modules/SectionContainer/SectionContainer"
import { UserInfoContext } from '../../../context/UserInfoContext'

// layout에서 유저 로그인에 성공했을 시 랜더링 되는 페이지

const Main = () => {


  const setServer = useContext(UserInfoContext).setServer
  const setUserInfo = useContext(UserInfoContext).setUserInfo

//   {userInfo: {…}, servers: Array(0)}
// servers: []
// userInfo:
// createdAt: "2021-11-11T07:58:46.120Z"
// directList: []
// email: "test2@test.com"
// friendRequests: []
// serverIds: []
// updatedAt: "2021-11-11T09:02:20.485Z"
// userNumber: 4135
// username: "test2"
// verified: false
// __v: 0
// _id: "618ccd3607111d05681b6c19"


  // 최초 로그인 시 사용자 정보 요청 후 저장
  useEffect(()=>{
    axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/user/signin`,{
      "email": "test2@test.com",
      "password": "test9999"
    }, {
      withCredentials : true
    })
    .then((response)=>{
      const token = response.headers
      console.log(token)  
      // 가입한 서버 목록
      setServer(response.data.data.servers)
      // 유저 정보
      setUserInfo({
        // 닉네임을 설정했다면 닉네임, 아니라면 이메일 @ 앞 글자
        "username" : (response.data.data.userInfo.username 
          ? response.data.data.userInfo.username 
          : response.data.data.userInfo.email.split("@")[0]) ,
        // 4자리수 유저 고유번호
        "userNumber" : response.data.data.userInfo.userNumber,
        // 썸네일 설정을 했다면 썸네일 사진, 아니라면 기본 이미지
        "userThumbnail" : (response.data.data.userInfo.thumbnail 
          ? response.data.data.userInfo.thumbnail 
          : response.data.data.userInfo.username
          )
        })
      })
    .catch((error)=> console.log(error))
  },[])

  return (
    <>
      <ServerList />
      <SectionContainer/>
    </>
  )
}

export default Main