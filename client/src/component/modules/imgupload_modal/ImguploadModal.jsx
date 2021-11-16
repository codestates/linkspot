import React, { useState, useRef } from 'react';
import './ImguploadModal.css';
import imgupload from '../../../assets/image/imgupload.svg';
import { v4 as uuid4 } from 'uuid';
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
      // let url;
      // let id = uuid4();
      // const imgRef = ref(storageService, `main/${id}`);
      // await uploadBytes(imgRef, newFile);
      // await getDownloadURL(imgRef).then((res) => {
      //   url = res;
      // });
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
            <img className='upload-icon' src={imgupload} />
          </div>
          이미지 첨부
        </div>
      </div>
    </div>
  );
};

export default ImguploadModal;
