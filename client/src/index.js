import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import AuthContextProvider from './context/AuthContext';
import UserInfoContextProvider from './context/UserInfoContext';
import { ContactsProvider } from './context/ContactsContext';
import { SocketProvider } from './context/SocketContext';
import { ConversationsProvider } from './context/ConversationContext';


ReactDOM.render(
  <React.StrictMode>
    <UserInfoContextProvider >
      <ContactsProvider>
        <SocketProvider>  
          <ConversationsProvider>
            <AuthContextProvider>    
              <App /> 
            </AuthContextProvider>
          </ConversationsProvider>
        </SocketProvider>
      </ContactsProvider> 
    </UserInfoContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


