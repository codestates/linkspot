import React, { useState, useContext } from 'react';
import './Login.css';
import { useHistory } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { UserInfoContext } from '../../../context/UserInfoContext';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';

const Login = ({ isSignup, setIsSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [emailMessage, setEmailMessage] = useState('이메일');
  const history = useHistory();
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const { server, setServer } = useContext(UserInfoContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const email_Reg =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const password_Reg = /^[a-z0-9_]{8,15}$/;

  const isSubmit = async (e) => {
    e.preventDefault();
    if (!email_Reg.test(email) || email.length === 0) {
      setIsValidEmail(false);
      setIsValidPassword(false);
      setEmailMessage('이메일 - 이메일 또는 비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!password_Reg.test(password) || password.length === 0) {
      setIsValidEmail(false);
      setIsValidPassword(false);
      return;
    }

    try {
      await axios
        .post(
          `${process.env.REACT_APP_SERVER_BASE_URL}/user/signin`,
          // "http://localhost:8080/user/signin",
          {
            email: email,
            password: password,
          },
          {
            withCredentials: true,
          }
        )
        .then((data) => {
          const target = data.data;
          setIsLoggedIn(true);
          setServer(target.servers);
          setUserInfo(target.userInfo);
          history.push('/');
        });
    } catch (error) {
      setIsValidEmail(false);
      setIsValidPassword(false);
      setEmailMessage('이메일 - 이메일 또는 비밀번호가 일치하지 않습니다.');
      console.log(error);
      throw error;
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: '#5765F2',
      },
    },
  });
  const handleForgotPassword = async () => {
    if (email.length === 0 || !email_Reg.test(email)) {
      setIsValidEmail(false);
      setEmailMessage('이메일 - 이메일을 정확히 입력해주세요!');
    } else {
      try {
      } catch (error) {
        setIsValidEmail(false);
        setEmailMessage('이메일 - 이메일을 정확히 입력해주세요!');
        //console.log(error);
        throw error;
      }

      //axios
    }
  };

  return (
    <div className='modal'>
      <form className='main' onSubmit={(e) => isSubmit(e)}>
        <div>
          <h3>환영합니다.</h3>
          <h4>다시 만나길 바랍니다.</h4>
        </div>
        <p className={isValidEmail ? '' : 'invalid'}>{emailMessage}</p>
        <input
          className={isValidEmail && isValidPassword ? '' : 'red-box'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {isValidPassword ? (
          <p>비밀번호</p>
        ) : (
          <p className='invalid'>
            비밀번호 - 이메일 또는 비밀번호가 일치하지 않습니다.
          </p>
        )}

        <input
          className={isValidPassword ? '' : 'red-box'}
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className='blue' onClick={handleForgotPassword}>
          비밀번호를 잊어버리셨나요?
        </p>
        <ThemeProvider theme={theme}>
          <Button
            color='primary'
            variant='contained'
            type='submit'
            sx={{ mt: 5, width: 446.7 }}
          >
            로그인
          </Button>
        </ThemeProvider>
        <p className='signup-link' onClick={() => setIsSignup(true)}>
          회원가입이 필요하신가요? <strong>회원가입</strong>
        </p>
      </form>
    </div>
  );
};

export default Login;
