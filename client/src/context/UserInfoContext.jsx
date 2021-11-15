import React, { createContext, useState, useEffect } from 'react';

export const UserInfoContext = createContext();

const UserInfoContextProvider = (props) => {
  const [userInfo, setUserInfo] = useState(
    () => JSON.parse(window.localStorage.getItem('userInfo')) || {}
  );
  const [server, setServer] = useState(
    () => JSON.parse(window.localStorage.getItem('server')) || {}
  ); // [{channel: name, {channelId, messages:[]}}]
  const [friends, setFriends] = useState([]);

  const [locator, setLocator] = useState(
    () =>
      JSON.parse(window.localStorage.getItem('locator')) || {
        server: 'Home',
        channel: '',
      }
  );
  const [participant, setParticipant] = useState(
    ()=> JSON.parse(window.localStorage.getItem("participant")) || {}
  );

  useEffect(()=>{
    window.localStorage.setItem("participant", JSON.stringify(participant))
  },[participant])

  useEffect(() => {
    window.localStorage.setItem('server', JSON.stringify(server));
  }, [server]);

  useEffect(() => {
    window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }, [userInfo]);

  useEffect(() => {
    window.localStorage.setItem('locator', JSON.stringify(locator));
  }, [locator]);
  

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
        participant,
        setParticipant
      }}
    >
      {props.children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoContextProvider;
