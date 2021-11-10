import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
// import { useSelector } from "react-redux";

const PrivateRouter = ({ component: Component, ...rest }) => {
  // 현재 접속한 유저의 로그인 상태 확인
  const currentUser = useContext(AuthContext).isLoggedIn
  return (
    <Route
      {...rest}
      render={(props) => {
        // 로그인이 되어있지 않은 상태라면 경고창 출력
        !currentUser && alert("로그인이 필요한 페이지입니다.");
        return currentUser ? (
          // 로그인이 되어있다면 이동하고자 하는 페이지로, 아니라면 로그인 페이지로 리다이렉트
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default PrivateRouter;
