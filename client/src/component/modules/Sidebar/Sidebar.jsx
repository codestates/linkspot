import "./Sidebar.css"
import { useContext, useEffect, useState } from "react" 
import { FaUserFriends } from "react-icons/fa"
import { AiOutlineSetting } from "react-icons/ai"
import { Link, Route } from "react-router-dom"
import avatar from "../../../assets/image/avatar-yellow.png"
import { UserInfoContext } from "../../../context/UserInfoContext"
import { AuthContext } from "../../../context/AuthContext"

const Sidebar = () => {

  const serverLocator = useContext(UserInfoContext).serverLocator
  const setServerLocator = useContext(UserInfoContext).setServerLocator
  const userInfo = useContext(UserInfoContext).userInfo

  console.log(serverLocator)

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
      { serverLocator === "Home"  || !serverLocator ?
      <>
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
          <div className="card-container">
            {userInfo.friend ?
            <>
              <img src={avatar} alt="default img" />
              <div className="card-info">
                nickname
              </div>
            </>
            :
            null
            }
          </div>
      </div>
    </>
    :
    <>
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
      <section className="my-info">
        {userInfo.img ? 
        <img src={userInfo.img} alt={userInfo.nickname} /> 
        : <img src={avatar} alt="default img"/> }
        <div className="userinfo-container">
          <p className="userinfo-nickname">{userInfo.nickname ? userInfo.nickname : userInfo.email.split("@")[0]}</p>
          <p className="userinfo-tag">#1234</p>
        </div>
        <div className="icon-container">
        </div>
      </section>
    </div>
  )
}

export default Sidebar