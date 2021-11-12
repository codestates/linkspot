import { useContext, useState, useEffect } from 'react';
import ServerButton from '../../atoms/button/ServerButton';
import ServerAddButton from '../../atoms/button/ServerAddButton';
import icon from '../../../assets/image/icon_clyde_white_RGB.svg';
import './ServerList.css';
import { UserInfoContext } from '../../../context/UserInfoContext';
import ServerHandler from '../server_handler/ServerHandler';

const ServerList = () => {
  
  const server = useContext(UserInfoContext).server
  const locator = useContext(UserInfoContext).locator;
  const setLocator = useContext(UserInfoContext).setLocator;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = (item) => {
    setLocator({"server" : item._id, "channel" : ""})
  };

  return (
    <div className='serverlist-container'>
      <ServerButton
        key=""
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
                  key={server._id}
                  className={
                    locator.server === `${server._id}`
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
