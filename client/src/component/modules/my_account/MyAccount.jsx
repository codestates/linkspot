import React, { useState } from 'react';
import './MyAccount.css';
import linkspot from '../../../assets/image/linkspot.svg';
import UpdateModal from '../update_modal/UpdateModal';
import AccountDeleteModal from '../delete_modal/AccountDelete';
const MyAccount = ({ userInfo, setPage }) => {
  const [isModal, setIsModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [IsDeleteModal, setIsDeleteModal] = useState(false);
  const handleClick = async (type) => {
    if (type === 'delete') {
      setIsDeleteModal(true);
    } else {
      setModalType(type);
      setIsModal(true);
    }
  };
  return (
    <div className='myaccount'>
      {isModal ? (
        <UpdateModal modalType={modalType} setIsModal={setIsModal} />
      ) : null}
      {IsDeleteModal ? (
        <AccountDeleteModal setIsModal={setIsDeleteModal} />
      ) : null}
      <h3>My Account</h3>
      <div className='box'>
        <div
          className='top'
          style={{ backgroundColor: `${userInfo.profilecolor || '#3DA45C'}` }}
        >
          <div
            className='profile-round'
            style={{
              backgroundImage: `url(${
                userInfo.profilePicture ? userInfo.profilePicture : null
              })`,
            }}
          >
            {!userInfo.profilePicture && (
              <img src={linkspot} className='icon' />
            )}
          </div>
        </div>
        <div className='bottom'>
          <div className='bottom-upper'>
            <h4>
              {userInfo.username
                ? userInfo.username
                : userInfo.email.split('@')[0]}
            </h4>
            <button onClick={() => setPage('myprofile')}>프로필 수정</button>
          </div>

          <div className='bottom-lower'>
            <div className='bottom-lower-inner'>
              <div>
                <h6>사용자 설정</h6>
                <h5>
                  {userInfo.username
                    ? userInfo.username
                    : userInfo.email.split('@')[0]}
                </h5>
              </div>
              {/* '사용자 이름 수정' */}
              <button onClick={(e) => handleClick('사용자 이름 수정')}>
                수정
              </button>
            </div>
            <div className='bottom-lower-inner'>
              <div>
                <h6>이메일</h6>
                <h5>{userInfo.email}</h5>
              </div>
              <button onClick={() => handleClick('이메일 수정')}>수정</button>
            </div>
          </div>
        </div>
      </div>
      <div className='myaccount-box-lower'>
        <h3>비밀번호</h3>
        <button onClick={() => handleClick('비밀번호 수정')}>
          비밀번호 변경
        </button>
      </div>
      <div className='myaccount-box-lower'>
        <h3>계정삭제</h3>
        <button
          className='account-delete'
          onClick={() => handleClick('delete')}
        >
          계정삭제
        </button>
      </div>
    </div>
  );
};

export default MyAccount;
