import React, { useState } from 'react';
import './LoginFrom.css';
import Login from '../../modules/login/Login';
import Signup from '../../modules/signup/Signup';
import EmailValidation from '../../modules/email_vaildation/EmailValidation';


// layout에서 로그인이 안 되어 있을시 이동되는 페이지

const LoginFrom = () => {
  const [isSignup, setIsSignup] = useState(false);
  return (
    <div className='wrapper'>
      <div className='modal-background'></div>
      {!isSignup ? (
        <Login isSignup={isSignup} setIsSignup={setIsSignup} />
      ) : (
        //<EmailValidation />
        <Signup isSignup={isSignup} setIsSignup={setIsSignup} />
      )}
    </div>
  );
};

export default LoginFrom;
