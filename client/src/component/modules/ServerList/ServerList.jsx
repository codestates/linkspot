import { useContext, useState, useEffect } from 'react';
import ServerButton from '../../atoms/button/ServerButton';
import ServerAddButton from '../../atoms/button/ServerAddButton';
import icon from '../../../assets/image/icon_clyde_white_RGB.svg';
import './ServerList.css';
import { UserInfoContext } from '../../../context/UserInfoContext';
import ServerHandler from '../server_handler/ServerHandler';
import axios from 'axios';
import { useContacts } from '../../../context/ContactsContext';

const ServerList = () => {
  const server = useContext(UserInfoContext).server;
  const locator = useContext(UserInfoContext).locator;
  const setLocator = useContext(UserInfoContext).setLocator;
  const [open, setOpen] = useState(false);
  const { createContact } = useContacts();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // 채널 아이디 정의
  const handleClick = async (item) => {
    setLocator({ server: item._id, channel: item.channelIds[0]._id });
    const channel_Id = item.channelIds[0]._id;

    await axios
      .get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/server/${item._id}/channel/${channel_Id}/message?limit=5&skip=0`,
        {
          withCredentials: true,
        }
      )
      .then((data) => {
        const demo = data.data.messages.map((message) => {
          createContact(channel_Id, message);
        });
        if (demo.length === 0) {
          createContact(channel_Id, '');
        }
      });
  };

  return (
    <div className='serverlist-container'>
      <ServerButton
        key=''
        img={icon}
        onClick={() => setLocator({ server: 'Home', channel: '' })}
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
                  onClick={() => handleClick(server)}
                >
                  <p>{server.serverName}</p>
                </ServerButton>
              </>
            );
          })
        : null}
      <ServerAddButton onClick={handleOpen} />
      {open && <ServerHandler onClose={handleClose} />}
    </div>
  );
};

export default ServerList;
