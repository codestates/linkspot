import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { UserInfoContext } from './UserInfoContext';

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const [id, setId] = useState();

  useEffect(() => {
    //서버주소
    if (userInfo) {
      console.log(typeof userInfo);
      setId(userInfo.email);
    }
    const newSocket = io('http://localhost:8080');

    setSocket(newSocket);
    return () => newSocket.close();
  }, [id]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
