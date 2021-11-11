<<<<<<< HEAD
import "./Layout.css"
import { withRouter } from "react-router-dom"


// 가장 최상단 컨테이너
function Layout(props){  
=======
import './Layout.css';
import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { UserInfoContext } from '../../context/UserInfoContext';
import { AuthContext } from '../../context/AuthContext';

function Layout(props) {
>>>>>>> b265d9f149bf827ef23e9d829f62ba28005adbef
  return (
    <div className='layout-wrap'>
      <div className='layout' id='layout'>
        {props.children}
      </div>
    </div>
  );
}

export default withRouter(Layout);
