import { useState, useContext, useRef, useEffect } from "react"
import StatusMenu from "../status_menu/StatusMenu"
import { Link } from "react-router-dom"
import "./UserSection.css"
import avatar from "../../../assets/image/avatar-yellow.png"
import { UserInfoContext } from "../../../context/UserInfoContext"
import { IoSettingsSharp } from "react-icons/io5"
import { MdHeadsetMic } from "react-icons/md"
import { MdHeadsetOff } from "react-icons/md"
import { BsFillMicFill } from "react-icons/bs"
import { BsFillMicMuteFill } from "react-icons/bs"
import { Dialog } from "@mui/material"
import Menu from '@mui/material/Menu';


const UserSection = () => {
  const element = useRef()
  const [micOff, setMicOff] = useState(false)
  const [soundOff, setSoundOff] = useState(false)
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOutside =(e)=> {
    if(open && (!element.current || !element.current.contains(e.target))) setOpen(false)
  }

  useEffect(() => {
    window.addEventListener("click", handleClickOutside)
    return () => {
      window.removeEventListener("click",handleClickOutside)
    }
  }, [])
  

  const userInfo = useContext(UserInfoContext).userInfo
  return(
    <>
    <section className="my-info">
      <div className="thumnail-container">
      {userInfo.img ? 
      <img className="thumbnail" src={userInfo.img} alt={userInfo.nickname} onClick={handleOpen}/> 
      : <img className="thumbnail" src={avatar} alt="default img" onClick={handleOpen} /> }
      {/* <Menu open={open} onClick={handleClose} >
        {open &&
        <StatusMenu open={open} onClick={handleClose} ref={element}/>
        }
      </Menu> */}
      </div>
      <div className="userinfo-container">
        <p className="userinfo-nickname">{userInfo.nickname ? userInfo.nickname : userInfo.email.split("@")[0]}</p>
        <p className="userinfo-tag">#1234</p>
      </div>
      <div className="icon-container">
        {micOff ? <BsFillMicMuteFill onClick={()=>setMicOff(!micOff)}/> : <BsFillMicFill onClick={()=>setMicOff(!micOff)}/> }
        {soundOff ? <MdHeadsetOff onClick={()=>setSoundOff(!soundOff)} /> : <MdHeadsetMic onClick={()=>setSoundOff(!soundOff)}/> }
        <Link to="/user_setting">
          <IoSettingsSharp className="icon" />
        </Link>
      </div>
    </section>
  </>
  )
}

export default UserSection