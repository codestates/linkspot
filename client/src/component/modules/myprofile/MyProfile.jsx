import React, { useEffect, useState, useContext } from 'react';
import './MyProfile.css';
import { ChromePicker } from 'react-color';
import rgbHex from 'rgb-hex';
import colorpicker from '../../../assets/image/colorpicker.svg';
import check from '../../../assets/image/check.svg';
import imgupload from '../../../assets/image/imgupload.svg';
import linkspot from '../../../assets/image/linkspot.svg';
import ImguploadModal from '../imgupload_modal/ImguploadModal';
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
    console.log(userInfo);
    if (previewUrl) {
      setUserInfo({ ...userInfo, profilePicture: previewUrl });
    }
  }, [previewUrl]);

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
            {!isCustomColor && <img src={check} className='check-icon' />}
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
            {isCustomColor && <img src={check} className='check-icon' />}
            <img src={colorpicker} className='icon' />
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
                backgroundImage: `url(${userInfo.profilePicture})`,
              }}
            >
              <div
                className='hover-backgound'
                onClick={() => setIsImgUpload(true)}
              >
                아바타 수정
              </div>
              {!userInfo.profilePicture && (
                <img src={linkspot} className='icon' />
              )}

              <img src={imgupload} className='upload-icon' />
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
