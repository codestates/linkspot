import Header from "../Header/Header"
import Sidebar from "../Sidebar/Sidebar"
import "./SectionContainer.css"
import { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"


const SectionContainer = () => {

  // const userInfo = {
  //   email : props.user.email,
  //   nickname:props.user.nickname
  // }
  // const currentServer = props.currentServer
  // const user = props.user
  // const serverList = props.serverList
  // const currentServerInfo = {
  //   "name" : currentServer,
  //   "info" : serverList[currentServer]
  // }

  // const [currentChannel, setCurrentChannel] = useState("")

//   useEffect(()=>{
//     if(window.localStorage.getItem(`${currentServer}`)){
//     setCurrentChannel(JSON.parse(window.localStorage.getItem(`${currentServer}`)).channel)
//   } else {
//     setCurrentChannel("")
//   }
// },[window.localStorage.getItem(`${currentServer}`)])

  return(
    <div className="section-wrap">
      <Sidebar/>
      <div className="section-container">
        <Header/>
      </div>
    </div>
  )
}

export default SectionContainer