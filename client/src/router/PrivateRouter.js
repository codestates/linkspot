import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
// import { useSelector } from "react-redux";

const PrivateRouter = ({ component: Component, ...rest }) => {
  console.log({ component: Component, ...rest })
  const currentUser = useContext(AuthContext).isLoggedIn
  console.log(currentUser)
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log(props)
        !currentUser && alert("로그인이 필요한 페이지입니다.");
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default PrivateRouter;
