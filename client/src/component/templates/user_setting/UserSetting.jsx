import React from 'react';
import './UserSetting.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MyAccount from '../../modules/my_account/MyAccount';

const UserSetting = () => {
  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: '#5765F2',
      },
    },
  });

  console.log(theme);
  return (
    <div className='usersetting-wrapper'>
      <div className='left-box'>
        <div className='side'></div>
        <div className='list'>
          <p>사용자 설정</p>
          <Link style={{ textDecoration: 'none' }} to='/user_setting'>
            <h3 className='subject'>나의 계정</h3>
          </Link>
          <h3 className='subject'>나의 프로필</h3>
          <h4>로그아웃</h4>
        </div>
      </div>
      <div className='right-box'>
        <div className='right-box-1'>
          <Router>
            <Switch>
              <Route exact path='/user_setting/' component={MyAccount} />
              <Route exact path='/user_setting/user_profile' />
            </Switch>
          </Router>
        </div>
        <div className='right-box-2'>
          <CloseIcon className='close' />
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
