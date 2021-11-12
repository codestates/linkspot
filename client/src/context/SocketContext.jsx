import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { UserInfoContext } from './UserInfoContext';

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}
//유저가 로그인하는 동시에 소켓과 연결을 시작한다.
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const [id, setId] = useState();

  // useEffect(() => {
  //   if (userInfo) {
  //     console.log(typeof userInfo);
  //     setId(userInfo.email);
  //   }
  //   const newSocket = io('https://localhost:8080');

  //   setSocket(newSocket);
  //   return () => newSocket.close();
  // }, [userInfo]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
