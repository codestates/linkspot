import React, { useState, useCallback, useContext } from 'react';
import './Chatting.css';
import { useConversations } from '../../../context/ConversationContext';
import { UserInfoContext } from '../../../context/UserInfoContext';
import { FaDiscord } from 'react-icons/fa';

const Chatting = () => {
  const [text, setText] = useState('');
  const { sendMessage, selectedConversation } = useConversations();
  const { userInfo, setUserInfo } = useContext(UserInfoContext);

  const YearMonthDate = `${new Date(Date.now()).getFullYear()}.${
    new Date(Date.now()).getMonth() + 1
  }.${new Date(Date.now()).getDate()}`;
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    sendMessage(
      selectedConversation.recipients.map((r) => r.id),
      text
    );
    setText('');
  }
  const data = {
    ninkName: UserInfoContext.ninkName,
    fulltime: YearMonthDate,
    time:
      new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
  };
  return (
    <div className='chatting'>
      <div className='chatting-box'>
        {selectedConversation.messages.map((message, index) => {
          const lastMessage =
            selectedConversation.messages.length - 1 === index;
          return (
            <div className='message-box'>
              <div
                className='profile-circle'
                // style={{
                //   backgroundImage: `url(${previewUrl})`,
                // }}
              >
                {/* {!previewUrl && <FaDiscord className='icon' />} */}
                <FaDiscord className='icon' />
              </div>
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className='text-box'
              >
                <div className='name'>{message.senderName}</div>
                <div
                  className={`text ${
                    message.fromMe ? 'bg-primary text-white' : 'border'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className='catting-form'>
        <div className='input-box'>
          <div className='inner-box'>
            <input value={text} onChange={(e) => setText(e.target.value)} />

            <button type='submit' aria-hidden='true'></button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Chatting;
