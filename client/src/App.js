import "./App.css"
import Layout from "./component/Layout/Layout.jsx"
import Main from "./page/Main"
import Login from './component/templates/login/LoginFrom.jsx'
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

//   {isLoggedIn?
//   <Route exact path="/user_setting" render={()=><UserSetting isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
//   :
//   <Route exact path="/" render={()=><Login />} />
// }

  return (
    <Router>
      <Switch>
        <Layout>
          <PrivateRouter path="/" component={Main} exact />
          <PublicRouter path="/login" component={Login} exact />
          <PrivateRouter path="/user_setting" component={UserSetting} exact />
        </Layout> 
      </Switch>
    </Router>
  );
}

export default App;
