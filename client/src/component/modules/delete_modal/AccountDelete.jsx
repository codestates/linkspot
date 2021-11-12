import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './AccountDelete.css';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from '../../../context/AuthContext';

const AccountDelete = ({ setIsModal }) => {
  let history = useHistory();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    //axios 패스워드 확인 맞으면 리다이렉트
    e.preventDefault();
    const password = e.target[0].value;
    setIsLoggedIn(false);
    window.localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <div className='background' onClick={() => setIsModal(false)}></div>
      <form className='delete-modal' onSubmit={(e) => handleSubmit(e)}>
        <CloseIcon className='icon' onClick={() => setIsModal(false)} />
        <h3>계정삭제</h3>
        <div className='yellow-box'>
          <h5>
            정말로 계정을 삭제하시겠습니까? 즉시 로그아웃된 이후 다시 로그인 할
            수 없습니다.
          </h5>
        </div>
        <p>비밀번호</p>
        <input type='password' />
        <div className='bottom'>
          <p onClick={() => setIsModal(false)}>취소</p>
          <button type='submit'>삭제</button>
        </div>
      </form>
    </>
  );
};

export default AccountDelete;
