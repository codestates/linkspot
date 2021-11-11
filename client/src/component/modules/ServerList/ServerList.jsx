import { useContext, useState, useEffect } from 'react';
import ServerButton from '../../atoms/button/ServerButton';
import ServerAddButton from '../../atoms/button/ServerAddButton';
import icon from '../../../assets/image/icon_clyde_white_RGB.svg';
import './ServerList.css';
import { UserInfoContext } from '../../../context/UserInfoContext';
import ServerHandler from '../server_handler/ServerHandler';
import { server } from '../../../db';
const ServerList = () => {
  // const server = useContext(UserInfoContext).server;
  // useEffect(()=>{
  //   return server = servers
  // },[useContext(UserInfoContext).server])
  
  const server = useContext(UserInfoContext).server
  const locator = useContext(UserInfoContext).locator;
  const setLocator = useContext(UserInfoContext).setLocator;
  const [open, setOpen] = useState(false);

  console.log(server)

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = (item) => {
    setLocator({"server" : item.serverName, "channel" : ""})
  };

  return (
    <div className='serverlist-container'>
      <ServerButton
        img={icon}
        onClick={() => 
          setLocator({"server" : "Home", "channel" : ""})
        }
        className={
          locator.server === 'Home' || !locator ? 'Home clicked' : 'Home'
        }
      >
        Home
      </ServerButton>
      {server.length !== 0
        ? server.map((server) => {
            return (
              <>
                <ServerButton
                  className={
                    locator.server === `${server.serverName}`
                      ? `${server.serverName} clicked`
                      : `${server.serverName}`
                  }
                  onClick={() =>              
                    handleClick(server)
                  }
                >
                  <p>{server.serverName}</p>
                </ServerButton>
              </>
            )})
        : null}
      <ServerAddButton onClick={handleOpen} />
      {open && <ServerHandler onClose={handleClose} />}
    </div>
  );
};

export default ServerList;
