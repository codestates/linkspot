<<<<<<< HEAD
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

  //유저섹션에서 다루는 정보
  // 1. 유저 정보

  const [micOff, setMicOff] = useState(false)
  const [soundOff, setSoundOff] = useState(false)
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose =()=>{
    setOpen(false)
  }

  const userInfo = useContext(UserInfoContext).userInfo


  return(
    <>
    {open && <StatusMenu open={open} onClose={handleClose}/> }
    <section className="my-info">
      <div className="thumnail-container">
        {/* 유저 정보에 썸네일이 없을 경우 기본 아바타를, 있을 경우 썸네일 랜더링 */}
      {userInfo.thumbnail ? 
      <img className="thumbnail" src={userInfo.thumbnail} alt={userInfo.nickname} onClick={handleOpen}/> 
      : <img className="thumbnail" src={avatar} alt="default img" onClick={handleOpen} /> }
      {/* <Menu open={open} onClick={handleClose} >
        {open &&
        <StatusMenu open={open} onClick={handleClose} ref={element}/>
        }
      </Menu> */}
      </div>
      <div className="userinfo-container">
        {/* 유저 정보에 닉네임이 존재할 경우 닉네임을, 없을 경우 이메일에서 @ 앞부분을 랜더링 */}
        <p className="userinfo-nickname">{userInfo.username}</p>
        <p className="userinfo-tag">#{userInfo.userNumber}</p>
      </div>
      <div className="icon-container">
        {/* 마이크 및 헤드셋 컨트롤 버튼 */}
        {micOff ? <BsFillMicMuteFill onClick={()=>setMicOff(!micOff)}/> : <BsFillMicFill onClick={()=>setMicOff(!micOff)}/> }
        {soundOff ? <MdHeadsetOff onClick={()=>setSoundOff(!soundOff)} /> : <MdHeadsetMic onClick={()=>setSoundOff(!soundOff)}/> }
        {/* 개인정보 수정 버튼 */}
        <Link to="/user_setting">
          <IoSettingsSharp className="icon" />
        </Link>
      </div>
    </section>
  </>
  )
}
=======
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './UserSection.css';
import avatar from '../../../assets/image/avatar-yellow.png';
import { UserInfoContext } from '../../../context/UserInfoContext';
import { IoSettingsSharp } from 'react-icons/io5';

const UserSection = () => {
  const userInfo = useContext(UserInfoContext).userInfo;
  return (
    <>
      <section className='my-info'>
        {userInfo.profilePicture ? (
          <img src={userInfo.profilePicture} alt={userInfo.username} />
        ) : (
          <img src={avatar} alt='default img' />
        )}
        <div className='userinfo-container'>
          <p className='userinfo-nickname'>
            {userInfo.username
              ? userInfo.username
              : userInfo.email.split('@')[0]}
          </p>
          <p className='userinfo-tag'>#1234</p>
        </div>
        <div className='icon-container'>
          <Link to='/user_setting'>
            <IoSettingsSharp className='icon' />
          </Link>
        </div>
      </section>
    </>
  );
};
>>>>>>> 5488769f55721d9b597ec5ebd1ad931af7405c75

export default UserSection;
