import React, { createContext, useState, useEffect } from 'react';

export const UserInfoContext = createContext();

const UserContextProvider = (props) => {
  const [userInfo, setUserInfo] = useState(
    () => JSON.parse(window.localStorage.getItem('userInfo')) || {}
  );

  useEffect(() => {
    window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }, [userInfo]);

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {props.children}
    </UserInfoContext.Provider>
  );
};

export default UserContextProvider;
