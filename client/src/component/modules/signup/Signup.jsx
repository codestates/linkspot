import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import './Signup.css';
import Dropdown from '../../atoms/dropdown/Dropdown';
import { UserInfoContext } from '../../../context/UserInfoContext';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from '@firebase/auth';
import { auth, db } from '../../../utils/firebase/firebase';
import { AuthContext } from '../../../context/AuthContext';
import { collection, doc, setDoc } from '@firebase/firestore';
const Signup = ({ isSignup, setIsSignup }) => {
  const [years, setYears] = useState([]);
  const [year, setYear] = useState('');
  const [months, setMonths] = useState([]);
  const [month, setMonth] = useState('');
  const [days, setDays] = useState([]);
  const [day, setDay] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidNickname, setIsValidNickname] = useState(true);
  const [isValidDob, setIsValidDob] = useState(true);
  const [emailMessage, setEmailMessage] = useState('이메일');
  const [passwordMessage, setPasswordMessage] = useState('비밀번호');
  const [nicknameMessage, setNicknameMessage] = useState('이름');
  const [dobMessage, setDobMessage] = useState('생년월일');
  const [user, setUser] = useState({});
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const history = useHistory();
  const email_Reg =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const password_Reg = /^[a-z0-9_]{8,15}$/;
  const nickname_Reg = /^[a-zA-Z]\w*$/;

  const userInfoRef = collection(db, 'userinfo');
  useEffect(() => {
    let tempYear = [];
    let tempMonth = [];
    let tempDay = [];
    var date = new Date(`${year}`, `${month}`, 0);
    const endDate = date.getDate(); //마지막 날짜
    for (let i = 1900; i <= 2018; i++) {
      tempYear.push('' + i);
    }
    for (let i = 1; i <= 12; i++) {
      tempMonth.push('' + i);
    }
    for (let i = 1; i <= endDate; i++) {
      tempDay.push('' + i);
    }
    setYears(tempYear);
    setMonths(tempMonth);
    setDays(tempDay);
  }, [month]);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const isSubmit = async (e) => {
    e.preventDefault();
    if (!email_Reg.test(e.target[0].value) || e.target[0].value.length === 0) {
      setIsValidEmail(false);
      setEmailMessage('이메일 - 이메일이 유효하지 않습니다.');
      return;
    } else {
      setIsValidEmail(true);
      setEmailMessage('이메일');
    }

    if (
      !nickname_Reg.test(e.target[1].value) ||
      e.target[1].value.length === 0
    ) {
      setIsValidNickname(false);
      setNicknameMessage(
        '이름 - 이름이 유효하지 않습니다. (특수문자를 사용할 수 없습니다.)'
      );
      return;
    } else {
      setIsValidNickname(true);
      setNicknameMessage('이름');
    }

    if (
      !password_Reg.test(e.target[2].value) ||
      e.target[2].value.length === 0
    ) {
      setIsValidPassword(false);
      setPasswordMessage(
        '비밀번호 - 비밀번호가 유효하지 않습니다.(대문자, 특수문자 제외 8~15자)'
      );
      return;
    } else {
      setIsValidPassword(true);
      setPasswordMessage('비밀번호');
    }
    if (
      e.target[3].value.length === 0 ||
      e.target[5].value.length === 0 ||
      e.target[7].value.length === 0
    ) {
      setIsValidDob(false);
      setDobMessage('생년월일 - 생년월일을 입력해주세요.');
      return;
    } else {
      setIsValidDob(true);
      setDobMessage('생년월일');
    }
    //console.log(e);
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        e.target[0].value,
        e.target[2].value
      );
      await setDoc(doc(userInfoRef, e.target[0].value), {
        email: e.target[0].value,
        profilecolor: '#3da45c',
        profileimg: '',
        dateOfBirth: `${e.target[3].value}/${e.target[5].value}/${e.target[7].value}`,
      });
      setUserInfo({ ...userInfo, email: e.target[0].value });
      setIsLoggedIn(true);
      history.push('/');
    } catch (error) {
      setIsValidEmail(false);
      setEmailMessage('이메일 - 이미 존재하는 이메일입니다.');
      console.log(error.message);
    }
    //axios redirect
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#5765F2',
      },
    },
  });

  const handleBackword = (e) => {
    e.preventDefault();
    setIsSignup(false);
    //history.push('/');
  };
  return (
    <div className='signup-box'>
      <form className='signup-main' onSubmit={(e) => isSubmit(e)}>
        <div>
          <h3>회원가입</h3>
        </div>
        <p className={isValidEmail ? '' : 'invalid'}>{emailMessage}</p>
        <input className={isValidEmail ? '' : 'red-box'} />
        <p className={isValidNickname ? '' : 'invalid'}>{nicknameMessage}</p>
        <input className={isValidNickname ? '' : 'red-box'} />
        <p className={isValidPassword ? '' : 'invalid'}>{passwordMessage}</p>
        <input type='password' className={isValidPassword ? '' : 'red-box'} />
        <p className={isValidDob ? '' : 'invalid'}>{dobMessage}</p>
        <div className={isValidDob ? 'date-of-birth' : 'date-of-birth red-box'}>
          <Dropdown
            val='년도'
            elements={years}
            element={year}
            setElement={setYear}
          />
          <Dropdown
            val='월'
            elements={months}
            element={month}
            setElement={setMonth}
          />
          <Dropdown
            val='일'
            elements={days}
            element={day}
            setElement={setDay}
          />
        </div>
        <ThemeProvider theme={theme}>
          <Button
            color='primary'
            variant='contained'
            type='submit'
            sx={{ mt: 2, width: 446.7 }}
          >
            계속
          </Button>
        </ThemeProvider>
        <p className='blue' onClick={handleBackword}>
          이미 아이디가 있으신가요?
        </p>
      </form>
    </div>
  );
};

export default Signup;