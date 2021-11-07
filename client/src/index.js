import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import AuthContextProvider from './context/AuthContext';
import UserInfoContextProvider from './context/UserInfoContext';


ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
    <UserInfoContextProvider >
    <App />
    </UserInfoContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


