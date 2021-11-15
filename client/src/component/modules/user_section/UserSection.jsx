import { useState, useContext } from 'react';
import StatusMenu from '../status_menu/StatusMenu';
import { Link } from 'react-router-dom';
import './UserSection.css';
import linkspot from '../../../assets/image/linkspot.svg';
import headphone_on from '../../../assets/image/headphone_on.svg';
import headphone_off from '../../../assets/image/headphone_off.svg';
import micoff from '../../../assets/image/micoff.svg';
import micon from '../../../assets/image/micon.svg';
import setting from '../../../assets/image/setting.svg';
import { UserInfoContext } from '../../../context/UserInfoContext';

const UserSection = () => {
  //유저섹션에서 다루는 정보
  // 1. 유저 정보

  const userInfo = useContext(UserInfoContext).userInfo;
  const [micOff, setMicOff] = useState(false);
  const [soundOff, setSoundOff] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open && <StatusMenu open={open} onClose={handleClose} />}
      <section className='my-info'>
        <div className='thumnail-container'>
          {/* 유저 정보에 썸네일이 없을 경우 기본 아바타를, 있을 경우 썸네일 랜더링 */}
          {userInfo.thumbnail ? (
            <img
              className='thumbnail'
              src={userInfo.thumbnail}
              alt={userInfo.nickname}
              onClick={handleOpen}
            />
          ) : (
            <img
              className='thumbnail'
              src={linkspot}
              alt='default img'
              onClick={handleOpen}
            />
          )}
          {/* <Menu open={open} onClick={handleClose} >
        {open &&
        <StatusMenu open={open} onClick={handleClose} ref={element}/>
        }
      </Menu> */}
        </div>
        <div className='userinfo-container'>
          {/* 유저 정보에 닉네임이 존재할 경우 닉네임을, 없을 경우 이메일에서 @ 앞부분을 랜더링 */}
          <p className='userinfo-nickname'>{userInfo.username}</p>
          <p className='userinfo-tag'>#{userInfo.userNumber}</p>
        </div>
        <div className='icon-container'>
          {/* 마이크 및 헤드셋 컨트롤 버튼 */}
          {micOff ? (
            <img
              className='set-icons'
              src={micoff}
              alt="mic off"
              onClick={() => setMicOff(!micOff)}
            />
          ) : (
            <img
              className='set-icons'
              src={micon}
              alt="mic on"
              onClick={() => setMicOff(!micOff)}
            />
          )}
          {soundOff ? (
            <img
              className='set-icons'
              alt="sound off"
              src={headphone_off}
              onClick={() => setSoundOff(!soundOff)}
            />
          ) : (
            <img
              className='set-icons'
              alt="sound on"
              src={headphone_on}
              onClick={() => setSoundOff(!soundOff)}
            />
          )}
          {/* 개인정보 수정 버튼 */}
          <Link to='/user_setting'>
            <img src={setting} alt="setting" className='set-icons setting' />
          </Link>
        </div>
      </section>
    </>
  );
};

export default UserSection;
