import React, { useState, useContext, useEffect } from 'react';
import './UserSetting.css';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme } from '@mui/material/styles';
import MyAccount from '../../modules/my_account/MyAccount';
import MyProfile from '../../modules/myprofile/MyProfile';
import { signOut } from '@firebase/auth';
import { auth } from '../../../utils/firebase/firebase';
import { UserInfoContext } from '../../../context/UserInfoContext';
import { AuthContext } from '../../../context/AuthContext';
import { db } from '../../../utils/firebase/firebase';
import { getDoc, doc } from '@firebase/firestore';

const UserSetting = ({}) => {
  const [page, setPage] = useState('/');
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const history = useHistory();
  const docRef = doc(db, 'userinfo', userInfo.email);

  useEffect(() => {
    const getUserinfo = async () => {
      try {
        const docSnap = await getDoc(docRef);
        //console.log(docSnap.data(), userInfo.email);
        setUserInfo(docSnap.data());
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
      const logout = await signOut(auth);
      setIsLoggedIn(false);
      history.push('/');
    } catch (error) {}
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

          <h4 onClick={handleLogout}>로그아웃</h4>
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
          <CloseIcon className='close' />
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
