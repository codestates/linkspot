import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import AuthContextProvider from './context/AuthContext';
import UserContextProvider from './context/UserInfoContext';


ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
    <UserContextProvider >
    <App />
    </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


