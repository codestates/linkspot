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
  const serverKey = Object.keys(server);
  console.log(serverLocator, setServerLocator);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = (e, item) => {
    // e.preventDefault();
    // window.localStorage.setItem('serverLocator', `${item.serverId}`);
    // setServerLocator(`${item.serverId}`);
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
      {serverKey.length !== 0
        ? serverKey.map((el) => {
            //data를 배열에서 객체로 바꾸면서 최대한 이전의 형태를 유지하기 위해
            // 아이템을 server[el]로 정의해둠
            const item = server[el];
            return (
              <ServerButton
                className={
                  serverLocator === `${item.serverName}`
                    ? `${item.serverName} clicked`
                    : `${item.serverName}`
                }
                onClick={(e) => {
                  handleClick(e, item);
                  window.localStorage.setItem(
                    'serverLocator',
                    `${item.serverName}`
                  );
                  setServerLocator(`${item.serverName}`);
                }}
              >
                {item.serverName}
              </ServerButton>
            );
          })
        : null}
      <ServerAddButton onClick={handleOpen} />
      {open && <ServerHandler onClose={handleClose} />}
    </div>
  );
};

export default ServerList;
