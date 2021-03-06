import { useState, useContext, useEffect } from 'react';
import './SidebarUserCard.css';
import linkspot from '../../../assets/image/linkspot.svg';
import { MdOutlineCancel } from 'react-icons/md';
import { UserInfoContext } from '../../../context/UserInfoContext';

const SidebarUserCard = () => {
  //Test용 더미 데이터
  const dummy = [
    {
      messageId: 1,
      sender: {
        username: 'test1',
        thumnail:
          'https://item.kakaocdn.net/do/95825b966c890df43296612c02abecbd9f5287469802eca457586a25a096fd31',
      },
      message: [
        { senderId: 2, senderName: 'test3', text: 'Hellloooooooooooooooo' },
        { senderId: 1, senderName: 'test1', text: 'hi' },
        { senderId: 2, senderName: 'test3', text: 'whatup' },
      ],
    },
    {
      messageId: 2,
      sender: {
        username: 'test3',
      },
      message: [
        { senderId: 3, senderName: 'test4', text: 'hell' },
        { senderId: 2, senderName: 'test3', text: 'ye' },
        { senderId: 3, senderName: 'test4', text: 'what?' },
      ],
    },
    {
      messageId: 3,
      sender: {
        username: 'test4',
        thumnail:
          'https://i.pinimg.com/736x/e6/ed/b5/e6edb5aef20e0a6e057803ea678d8cd9.jpg',
      },
      message: [
        { senderId: 2, senderName: 'test3', text: 'bravo' },
        { senderId: 3, senderName: 'test4', text: 'alpa' },
        { senderId: 2, senderName: 'test3', text: 'beta' },
      ],
    },
  ];

  window.localStorage.setItem('DM', '');
  const [messageList, setMessageList] = useState(dummy);
  const locator = useContext(UserInfoContext).locator;
  const setLocator = useContext(UserInfoContext).setLocator;
  const setParticipant = useContext(UserInfoContext).setParticipant;
  const setFriends = useContext(UserInfoContext).setFriends;
  // const [isClicked, setIsClicked] = useState(false)

  console.log(locator);

  useEffect(() => {
    setFriends([...dummy]);
    return setLocator({ server: 'Home', channel: '' });
  }, [messageList]);

  return (
    <>
      {messageList.length !== 0
        ? messageList.map((dm) => {
            return (
              <div
                key={dm.messageId}
                className={
                  locator.channel === dm.messageId
                    ? 'card-container-clicked'
                    : 'card-container'
                }
                onClick={() => {
                  setLocator({ server: 'Home', channel: dm.messageId });
                  setParticipant(dm.sender.username);
                }}
              >
                {dm.sender.thumnail ? (
                  <img src={dm.sender.thumnail} alt='img' />
                ) : (
                  <img src={linkspot} alt='default img' />
                )}
                <div className='card-info'>{dm.sender.username}</div>
                <div className='remove-button'>
                  <MdOutlineCancel
                    onClick={() =>
                      setMessageList(
                        messageList.filter(
                          (item) => item.messageId !== dm.messageId
                        )
                      )
                    }
                  />
                </div>
              </div>
            );
          })
        : null}
    </>
  );
};

export default SidebarUserCard;
