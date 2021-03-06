import './Header.css';
import { useState, useContext } from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { TiMessages } from 'react-icons/ti';
import { RiInboxFill } from 'react-icons/ri';
import { Tabs, Tab } from 'react-bootstrap';
import NoOnline from '../../../assets/image/no-online.svg';
import NoRequest from '../../../assets/image/no-request.svg';
import Nobody from '../../../assets/image/nobody.svg';
import NoBlock from '../../../assets/image/no-block.svg';
import { UserInfoContext } from '../../../context/UserInfoContext';
import dummy from "../../../dummy"
import HeaderUserCard from '../user_info_card/HeaderUserCard';
import BlockUserCard from '../user_info_card/BlockUserCard';

const Header = () => {
  const locator = useContext(UserInfoContext).locator;
  const participant = useContext(UserInfoContext).participant;
  const targetServer = useContext(UserInfoContext).server.filter(
    (item) => item._id === locator.server
  )[0];
  const [key, setKey] = useState('온라인');
  const tabList = ['온라인', '모두', '대기 중', '차단 목록', '친구 추가하기'];
  const [onlineList, setOnlineList] = useState(dummy.filter((item)=> item.status ==="online"));
  const [friendList, setFriendList] = useState(dummy.filter((item)=> item.status !== "blocked" && item.status !== "request"));
  const [requestList, setRequestList] = useState(dummy.filter((item)=> item.status ==="request"));
  const [blockList, setBlockList] = useState(dummy.filter((item)=> item.status ==="blocked"));
  const [disable, setDisable] = useState(true);
  let currentChannel =
    locator.server !== 'Home'
      ? targetServer.channelIds.filter((item) => {
          if (locator.channel === item._id) {
            return item;
          }
        })[0].channelName
      : null;


  const disableHandler = (e) => {
    if (e.target.value.length > 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  const tabComponent = (props) => {
    if (key === '온라인') {
      return onlineList.length === 0 ? (
        <div className='online-friend empty'>
          <div className='image-container'>
            <img src={NoOnline} alt='nobody is online' />
          </div>
          <p>아무도 Wumpus와 놀고 싶지 않은가 봐요.</p>
        </div>
      ) : (
        <>
          <div className='online-friend'>
            <p>온라인 - {onlineList.length}명</p>
          </div>
          {onlineList.map((item)=>{
            return <HeaderUserCard data={item} setState={setFriendList}/>
          })}
        </>
      );
    } else if (key === '모두') {
      return friendList.length === 0 ? (
        <div className='friends empty'>
          <div className='image-container'>
            <img src={Nobody} alt='Empty friend-list' />
          </div>
          <p>Wumpus는 친구를 기다리고 있어요.</p>
        </div>
      ) : (
        <>
          <div className='friends'>
            <p>모든 친구 - {friendList.length}명</p>
          </div>
            {friendList.map((item)=>{
              return <HeaderUserCard data={item} setState={setFriendList}/>
            })}
        </>
      );
    } else if (key === '대기 중') {
      return requestList.length === 0 ? (
        <div className='request empty'>
          <div className='image-container'>
            <img src={NoRequest} alt='Empty friend request' />
          </div>
          <p>대기 중인 친구 요청이 없네요. 그래도 옆에 Wumpus는 있네요.</p>
        </div>
      ) : (
        <>
          <div className='request'>
            <p>대기 중 - {requestList.length}명</p>
          </div>
          {requestList.map((item)=>{
              return <HeaderUserCard data={item} setState={{friendList, requestList, setRequestList, setFriendList}}/>
            })}
        </>
      );
    } else if (key === '차단 목록') {
      return blockList.length === 0 ? (
        <div className='block empty'>
          <div className='image-container'>
            <img src={NoBlock} alt='Empty block list' />
          </div>
          <p>Wumpus는 차단 해제를 할 수 없어요.</p>
        </div>
      ) : (
        <>
          <div className='block'>
            <p>차단 목록 - {blockList.length}명</p>
          </div>
          {blockList.map((item)=>{
              return <BlockUserCard data={item} setState={{friendList, blockList, setBlockList, setFriendList}}/>
            })}
        </>

      );
    } else if (key === '친구 추가하기') {
      return (
        <div className='friend-request'>
          <header className='friend-request-form-container'>
            <div className='friend-request-head'>
              <p className='title'>친구 추가하기</p>
              <p className='explaination'>
                Friend Tag를 사용하여 친구를 추가할 수 있어요. 대문자, 소문자를
                구별한답니다!
              </p>
            </div>
            <div className='friend-request-form'>
              <input
                className='infomation-input'
                placeholder='사용자명#0000 입력'
                onChange={disableHandler}
              />
              <button
                type='submit'
                className={disable ? 'disable' : 'infomation-submit'}
              >
                친구 요청 보내기
              </button>
            </div>
          </header>
          <div className='friends empty'>
            <div className='image-container'>
              <img src={Nobody} alt='Empty friend-list' />
            </div>
            <p>Wumpus는 친구를 기다리고 있어요.</p>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {locator.server === 'Home' && locator.channel === '' ? (
        <div className='header-container'>
          <nav className='nav-container'>
            <div className='friend-tag'>
              <FaUserFriends size='24px' />
              <p>친구</p>
            </div>
            <Tabs
              id='controlled-tab-example'
              activeKey={key}
              onSelect={(k) => {
                setKey(k);
              }}
              className='mb-3'
            >
              {tabList.map((tab) => {
                return (
                  <Tab
                    eventKey={tab}
                    title={tab}
                    key={tab}
                    tabClassName={tab}
                  ></Tab>
                );
              })}
            </Tabs>
            <div className='button-row'>
              <TiMessages />
              <RiInboxFill />
            </div>
          </nav>
          <div className='tab-content'>{tabComponent()}</div>
        </div>
      ) : (
        <div className='location-name'>
          {currentChannel ? currentChannel : `${participant} 님과의 대화`}
        </div>
      )}
    </>
  );
};

export default Header;
