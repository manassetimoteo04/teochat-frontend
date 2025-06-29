/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const ConversationContext = createContext();
export const data = [
  {
    id: 1,
    text: "Bom dia, Timóteo! Já estás pronto pra apresentação?",
    sendAt: "2025-06-23T08:00:00.000Z",
    sended: true,
    senderId: "user_maria",
    receiverId: "user_timoteo",
    read: true,
    type: "text",
    status: "read",
    edited: false,
    isMine: false,
  },
  {
    id: 2,
    text: "Bom dia! Estou quase, só tô a revisar os últimos slides.",
    sendAt: "2025-06-23T08:05:15.000Z",
    sended: true,
    senderId: "user_timoteo",
    receiverId: "user_maria",
    read: true,
    type: "text",
    status: "read",
    edited: false,
    isMine: true,
  },
  {
    id: 3,
    text: "Boa! Não te esqueças de falar da parte do cronograma.",
    sendAt: "2025-06-24T08:01:45.000Z",
    sended: true,
    senderId: "user_maria",
    receiverId: "user_timoteo",
    read: true,
    type: "text",
    status: "read",
    edited: false,
    isMine: false,
  },
  {
    id: 4,
    text: "Sim, já adicionei isso ontem. Obrigado por lembrar!",
    sendAt: "2025-06-24T08:22:10.000Z",
    sended: true,
    senderId: "user_timoteo",
    receiverId: "user_maria",
    read: true,
    type: "text",
    status: "read",
    edited: false,
    isMine: true,
  },
  {
    id: 5,
    text: "Qual sala mesmo vai ser a apresentação?",
    sendAt: "2025-06-24T08:03:00.000Z",
    sended: true,
    senderId: "user_timoteo",
    receiverId: "user_maria",
    read: false,
    type: "text",
    status: "sent",
    edited: false,
    isMine: true,
  },
  {
    id: 6,
    text: "Na 204! Vamos nos encontrar 10 minutos antes lá, ok?",
    sendAt: "2025-06-26T08:03:45.000Z",
    sended: true,
    senderId: "user_maria",
    receiverId: "user_timoteo",
    read: false,
    type: "text",
    status: "delivered",
    edited: false,
    isMine: false,
  },
  {
    id: 6,
    text: "Na 204! Vamos nos encontrar 10 minutos antes lá, ok?",
    sendAt: "2025-06-27T08:03:45.000Z",
    sended: true,
    senderId: "user_maria",
    receiverId: "user_timoteo",
    read: false,
    type: "text",
    status: "delivered",
    edited: false,
    isMine: false,
  },
  {
    id: 1,
    text: "Bom dia, Timóteo! Já estás pronto pra apresentação?",
    sendAt: "2025-06-27T08:00:00.000Z",
    sended: true,
    senderId: "user_maria",
    receiverId: "user_timoteo",
    read: true,
    type: "text",
    status: "read",
    edited: false,
    isMine: false,
  },
  {
    id: 2,
    text: "Bom dia! Estou quase, só tô a revisar os últimos slides.",
    sendAt: "2025-06-28T08:01:15.000Z",
    sended: true,
    senderId: "user_timoteo",
    receiverId: "user_maria",
    read: true,
    type: "text",
    status: "read",
    edited: false,
    isMine: true,
  },
  {
    id: 3,
    text: "Boa! Não te esqueças de falar da parte do cronograma.",
    sendAt: "2025-06-28T08:01:45.000Z",
    sended: true,
    senderId: "user_maria",
    receiverId: "user_timoteo",
    read: true,
    type: "text",
    status: "read",
    edited: false,
    isMine: false,
  },
  {
    id: 4,
    text: "Sim, já adicionei isso ontem. Obrigado por lembrar!",
    sendAt: "2025-06-28T08:02:10.000Z",
    sended: true,
    senderId: "user_timoteo",
    receiverId: "user_maria",
    read: true,
    type: "text",
    status: "read",
    edited: false,
    isMine: true,
  },
  {
    id: 5,
    text: "Qual sala mesmo vai ser a apresentação?",
    sendAt: "2025-06-29T08:03:00.000Z",
    sended: true,
    senderId: "user_timoteo",
    receiverId: "user_maria",
    read: false,
    type: "text",
    status: "sent",
    edited: false,
    isMine: true,
  },
  {
    id: 6,
    text: "Na 204! Vamos nos encontrar 10 minutos antes lá, ok?",
    sendAt: "2025-06-29T08:03:45.000Z",
    sended: true,
    senderId: "user_maria",
    receiverId: "user_timoteo",
    read: false,
    type: "text",
    status: "delivered",
    edited: false,
    isMine: false,
  },
  {
    id: 6,
    text: "Na 204! Vamos nos encontrar 10 minutos antes lá, ok?",
    sendAt: "2025-06-29T08:03:45.000Z",
    sended: true,
    senderId: "user_maria",
    receiverId: "user_timoteo",
    read: false,
    type: "text",
    status: "delivered",
    edited: false,
    isMine: false,
  },
];
export function ConversationContextProvider({ children }) {
  const [currentConversation, setCurrentConversation] = useState(null);
  const [conversationDetails, setConversationDetails] = useState(false);
  const [conversation, setConversation] = useState(data);

  function addMessage(msg) {
    setConversation([...conversation, msg]);
  }
  return (
    <ConversationContext.Provider
      value={{
        currentConversation,
        conversationDetails,
        setCurrentConversation,
        setConversationDetails,
        conversation,
        addMessage,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}

export const useCurrentConversation = () => {
  const context = useContext(ConversationContext);
  if (!context) throw new Error("A Context was user ouside the provider");
  return context;
};
