import React, { useEffect, useState, useContext } from 'react';
import './UpdateModal.css';
import axios from 'axios';
import { UserInfoContext } from '../../../context/UserInfoContext';

const UpdateModal = ({ modalType, setIsModal }) => {
  const [firstMessage, setFirstMessage] = useState('');
  const [secondMessage, setSecondMessage] = useState('');
  const [isPassword, setIsPassword] = useState(false);
  const [isValidName, setIsValidName] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [checkPassword, setCheckPassword] = useState(true);
  const [passwordMessage, setPasswordMessage] = useState('비밀번호');
  const [passwordCheckMessage, setPasswordCheckMessage] = useState(
    '새 비밀번호 확인'
  );
  const email_Reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const password_Reg = /^[a-z0-9_]{8,15}$/;
  const nickname_Reg = /^[a-zA-Z]\w*$/;
  const { userInfo, setUserInfo } = useContext(UserInfoContext);

  useEffect(() => {
    if (modalType === '사용자 이름 수정') {
      setFirstMessage('새 사용자 이름과  비밀번호를 입력해주세요');
      setSecondMessage('사용자 이름');
    } else if (modalType === '이메일 수정') {
      setFirstMessage('새 이메일 주소와  비밀번호를 입력해주세요');
      setSecondMessage('이메일 주소');
    } else if (modalType === '비밀번호 수정') {
      setFirstMessage('현재 비밀번호와 새 비밀번호를 입력해주세요');
      setSecondMessage('현재 비밀번호');
      setIsPassword(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(e.target[2].value.length);
    if (modalType === '사용자 이름 수정') {
      if (
        !nickname_Reg.test(e.target[0].value) ||
        e.target[0].value.length === 0
      ) {
        setSecondMessage('사용자 이름 - 사용자 이름이 유효하지 않습니다.');
        setIsValidName(false);
        return;
      }
      await axios
        .patch(
          `${process.env.REACT_APP_SERVER_BASE_URL}/user/nick`,
          {
            nick: e.target[0].value,
            password: e.target[1].value,
          },
          { withCredentials: true }
        )
        .then((data) => {
          setUserInfo({ ...userInfo, nick: e.target[0].value });
          setIsModal(false);
        });
    } else if (modalType === '이메일 수정') {
      if (
        !email_Reg.test(e.target[0].value) ||
        e.target[0].value.length === 0
      ) {
        setSecondMessage('이메일 - 이메일이 유효하지 않습니다.');
        setIsValidName(false);
        return;
      }
      await axios
        .patch(
          `${process.env.REACT_APP_SERVER_BASE_URL}/user/email`,
          {
            email: e.target[0].value,
            password: e.target[1].value,
          },
          { withCredentials: true }
        )
        .then((data) => {
          setUserInfo({ ...userInfo, email: e.target[0].value });
          setIsModal(false);
        });
    } else if (modalType === '비밀번호 수정') {
      if (
        e.target[1].value !== e.target[2].value ||
        e.target[2].value.length === 0
      ) {
        setPasswordCheckMessage('비밀번호 - 비밀번호를 다시 확인해주세요.');
        setCheckPassword(false);
        return;
      }
      await axios
        .patch(
          `${process.env.REACT_APP_SERVER_BASE_URL}/user/password`,
          {
            currentPassword: e.target[0].value,
            changePassword: e.target[1].value,
          },
          { withCredentials: true }
        )
        .then((data) => {
          setIsModal(false);
        });
    }

    //axios로 비밀번호 확인 후 전달
    // if (
    //   !password_Reg.test(e.target[0].value) ||
    //   e.target[0].value.length === 0
    // ) {
    //   setPasswordMessage('비밀번호 - 비밀번호가 일치하지 않습니다.');
    //   setIsValidPassword(false);
    //   return;
    // }
  };
  return (
    <>
      <div className='background' onClick={() => setIsModal(false)}></div>
      <form
        className={
          isPassword ? 'user-setting-modal onpassword' : 'user-setting-modal'
        }
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className='icon' onClick={() => setIsModal(false)}>
          &times;
        </div>
        <h3>{modalType}</h3>
        <h5>{firstMessage}</h5>
        <p className={isValidName && isValidEmail ? '' : 'invalid'}>
          {secondMessage}
        </p>
        <input
          className={isValidName && isValidEmail ? '' : 'red-box'}
          type={isPassword ? 'password' : 'text'}
        />
        <p className={isValidPassword ? '' : 'invalid'}>
          {isPassword && '새'} {passwordMessage}
        </p>
        <input className={isValidPassword ? '' : 'red-box'} type='password' />
        {isPassword && (
          <>
            <p className={checkPassword ? '' : 'invalid'}>
              {passwordCheckMessage}
            </p>
            <input className={checkPassword ? '' : 'red-box'} type='password' />
          </>
        )}
        <div className='bottom'>
          <p onClick={() => setIsModal(false)}>취소</p>
          <button type='submit'>수정</button>
        </div>
      </form>
    </>
  );
};

export default UpdateModal;
