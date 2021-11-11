import React, { useState, useContext, useEffect } from 'react';
import './UserSetting.css';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme } from '@mui/material/styles';
import MyAccount from '../../modules/my_account/MyAccount';
import MyProfile from '../../modules/myprofile/MyProfile';
import { UserInfoContext } from '../../../context/UserInfoContext';
import { AuthContext } from '../../../context/AuthContext';
<<<<<<< HEAD
import { db } from '../../../utils/firebase/firebase';
import { getDoc, doc } from '@firebase/firestore';


// Main에서 설정 버튼을 누르면 연결되는 페이지

=======
import { userInfo as userInfoData } from '../../../db';
import axios from 'axios';
>>>>>>> 5488769f55721d9b597ec5ebd1ad931af7405c75
const UserSetting = ({}) => {
  const [page, setPage] = useState('/');
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const getUserinfo = async () => {
      try {
        //axios 들어가는 부분
      } catch (error) {}
    };
    getUserinfo();
  }, []);
  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: '#5765F2',
      },
    },
  });
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/user/signout').then((data) => {
        setIsLoggedIn(false);
        window.localStorage.clear();
        history.push('/');
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='usersetting-wrapper'>
      <div className='left-box'>
        <div className='side'></div>
        <div className='list'>
          <p>사용자 설정</p>

          <h3 className='subject' onClick={() => setPage('/')}>
            나의 계정
          </h3>

          <h3 className='subject' onClick={() => setPage('myprofile')}>
            나의 프로필
          </h3>

          <h4 onClick={() => handleLogout()}>로그아웃</h4>
        </div>
      </div>
      <div className='right-box'>
        <div className='right-box-1'>
          {(() => {
            switch (page) {
              case '/':
                return <MyAccount userInfo={userInfo} setPage={setPage} />;
              case 'myprofile':
                return <MyProfile userInfo={userInfo} />;
              default:
            }
          })()}
        </div>
        <div className='right-box-2'>
          <CloseIcon className='close' onClick={() => history.push('/')} />
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
