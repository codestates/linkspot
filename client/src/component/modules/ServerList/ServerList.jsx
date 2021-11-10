import { useContext, useState, useEffect } from 'react';
import ServerButton from '../../atoms/Button/ServerButton';
import ServerAddButton from '../../atoms/Button/ServerAddButton';
import icon from '../../../assets/image/icon_clyde_white_RGB.svg';
import './ServerList.css';
import { UserInfoContext } from '../../../context/UserInfoContext';
import { Dialog } from '@mui/material';
import ServerHandler from '../server_handler/ServerHandler';
import { db } from '../../../utils/firebase/firebase';
import { server } from '../../../db';
const ServerList = () => {
  // const server = useContext(UserInfoContext).server;
  const serverLocator = useContext(UserInfoContext).serverLocator;
  const setServerLocator = useContext(UserInfoContext).setServerLocator;
  const [open, setOpen] = useState(false);

  console.log(serverLocator, setServerLocator);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='serverlist-container'>
      <ServerButton
        img={icon}
        onClick={() => {
          window.localStorage.setItem('serverLocator', 'Home');
          setServerLocator('Home');
        }}
        className={
          serverLocator === 'Home' || !serverLocator ? 'Home clicked' : 'Home'
        }
      >
        Home
      </ServerButton>
      {server.length !== 0
        ? server.map((item) => (
            <ServerButton
              className={
                serverLocator === `${item.serverName}`
                  ? `${item.serverName} clicked`
                  : `${item.serverName}`
              }
              onClick={() => {
                window.localStorage.setItem(
                  'serverLocator',
                  `${item.serverName}`
                );
                setServerLocator(`${item.serverName}`);
              }}
            >
              {item.serverName}
            </ServerButton>
          ))
        : null}
      <ServerAddButton onClick={handleOpen} />
      <Dialog open={open} onClose={handleClose}>
        <ServerHandler />
        <button onClick={handleClose}>닫기</button>
      </Dialog>
    </div>
  );
};

export default ServerList;
