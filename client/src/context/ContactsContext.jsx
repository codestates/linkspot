import React, { createContext, useContext, useState, useEffect } from 'react';

const ContactsContext = createContext();

export function useContacts() {
  return useContext(ContactsContext);
}

export const ContactsProvider = ({ children }) => {
  const [messages, setMessages] = useState(
    () => JSON.parse(window.localStorage.getItem('contact')) || {}
  );
  const createContact = (id, message) => {
    if (!message) {
      const obj = { ...messages };
      obj[id] = {};
      return setMessages({ ...obj });
    }
    const creatTime = message.createdAt;
    const text = message.text;

    if (!messages[id]) {
      const obj2 = { ...messages };
      obj2[id] = {};

      obj2[id][creatTime] = text;
      console.log(obj2);
      return setMessages({ ...obj2 });
    } else {
      const obj2 = { ...messages };
      obj2[id][creatTime] = text;

      return setMessages({ ...obj2 });
    }
  };
  useEffect(() => {
    window.localStorage.setItem('contact', JSON.stringify(messages));
  }, [messages]);

  return (
    <ContactsContext.Provider value={{ messages, createContact, setMessages }}>
      {children}
    </ContactsContext.Provider>
  );
};
