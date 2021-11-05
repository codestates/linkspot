import React, {useContext, useState} from 'react'
import Login from './component/templates/login/LoginFrom.jsx'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import UserSetting from './component/templates/user_setting/UserSetting'
import {UserInfoContext} from './context/UserInfoContext'
import {AuthContext} from './context/AuthContext'

function App() {
  const { userInfo, setUserInfo } = useContext(UserInfoContext)
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
  return (
    
    <Router>
      <Switch>
        {isLoggedIn?<Route exact path="/user_setting" render={()=><UserSetting isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />:<Route exact path="/" render={()=><Login />} />}
        
        
      </Switch>
    </Router>
    
  );
}

export default App;
