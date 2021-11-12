import './Sidebar.css';
import { useContext, useEffect } from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { UserInfoContext } from '../../../context/UserInfoContext';
import avatar from '../../../assets/image/avatar-yellow.png';
import UserSection from '../user_section/UserSection';
import { useConversations } from '../../../context/ConversationContext';

const Sidebar = () => {
  const locator = useContext(UserInfoContext).locator;
  const setLocator = useContext(UserInfoContext).setLocator;
  const userInfo = useContext(UserInfoContext).userInfo;
  const targetServer =
    useContext(UserInfoContext).server.filter(
      (item) => item._id === locator.server
    )[0] || [];
  //console.log(targetServer);
  const { setSelectId } = useConversations();
  useEffect(() => {
    if (locator.server !== 'Home') {
      return setLocator({
        server: targetServer._id,
        channel: targetServer.channelIds[0]._id,
      });
    }
  }, [locator.server]);

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
            <div className='card-container'>
              {userInfo.directList.length !== 0 ? (
                <>
                  <img src={avatar} alt='default img' />
                  <div className='card-info'>nickname</div>
                </>
              ) : null}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='sidebar-server-name'>{targetServer.serverName}</div>
          <div className='sidebar-group-container'>
            <div className='channel-group'>
              {targetServer.channelIds.map((group) => {
                return (
                  <>
                    <div className='channel-group'>
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
