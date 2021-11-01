import React, { useState } from 'react';
import './MyAccount.css';
import { FaDiscord } from 'react-icons/fa';
import UserSettingModal from '../user_setting_modal/UserSettingModal';
import { Password } from '@mui/icons-material';

const MyAccount = () => {
  const [isModal, setIsModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const handleClick = (type) => {
    setModalType(type);
    setIsModal(true);
    console.log(type);
  };
  return (
    <div className='myaccount'>
      {isModal ? (
        <UserSettingModal modalType={modalType} setIsModal={setIsModal} />
      ) : null}
      <h3>My Account</h3>
      <div className='box'>
        <div className='top'>
          <div className='profile-round'>
            <FaDiscord className='icon' />
            <div className='small'></div>
          </div>
        </div>
        <div className='bottom'>
          <div className='bottom-upper'>
            <h4>디스코더 전원재</h4>
            <button>프로필 수정</button>
          </div>

          <div className='bottom-lower'>
            <div className='bottom-lower-inner'>
              <div>
                <h6>사용자 설정</h6>
                <h5>디스코더 전원재</h5>
              </div>
              {/* '사용자 이름 수정' */}
              <button onClick={(e) => handleClick('사용자 이름 수정')}>
                수정
              </button>
            </div>
            <div className='bottom-lower-inner'>
              <div>
                <h6>이메일</h6>
                <h5>이메일</h5>
              </div>
              <button onClick={() => handleClick('이메일 수정')}>수정</button>
            </div>
          </div>
        </div>
      </div>
      <div className='myaccount-box-lower'>
        <h3>비밀번호</h3>
        <button onClick={() => handleClick('비밀번호 수정')}>
          비밀번호 변경
        </button>
      </div>
      <div className='myaccount-box-lower'>
        <h3>계정삭제</h3>
        <button className='account-delete'>계정삭제</button>
      </div>
    </div>
  );
};

export default MyAccount;
