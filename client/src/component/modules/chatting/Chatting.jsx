import React, { useState, useContext, useEffect, useRef } from 'react';
import './Chatting.css';
import { UserInfoContext } from '../../../context/UserInfoContext';
import linkspot from '../../../assets/image/linkspot.svg';
import axios from 'axios';
import { useContacts } from '../../../context/ContactsContext';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chatting = () => {
  const [text, setText] = useState('');
  const { userInfo, friends } = useContext(UserInfoContext);
  const locator = useContext(UserInfoContext).locator;
  const [convers, setConvers] = useState({});
  const [keys, setKeys] = useState([]);
  const { messages, createContact } = useContacts();
  const endMessage = useRef();
  const [dm, setDm] = useState([]);
 useEffect(() => {
    if (messages[locator.channel]) {
      const newKeys = Object.keys(messages[locator.channel]);
      setKeys(newKeys);
      setConvers(messages[locator.channel]);
      return;
    }

    if (locator.server === 'Home' && locator.channel) {
      const newDm = friends.filter(
        (data) => data.messageId === locator.channel
      );
      if (newDm.length === 0) {
        return setDm([]);
      } else {
        return setDm([...newDm[0].message]);
      }
    }
    return;
  }, [messages, locator]);

  //userInfoContext를 불러와서 locator, setlocator 추가
  // 채널 메시지 저장 axios 추가

  function handleSubmit(e) {
    e.preventDefault();
    axios
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
        axios
          .get(
            `${process.env.REACT_APP_SERVER_BASE_URL}/server/${locator.server}/channel/${locator.channel}/message?limit=5&skip=0`,
            {
              withCredentials: true,
            }
          )
          .then((data) => {
            const demo = data.data.messages.map((message) => {
              createContact(locator.channel, message);
            });
            if (data.data.messages.length === 0) {
              createContact(locator.channel);
              return;
            }
          });
      });
    //sendMessage(selectedConversation.recipients, text);
    setText('');
  }
  // selectedConversation.messages.map((message, index) = socket.io 사용시 폼
  return (
    <>
      {keys.length === 0 ? (
        <>
          {dm && locator.server === 'Home' ? (
            <div className='chatting'>
              <ScrollToBottom className='chatting-box'>
                {dm.map((data, index) => {
                  return (
                    <div className='message-box' key={index}>
                      <div className='profile-circle'>
                        <img src={linkspot} className='icon' />
                      </div>
                      <div key={index} className='text-box'>
                        <div className='name'>
                          {data.senderName}
                          {'  '}
                          {/* {message.senderName} {'  '} 
                      senderName을 가져와야하는 부분
                    */}
                        </div>
                        <div className='text'>{data.text}</div>
                      </div>
                    </div>
                  );
                })}
              </ScrollToBottom>
              <div ref={endMessage}></div>
              <form onSubmit={handleSubmit} className='catting-form'>
                <div className='input-box'>
                  <div className='inner-box'>
                    <input
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                    <button type='submit'></button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
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
          )}
        </>
      ) : (
        <div className='chatting'>
          <ScrollToBottom className='chatting-box'>
            {keys.map((time, index) => {
              const min = time.split('T')[1].split(':')[0];
              const sec = time.split('T')[1].split(':')[1];
              return (
                <div className='message-box' key={index}>
                  <div className='profile-circle'>
                    <img src={linkspot} className='icon' />
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
          </ScrollToBottom>
          <div ref={endMessage}></div>
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
