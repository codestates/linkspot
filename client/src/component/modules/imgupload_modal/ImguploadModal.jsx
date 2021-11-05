import React, { useState } from 'react';
import './ImguploadModal.css';
import WallpaperIcon from '@mui/icons-material/Wallpaper';

const ImguploadModal = ({ setIsImgUpload, previewUrl, setPreviewUrl }) => {
  const handleImgupload = (e) => {
    e.preventDefault();

    const newFile = e.target.files[0];
    //console.log(newFile);
    if (newFile) {
      const reader = new FileReader();
      reader.readAsDataURL(newFile);
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        //console.log(reader.result);
      };
    }
    setIsImgUpload(false);
  };
  return (
    <div className='upload-modal'>
      <div className='background' onClick={() => setIsImgUpload(false)}></div>
      <div className='img-upload'>
        <h3>이미지 선택</h3>
        <div className='fake-input'>
          <input
            type='file'
            name='image'
            value=''
            encType='multipart/form-data'
            onChange={handleImgupload}
          />
          <div className='circle'>
            <WallpaperIcon />
          </div>
          이미지 첨부
        </div>
      </div>
    </div>
  );
};

export default ImguploadModal;
