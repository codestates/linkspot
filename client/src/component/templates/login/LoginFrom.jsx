import React, { useState } from 'react';
import './LoginFrom.css';
import Login from '../../modules/login/Login';
import Signup from '../../modules/signup/Signup';

const LoginFrom = ( props ) => {
  const isLogin = props.isLogin
  const setIsLogin = props.setIsLogin
  const [isSignup, setIsSignup] = useState(false);
  return (
    <div className='wrapper'>
      <div className='modal-background'></div>
      {!isSignup ? (
        <Login isSignup={isSignup} setIsSignup={setIsSignup} isLogin={isLogin} setIsLogin={setIsLogin}/>
      ) : (
        <Signup isSignup={isSignup}/>
      )}
    </div>
  );
};

export default LoginFrom;
