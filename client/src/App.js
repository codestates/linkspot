import React, {useState} from 'react'
import "./App.css"
import Layout from "./component/Layout/Layout.jsx"
import SignIn from './page/Signin'
import Main from "./page/Main"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import UserSetting from './component/templates/user_setting/UserSetting'
import PublicRouter from "./router/PublicRouter"
import PrivateRouter from "./router/PrivateRouter"
import Login from "./component/modules/login/Login"


function App() {

  return (
    <Router>
      <Switch>
        <Layout>
          <PrivateRouter path="/" component={Main} exact />
          <PublicRouter path="/login" component={Login} exact />
        </Layout> 
      </Switch>
    </Router>
  );
}

export default App;
