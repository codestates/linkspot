import React from 'react';
import './Loader.css';

const LoadingComponent = () => {
  return (
    <div className='lds-ellipsis'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingComponent;
