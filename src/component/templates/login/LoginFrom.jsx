import React, { useState } from 'react';
import './LoginFrom.css';
import Login from '../../modules/login/Login';
import Signup from '../../modules/signup/Signup';

const LoginFrom = () => {
  const [isSignup, setIsSignup] = useState(false);
  return (
    <div className='wrapper'>
      <div className='modal-background'></div>
      {!isSignup ? (
        <Login isSignup={isSignup} setIsSignup={setIsSignup} />
      ) : (
        <Signup isSignup={isSignup} setIsSignup={setIsSignup} />
      )}
    </div>
  );
};

export default LoginFrom;
