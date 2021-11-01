import React from 'react';
import './UserSettingModal.css';
import CloseIcon from '@mui/icons-material/Close';
const UserSettingModal = ({ modalType, setIsModal }) => {
  return (
    <>
      <div className='background' onClick={() => setIsModal(false)}></div>
      <div className='user-setting-modal'>
        <CloseIcon className='icon' />
        <h3>{modalType}</h3>
        <p>사용자 이름</p>
        <input type='text' />
        <p>비밀번호</p>
        <input type='text' />
        <div className='bottom'>
          <p>취소</p>
          <button>수정</button>
        </div>
      </div>
    </>
  );
};

export default UserSettingModal;
