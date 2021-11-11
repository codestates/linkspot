import React, { createContext, useState, useEffect } from 'react';
import { db } from '../utils/firebase/firebase';

export const UserInfoContext = createContext();

const UserInfoContextProvider = (props) => {
  const [userInfo, setUserInfo] = useState(
    () => JSON.parse(window.localStorage.getItem('userInfo')) || {}
  );
  const [server, setServer] = useState([]); // [{channel: name, {channelId, messages:[]}}]
  const [friends, setFriends] = useState([]);
  const [locator, setLocator] = useState({"server" : "Home", "channel" : ""});

  console.log(server)

  useEffect(() => {
    window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }, [userInfo]);

  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        setUserInfo,
        server,
        setServer,
        locator,
        setLocator,
        friends,
        setFriends,
      }}
    >
      {props.children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoContextProvider;
