import React, { createContext, useState, useEffect } from 'react';
import { db } from '../utils/firebase/firebase';

export const UserInfoContext = createContext();

const UserInfoContextProvider = (props) => {
  const [userInfo, setUserInfo] = useState(
    () => JSON.parse(window.localStorage.getItem('userInfo')) || {}
  );
  const [server, setServer] = useState([]); // [{channel: name, {channelId, messages:[]}}]
  const [friends, setFriends] = useState([]);
  const [serverLocator, setServerLocator] = useState('');

  useEffect(() => {
    db.collection('server').onSnapshot((snapshot) => {
      let list = [];
      snapshot.forEach((doc) => list.push({ ...doc.data(), id: doc.id }));
      setServer(list);
    });
  }, []);

  useEffect(() => {
    window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }, [userInfo]);

  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        setUserInfo,
        server,
        serverLocator,
        setServerLocator,
        friends,
        setFriends,
      }}
    >
      {props.children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoContextProvider;
