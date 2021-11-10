import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRouter = ({ component: Component, ...rest }) => {
  // 로그인 여부 검사하지 않음
  const currentUser = { login: false };
  return (
    <Route
      {...rest}
      render={(props) =>
        // 로그인 후 접근할 수 없는 곳으로 접근 시 메인 페이지로 리다이렉션 시키고
        // 그 외에는 이동하고자 하는 페이지로 이동
        currentUser.login ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRouter;
