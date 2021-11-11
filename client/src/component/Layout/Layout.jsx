import './Layout.css';
import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { UserInfoContext } from '../../context/UserInfoContext';
import { AuthContext } from '../../context/AuthContext';

function Layout(props) {
  return (
    <div className='layout-wrap'>
      <div className='layout' id='layout'>
        {props.children}
      </div>
    </div>
  );
}

export default withRouter(Layout);
