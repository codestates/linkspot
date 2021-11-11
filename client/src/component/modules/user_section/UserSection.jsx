import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './UserSection.css';
import avatar from '../../../assets/image/avatar-yellow.png';
import { UserInfoContext } from '../../../context/UserInfoContext';
import { IoSettingsSharp } from 'react-icons/io5';

const UserSection = () => {
  const userInfo = useContext(UserInfoContext).userInfo;
  return (
    <>
      <section className='my-info'>
        {userInfo.profilePicture ? (
          <img src={userInfo.profilePicture} alt={userInfo.username} />
        ) : (
          <img src={avatar} alt='default img' />
        )}
        <div className='userinfo-container'>
          <p className='userinfo-nickname'>
            {userInfo.username
              ? userInfo.username
              : userInfo.email.split('@')[0]}
          </p>
          <p className='userinfo-tag'>#1234</p>
        </div>
        <div className='icon-container'>
          <Link to='/user_setting'>
            <IoSettingsSharp className='icon' />
          </Link>
        </div>
      </section>
    </>
  );
};

export default UserSection;
