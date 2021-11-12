import React, { useEffect, useState, useContext } from 'react';
import './MyProfile.css';
import { ChromePicker } from 'react-color';
import rgbHex from 'rgb-hex';
import ColorizeIcon from '@mui/icons-material/Colorize';
import CheckIcon from '@mui/icons-material/Check';
import ImguploadModal from '../imgupload_modal/ImguploadModal';
import { FaDiscord } from 'react-icons/fa';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import { UserInfoContext } from '../../../context/UserInfoContext';
const MyProfile = () => {
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const [isCustomColor, setIsCustomColor] = useState(false);
  const [isImgUpload, setIsImgUpload] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  //console.log(userInfo.profilecolor);

  useEffect(() => {
    if (userInfo.profilecolor !== '#3da45c') {
      setIsCustomColor(true);
    }
  }, []);
  return (
    <div className='my-profile'>
      {openColorPicker && (
        <div
          aria-label='hidden'
          className='virture-background'
          onClick={() => setOpenColorPicker(false)}
        ></div>
      )}

      <div className='my-profile-box1'>
        <h3>사용자 프로필</h3>
        <p>아바타</p>
        <button onClick={() => setIsImgUpload(true)}>아바타 변경</button>
        {isImgUpload && (
          <ImguploadModal
            setIsImgUpload={setIsImgUpload}
            previewUrl={previewUrl}
            setPreviewUrl={setPreviewUrl}
          />
        )}
        <p className='profile-color-header'>프로필 색</p>
        <div className='box1-under'>
          <div
            style={{
              backgroundColor: `#3DA45C`,
            }}
            className='color-picker'
            onClick={() => {
              setUserInfo({ ...userInfo, profilecolor: '#3DA45C' });
              setIsCustomColor(false);
            }}
          >
            {!isCustomColor && <CheckIcon className='check-icon' />}
          </div>
          <div
            className='color-picker'
            style={{
              backgroundColor: `${isCustomColor ? userInfo.profilecolor : ''}`,
              border: 'solid 0.2mm #848588',
            }}
            onClick={() => {
              setOpenColorPicker(!openColorPicker);
              setIsCustomColor(true);
            }}
          >
            {isCustomColor && <CheckIcon className='check-icon' />}
            <ColorizeIcon className='icon' />
          </div>
          {openColorPicker && (
            <ChromePicker
              className='picker'
              color={userInfo.profilecolor}
              onChange={(c) =>
                setUserInfo({
                  ...userInfo,
                  profilecolor:
                    '#' + rgbHex(c.rgb.r, c.rgb.g, c.rgb.b, c.rgb.a),
                })
              }
            />
          )}
        </div>
      </div>
      <div className='my-profile-box2'>
        <p>미리보기</p>
        <div className='box'>
          <div
            className='top'
            style={{ backgroundColor: `${userInfo.profilecolor}` }}
          >
            <div
              className='profile-round'
              style={{
                backgroundImage: `url(${previewUrl})`,
              }}
            >
              <div
                className='hover-backgound'
                onClick={() => setIsImgUpload(true)}
              >
                아바타 수정
              </div>
              {!previewUrl && <FaDiscord className='icon' />}

              <WallpaperIcon className='upload-icon' />
            </div>
          </div>
          <div className='bottom'>
            <div className='bottom-upper'>
              <h4>
                {userInfo.nickname
                  ? userInfo.nickname
                  : userInfo.email.split('@')[0]}
              </h4>
            </div>

            <div className='bottom-lower'>
              <div className='bottom-lower-inner'>
                <div>
                  <h6>사용자 설정</h6>
                  <h5>
                    {userInfo.nickname
                      ? userInfo.nickname
                      : userInfo.email.split('@')[0]}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
