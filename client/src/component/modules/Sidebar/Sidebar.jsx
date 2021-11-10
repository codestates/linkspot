import "./Sidebar.css"
import { useContext } from "react" 
import { FaUserFriends } from "react-icons/fa"
import { UserInfoContext } from "../../../context/UserInfoContext"
import avatar from "../../../assets/image/avatar-yellow.png"
import UserSection from "../user_section/UserSection"

const Sidebar = () => {

  // 사이드바에서 다루는 정보
  // 1. 현재 서버의 채널 목록
  // 2. 현재 서버에 가입되어 있는 유저 목록
  // 3. 나의 DM 내역, 친구 목록, 친구 요청, 블락 목록
  // 3. 내 계정 정보 수정, 마이크, 헤드셋 컨트롤
  // 4. 나의 현재 상태

  const serverLocator = useContext(UserInfoContext).serverLocator
  const userInfo = useContext(UserInfoContext).userInfo

  // const serverInfo = props.currentServerInfo.info
  // const user = props.user
  // const currentChannel = props.currentChannel
  // const setCurrentChannel = props.setCurrentChannel

  // useEffect(()=>{
  //   if(window.localStorage.getItem("serverLocator") !== "Home" || !window.localStorage.getItem(`${serverName}`))
  //   window.localStorage.setItem(
  //     `${serverName}`, 
  //     JSON.stringify({"group" : Object.keys(serverInfo)[0],"channel" : Object.values(serverInfo)[0][0]}
  //     ))
  // },[])

  // if(
  //   !window.localStorage.getItem(`${serverName}`) && window.localStorage.getItem("server") && serverName !== "Home"){
  //   window.localStorage.setItem(
  //     `${serverName}`, 
  //     JSON.stringify({"group" : Object.keys(serverInfo)[0],"channel" : Object.values(serverInfo)[0][0]}
  //     ))
  // }

  return (
    <div className="sidebar-container">
      {/* 현재 입장한 서버가 홈이거나 입장 정보가 없을 경우 */}
      { serverLocator === "Home"  || !serverLocator ?
      <>
      {/* 홈 화면 렌더링 */}
        <div className="sidebar-search">
        <button type="button" className="sidebar-button">
          대화 찾기 또는 시작하기
        </button>
      </div>
      <div className="friend-button">
        <div>
          <FaUserFriends size="24px"/>
        </div>
        <p>친구</p>
      </div>
      <div className="message-container">
        <div className="message-header">
          <p>개인메세지</p>
        </div>
        {/* DM 컨테이너 */}
          <div className="card-container">
            {userInfo.friend ?
            <>
              <img src={avatar} alt="default img" />
              <div className="card-info">
                nickname
              </div>
            </>
            :
            // DM 히스토리가 없을 시 아무것도 랜더링 하지 않음
            null
            }
          </div>
      </div>
    </>
    :
    <>
    {/* 홈 이외의 서버에 접속했을 경우 서버 이름 출력 및 서버 나가기 버튼 제공(미구현) */}
      <div className="sidebar-server-name">
        {serverLocator}
      </div>
      {/* <div className="sidebar-group-container">
        {Object.keys(serverInfo).map((item)=>
        <div className="channel-group">
          <p>{item}</p>
          {Object.values(serverInfo[item]).map((sub)=>
            <div 
            className={`channel ${item}-${sub}`}
            onClick={()=>{
              setCurrentChannel(sub)
              window.localStorage.setItem(
                `${serverName}`, 
                JSON.stringify({"group" : item,"channel" :sub}
                ))
            }}
            >{sub}</div>
          )}
        </div>
        )}
      </div> */}
    </>
    }
    {/* 현재 로그인 한 계정 정보 */}
      <UserSection />
    </div>
  )
}

export default Sidebar