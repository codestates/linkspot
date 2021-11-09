import React, { useState } from 'react';
import './LoginFrom.css';
import Login from '../../modules/login/Login';
import Signup from '../../modules/signup/Signup';
import EmailValidation from '../../modules/email_vaildation/EmailValidation';

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
