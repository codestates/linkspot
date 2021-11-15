import './Sidebar.css';
import { useContext } from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { UserInfoContext } from '../../../context/UserInfoContext';
import UserSection from '../user_section/UserSection';
import LeaveServer from '../leave_server/LeaveServer';
import SidebarUserCard from '../user_info_card/SidebarUserCard';


const Sidebar = () => {
  const locator = useContext(UserInfoContext).locator;
  const setLocator = useContext(UserInfoContext).setLocator;
  const targetServer = useContext(UserInfoContext).server.filter(
    (item) => item._id === locator.server
  )[0];

  //const { setSelectId } = useConversations();

  const handleClick = (item) => {
    setLocator({ server: item.serverId, channel: item._id });
    //setSelectId(item._id);
  };

  return (
    <div className='sidebar-container'>
      {locator.server === 'Home' ? (
        <>
          <div className='sidebar-search'>
            <button type='button' className='sidebar-button'>
              대화 찾기 또는 시작하기
            </button>
          </div>
          <div className='friend-button'>
            <div>
              <FaUserFriends size='24px' />
            </div>
            <p>친구</p>
          </div>
          <div className='message-container'>
            <div className='message-header'>
              <p>개인메세지</p>
            </div>
            <SidebarUserCard/>
          </div>
        </>
      ) : (
        <>
          <div className='sidebar-server-name'>
            <p>{targetServer.serverName}</p>
            <LeaveServer
            className='leave-server'
            server={targetServer.serverName}
          />
          </div>
          <div className='sidebar-group-container'>
            <div className='channel-group'>
              {targetServer &&
                targetServer.channelIds.map((group, idx) => {
                  return (
                    <>
                      <div className='channel-group' key={idx}>
                        <p>
                          {group.channelType === 'Text'
                            ? '채팅 채널'
                            : '음성 채널'}
                        </p>
                      </div>
                      <div
                        className={
                          locator.channel === `${group._id}`
                            ? `${group.channelName} clicked`
                            : `${group.channelName}`
                        }
                        onClick={() => handleClick(group)}
                      >
                        {group.channelName}
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </>
      )}
      <UserSection />
    </div>
  );
};

export default Sidebar;
