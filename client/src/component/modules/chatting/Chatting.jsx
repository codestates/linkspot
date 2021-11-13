import React, { useState, useContext, useEffect } from 'react';
import './Chatting.css';
import { useConversations } from '../../../context/ConversationContext';
import { UserInfoContext } from '../../../context/UserInfoContext';
import { FaDiscord } from 'react-icons/fa';
import axios from 'axios';

const Chatting = ({ time }) => {
  const [text, setText] = useState('');
  const { sendMessage, selectedConversation } = useConversations();
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const locator = useContext(UserInfoContext).locator;
  const setLocator = useContext(UserInfoContext).setLocator;
  const [convers, setConvers] = useState({});
  const [keys, setKeys] = useState([]);
  useEffect(() => {
    const newConvers = JSON.parse(window.localStorage.getItem(locator.channel));
    console.log(newConvers);
    if (newConvers) {
      const newKeys = Object.keys(newConvers);
      setKeys(newKeys);
      setConvers(newConvers);
      return;
    }
  }, []);
  //userInfoContext를 불러와서 locator, setlocator 추가
  // 채널 메시지 저장 axios 추가
  async function handleSubmit(e) {
    e.preventDefault();

    await axios
      .post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/server/${locator.server}/channel/${locator.channel}/message`,
        {
          text: text,
        },
        {
          withCredentials: true,
        }
      )
      .then((data) => {
        console.log(data);
      });
    //sendMessage(selectedConversation.recipients, text);
    setText('');
  }
  // selectedConversation.messages.map((message, index) = socket.io 사용시 폼

  return (
    <>
      {keys.length === 0 ? (
        <div className='chatting'>
          <div className='chatting-box'></div>

          <form onSubmit={handleSubmit} className='catting-form'>
            <div className='input-box'>
              <div className='inner-box'>
                <input
                  value={text}
                  onChange={(e) => {
                    e.preventDefault();
                    setText(e.target.value);
                  }}
                />

                <button type='submit'></button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className='chatting'>
          <div className='chatting-box'>
            {keys.map((time, index) => {
              const min = time.split('T')[1].split(':')[0];
              const sec = time.split('T')[1].split(':')[1];
              return (
                <div className='message-box'>
                  <div className='profile-circle'>
                    <FaDiscord className='icon' />
                  </div>
                  <div key={index} className='text-box'>
                    <div className='name'>
                      {userInfo.username}
                      {'  '}
                      {/* {message.senderName} {'  '} 
                    senderName을 가져와야하는 부분
                  */}
                      {`${min + ':' + sec}`}
                    </div>
                    <div className='text'>{convers[time]}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className='catting-form'>
            <div className='input-box'>
              <div className='inner-box'>
                <input value={text} onChange={(e) => setText(e.target.value)} />

                <button type='submit'></button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatting;
