import "./App.css"
import Layout from "./component/Layout/Layout.jsx"
import Main from "./component/templates/main/Main.jsx"
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import UserSetting from './component/templates/user_setting/UserSetting'
import PublicRouter from "./router/PublicRouter"
import PrivateRouter from "./router/PrivateRouter"
import LoginFrom from "./component/templates/login/LoginFrom.jsx";


function App() {
  
  return (
    <Router>
      <Switch>
        <Layout>
          <PrivateRouter path="/" component={Main} exact />
          <PublicRouter path="/login" component={LoginFrom} exact />
          <PrivateRouter path="/user_setting" component={UserSetting} exact />
        </Layout> 
      </Switch>
    </Router>
  );
}

export default App;
