import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './EmailValidation.css';
import LoadingComponent from '../../atoms/loader/Loader';
import axios from 'axios';
const EmailValidation = () => {
  const history = useHistory();
  const handleClick = async (event) => {
    const Url = history.location.pathname.split('/');
    const token = Url[Url.length - 1];
    console.log(token);
    await axios
      .post(`http://localhost:8080/user/email/${token}`)
      .then((data) => {
        history.push('/');
      });
  };
  //console.log(checked);
  return (
    <div className='email-validation-box'>
      <h3>검증완료</h3>
      <div>
        <LoadingComponent />
      </div>
      <div className='checkbox-wrapper'>
        <button
          className='checkbox-wrapper-button'
          onClick={() => handleClick()}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default EmailValidation;
