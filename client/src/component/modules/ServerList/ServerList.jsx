import { useState } from "react"
import ServerButton from "../../atoms/Button/ServerButton"
import icon from "../../../assets/image/icon_clyde_white_RGB.svg"
import "./ServerList.css"
import { ConstructionOutlined } from "@mui/icons-material"


const ServerList = ({ props }) => {

  const setIsLogin = props.setIsLogin
  const setCurrentServer= props.setCurrentServer
  const serverList = Object.keys(props.serverList)
  const locator = window.localStorage.getItem("server")

  return(
    <div className="serverlist-container">
      <ServerButton
        img={icon}
        onClick={()=>{
          setCurrentServer("Home")
          window.localStorage.setItem("server", "Home")
        }}
        className={locator === "Home" || !locator ? "Home clicked" : "Home"} >
          Home
        </ServerButton>
        {serverList.map((item)=>
        <ServerButton
          className={locator === `${item}` ? `${item} clicked` : `${item}`} 
          onClick={() => {
            setCurrentServer(`${item}`)
            window.localStorage.setItem("server", `${item}`)
          }}>
          {item}
        </ServerButton>
        )}
        <ServerButton
        onClick={()=>setIsLogin(false)}>
          clear
        </ServerButton>
    </div>
  )
}

export default ServerList