import { useContext, useState, useEffect } from "react"
import ServerButton from "../../atoms/button/ServerButton"
import ServerAddButton from "../../atoms/button/ServerAddButton"
import icon from "../../../assets/image/icon_clyde_white_RGB.svg"
import "./ServerList.css"
import { UserInfoContext } from "../../../context/UserInfoContext"
import { Dialog } from "@mui/material"
import ServerHandler from "../server_handler/ServerHandler"
import { db } from "../../../utils/firebase/firebase"


// Main 컴포넌트에서 유저가 가입된 서버들을 담아두는 컴포넌트

const ServerList = () => {

  // ServerList에서 다루는 데이터
  // 1. 유저가 가입한 서버 정보 (const server)
  // 2. 현재 유저가 접속중인 서버 표시정보 (serverLocator, setServerLocator)

  // 유저가 가입한 서버 목록
  const server = useContext(UserInfoContext).server 
  // 현재 접속한 서버
  const serverLocator = useContext(UserInfoContext).serverLocator
  // 서버 이동 시 현재 접속한 서버 정보 변경
  const setServerLocator = useContext(UserInfoContext).setServerLocator
  // 모달창 토글 스위치
  const [open, setOpen] = useState(false);
  // 서버 버튼 토글 스위치
  const [clicked, setClicked] = useState("")


  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  return(
    <div className="serverlist-container">

        {/* 홈 버튼 */}
        <ServerButton
        img={icon}
        onClick={()=>{
          setClicked("Home")
          window.localStorage.setItem("serverLocator", "Home")
          setServerLocator("Home")
        }}
        className={serverLocator === "Home" || !serverLocator ? "Home clicked" : "Home"} >
          Home
        </ServerButton>

        {/* 유저가 가입한 서버 버튼들 */}
        { server.length !== 0 ? 
        (server.map((item)=>
          <ServerButton
            className={item.id === clicked ? `${item.serverName} clicked` : item.serverName} 
            onClick={() => {
              setClicked(item.id)
              window.localStorage.setItem("serverLocator", `${item.serverName}`)
              setServerLocator(item.serverName)
            }}>
            {item.serverName}
          </ServerButton>
        )) : 
        // 가입한 곳이 없을 땐 아무것도 랜더링 하지 않음
        null }

        {/* 서버 추가 버튼 */}
        <ServerAddButton onClick={handleOpen}/>
        {/* 서버 추가 버튼을 눌렀을 시 서버 추가 모달창 팝업 */}
        <Dialog open={open} onClose={handleClose}>
          <ServerHandler/>
          <button onClick={handleClose}>닫기</button>
        </Dialog>
    </div>
  )
}

export default ServerList