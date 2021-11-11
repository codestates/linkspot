import React from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './SectionContainer.css';
import Chatting from '../chatting/Chatting';
import "./SectionContainer.css"

// Main 페이지에서 서버 리스트를 제외한 나머지 부분을 담고있는 컨테이너
const SectionContainer = () => {
  const { conversations } = useConversations();
  // const userInfo = {
  //   email : props.user.email,
  //   nickname:props.user.nickname
  // }
  // const currentServer = props.currentServer
  // const user = props.user
  // const serverList = props.serverList
  // const currentServerInfo = {
  //   "name" : currentServer,
  //   "info" : serverList[currentServer]
  // }

  // const [currentChannel, setCurrentChannel] = useState("")

  //   useEffect(()=>{
  //     if(window.localStorage.getItem(`${currentServer}`)){
  //     setCurrentChannel(JSON.parse(window.localStorage.getItem(`${currentServer}`)).channel)
  //   } else {
  //     setCurrentChannel("")
  //   }
  // },[window.localStorage.getItem(`${currentServer}`)])

  return (
    <div className='section-wrap'>
      <Sidebar />
      <div className='section-container'>
        <Header />
        <div className='chatting-container'>
          {conversations.length !== 0 ? (
            <Chatting time={data.time}></Chatting>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SectionContainer;
