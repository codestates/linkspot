import "./Layout.css"
import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import Main from "../../page/Main"
import Header from "../modules/Header/Header"
import Login from "../modules/login/Login"

function Layout(props){

  const [isLogin, setIsLogin] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  
  const serverLocationHandler = () => {
    const serverLocator = window.localStorage.getItem("server")
    return serverLocator ? serverLocator : "Home"
  }
  const [currentServer, setCurrentServer] = useState(serverLocationHandler)

  const user = {
    "email" : "test@gmail.com",
    "nickname" : "test_user"
  }

  const serverList = {
      "Server1" : {
        "채팅 채널" : [1,2,3,4,5,6,7,8],
        "음성 채널" : [1,2,3,4]
      },
    "Server2" : {
      "Everyone" : ["a_notice"],
      "CODE STATES ALUMNI" : ["Student-notice", "dinner-club", "contents-sharing"]
    },
    "Server3" : {
      "채팅 채널" : ["일반"],
      "음성 채널" : ["일반"]
    },
    "Server4" : {
      "채팅 채널" : ["일반"],
      "음성 채널" : ["일반"]
    }
  }

  return (
    <div className="layout-wrap">
      <div className="layout" id="layout">
        {isLogin ? 
        <>
          <Main props={{setIsLogin,serverList,user,currentServer,setCurrentServer}}/>
        </>
        :
          <Login props={{isSignup, setIsSignup, isLogin, setIsLogin}}/>
        }
      </div>
    </div>
  )
}

export default withRouter(Layout)