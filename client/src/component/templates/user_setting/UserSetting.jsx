import React, { useState, useContext, useEffect } from 'react';
import './UserSetting.css';
import { useHistory } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import MyAccount from '../../modules/my_account/MyAccount';
import MyProfile from '../../modules/myprofile/MyProfile';
import { UserInfoContext } from '../../../context/UserInfoContext';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';

const UserSetting = ({}) => {
  const [page, setPage] = useState('/');
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const { setIsLoggedIn } = useContext(AuthContext);
  const history = useHistory();

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
      await axios
        .post(
          `${process.env.REACT_APP_SERVER_BASE_URL}/user/signout`,
          {},
          {
            withCredentials: true,
          }
        )
        .then((data) => {
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
          <div className='close' onClick={() => history.push('/')}>
            &times;
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
