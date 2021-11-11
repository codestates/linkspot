import './Sidebar.css';
import { useContext } from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { UserInfoContext } from '../../../context/UserInfoContext';
import avatar from '../../../assets/image/avatar-yellow.png';
import UserSection from '../user_section/UserSection';
import { server } from '../../../db';
const Sidebar = () => {
  const serverLocator = useContext(UserInfoContext).serverLocator;
  const userInfo = useContext(UserInfoContext).userInfo;
  console.log(serverLocator);

  // const serverInfo = props.currentServerInfo.info
  // const user = props.user
  // const currentChannel = props.currentChannel
  // const setCurrentChannel = props.setCurrentChannel

  // useEffect(()=>{
  //   if(window.localStorage.getItem("serverLocator") !== "Home" || !window.localStorage.getItem(`${serverName}`))
  //   window.localStorage.setItem(
  //     `${serverName}`,
  //     JSON.stringify({"group" : Object.keys(serverInfo)[0],"channel" : Object.values(serverInfo)[0][0]}
  //     ))
  // },[])

  // if(
  //   !window.localStorage.getItem(`${serverName}`) && window.localStorage.getItem("server") && serverName !== "Home"){
  //   window.localStorage.setItem(
  //     `${serverName}`,
  //     JSON.stringify({"group" : Object.keys(serverInfo)[0],"channel" : Object.values(serverInfo)[0][0]}
  //     ))
  // }

  return (
    <div className='sidebar-container'>
      {serverLocator === 'Home' || !serverLocator ? (
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
              {userInfo.friend ? (
                <div>
                  <img src={avatar} alt='default img' />
                  <div className='card-info'>nickname</div>
                </div>
              ) : null}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='sidebar-server-name'>
            {'  '} {serverLocator}
          </div>
          <div className='sidebar-group-container'>
            <div className='channel-group'>
              {server[serverLocator].channel.map((sub) => {
                const item = Object.keys(sub);
                console.log(sub);
                return (
                  <>
                    <p>{sub.channelTitle}</p>
                    {item.map((el) => {
                      if (el !== 'channelTitle')
                        return (
                          <div
                            className={`channel ${serverLocator}-${sub[el].channelName}`}
                            onClick={() => {
                              // setCurrentChannel(sub);
                              window.localStorage.setItem(
                                `${serverLocator}`,
                                JSON.stringify({
                                  group: serverLocator,
                                  channel: sub[el].channelName,
                                })
                              );
                            }}
                          >
                            {sub[el].channelName}
                          </div>
                        );
                    })}
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
