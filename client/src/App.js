import React, {useState} from 'react'
import Login from './component/templates/login/LoginFrom.jsx'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import UserSetting from './component/templates/user_setting/UserSetting'

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/user_setting" component={UserSetting} />
      </Switch>
    </Router>
  );
}

export default App;
