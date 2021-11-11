import React, { createContext, useContext, useState, useEffect } from 'react';

const ContactsContext = createContext();

export function useContacts() {
  return useContext(ContactsContext);
}

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) || []
  );
  const [channelId, setChannelId] = useState(
    () => JSON.parse(window.localStorage.getItem('channelId')) || {}
  );
  const [userId, setUserId] = useState(
    () => JSON.parse(window.localStorage.getItem('userId')) || {}
  );

  useEffect(() => {
    window.localStorage.setItem('channelId', JSON.stringify(channelId));
    window.localStorage.setItem('userId', JSON.stringify(userId));
  }, [channelId, userId]);

  function createChannelId(id, name) {
    const newObj = channelId;
    newObj[id] = id; //{'id':id, }
    setChannelId(newObj);
  }
  function createUserId(id, name) {
    const newObj = userId;
    newObj[id] = id;
    setUserId(newObj);
  }

  return (
    <ContactsContext.Provider
      value={{ contacts, channelId, createChannelId, userId, createUserId }}
    >
      {children}
    </ContactsContext.Provider>
  );
};
