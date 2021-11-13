import React, { createContext, useContext, useState } from 'react';

const ContactsContext = createContext();

export function useContacts() {
  return useContext(ContactsContext);
}

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contact')) || []
  );

  function createContact(id, message) {
    const creatTime = message.createdAt;
    const text = message.text;
    const prevValue = JSON.parse(window.localStorage.getItem(id));
    console.log(creatTime);
    if (!prevValue) {
      const obj = {};
      obj[creatTime] = text;
      window.localStorage.setItem(id, JSON.stringify(obj));
    } else {
      prevValue[creatTime] = text;
      window.localStorage.setItem(id, JSON.stringify(prevValue));
    }
  }

  return (
    <ContactsContext.Provider value={{ contacts, createContact, setContacts }}>
      {children}
    </ContactsContext.Provider>
  );
};
