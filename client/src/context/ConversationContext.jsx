import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useContacts } from './ContactsContext';
import { useSocket } from './SocketContext';
import { UserInfoContext } from './UserInfoContext';

const ConversationsContext = createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export const ConversationsProvider = ({ children }) => {
  const [conversations, setConversations] = useState(
    () => JSON.parse(window.localStorage.getItem('conversations')) || []
  );
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const [id, setId] = useState();

  useEffect(() => {
    console.log(conversations);
    // createConversation('dsf');
    if (userInfo) {
      setId(userInfo.email);
    }
    window.localStorage.setItem('conversations', JSON.stringify(conversations));
  }, [conversations]);

  const [selectConversationIndex, setSelectConversationIndex] = useState(0);
  const { contacts } = useContacts();
  // const { channelId } = useContacts();
  // const { userId } = useContacts();
  // const channelIdKeys = Object.keys(channelId)
  // const userIdKeys = Object.keys(userId)

  const socket = useSocket();

  function createConversation(recipients) {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  }

  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }) => {
      setConversations((prevConversations) => {
        let madeChange = false;
        const newMessage = { sender, text };
        const newConversations = prevConversations.map((conversation) => {
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }
          return conversation;
        });

        if (madeChange) {
          return newConversations;
        } else {
          return [...prevConversations, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );
  // 메세지를 보내면 아래형식으로 보내지고 addMessageToConversation에 기록됨
  function sendMessage(recipients, text) {
    socket.emit('direct-message', { recipients, text });
    addMessageToConversation({ recipients, text, sender: id });
  }

  useEffect(() => {
    if (socket === undefined) return;

    socket.on('direct-message', addMessageToConversation);

    return () => socket.off('direct-message');
  }, [socket, addMessageToConversation]);

  const formattedConversations = conversations.map((conversation, index) => {
    // const recipients = conversation.recipients.map((recipient) => {
    //   const contact = contacts.find((contact) => {
    //     return contact.id === recipient;
    //   });
    //   const name = (contact && contact.name) || recipient;
    //   return { id: recipient, name };
    // });
    const recipients = conversation.recipients;
    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });
      const name = (contact && contact.name) || message.sender;
      const fromMe = id === message.sender;
      return { ...message, senderName: name, fromMe };
    });
    const selected = index === selectConversationIndex;
    return { ...conversation, messages, recipients, selected };
  });

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectConversationIndex,
    createConversation,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};

function arrayEquality(a, b) {
  if (a !== b) return false;
  else return true;
}
