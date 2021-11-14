import React from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './SectionContainer.css';
import Chatting from '../chatting/Chatting';
import './SectionContainer.css';

// Main 페이지에서 서버 리스트를 제외한 나머지 부분을 담고있는 컨테이너
const SectionContainer = () => {
  //채팅 내부에서 연산자 사용해서 없을 때 안 나타나게 함
  return (
    <div className='section-wrap'>
      <Sidebar />
      <div className='section-container'>
        <Header />
        <div className='chatting-container'>
          <Chatting></Chatting>
        </div>
      </div>
    </div>
  );
};

export default SectionContainer;
