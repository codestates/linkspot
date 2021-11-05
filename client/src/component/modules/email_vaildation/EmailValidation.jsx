import React, { useState } from 'react';
import './EmailValidation.css';
import LoadingComponent from '../../atoms/loader/Loader';

const EmailValidation = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  console.log(checked);
  return (
    <div className='email-validation-box'>
      <h3>이메일을 검증해주세요.</h3>
      <div>
        <LoadingComponent />
      </div>
      <div className='checkbox-wrapper'>
        <input type='checkbox' checked={checked} onChange={handleChange} />
        <p>이메일 확인 후 체크해주세요.</p>
      </div>
    </div>
  );
};

export default EmailValidation;
