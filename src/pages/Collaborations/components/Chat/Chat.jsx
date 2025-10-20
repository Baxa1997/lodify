import React, {useState, useEffect} from "react";
import {ChatProvider} from "../../context/ChatContext";
import ConversationList from "../ConversationList/ConversationList";
import ChatArea from "../ChatArea/ChatArea";
import styles from "./Chat.module.scss";
import {useSelector} from "react-redux";
import {useSocket, useSocketConnection} from "@context/SocketProvider";

const Chat = () => {
  const socket = useSocket();
  const {isConnected, connectionError} = useSocketConnection();
  const [rooms, setRooms] = useState([]);
  const [conversation, setConversation] = useState(null);

  const userId = useSelector((state) => state.auth.userId);
  const loginUser = useSelector((state) => state.auth.user_data?.login);

  console.log("🔍 Chat Debug:", {
    socket: socket ? "Socket exists" : "❌ Socket is null",
    isConnected,
    connectionError,
    userId,
    loginUser,
  });

  useEffect(() => {
    if (!socket || !isConnected || !userId) return;
    socket.emit("rooms list", {row_id: userId});

    const handleRoomsList = (data) => {
      setRooms(data || []);
    };

    socket.on("rooms list", handleRoomsList);

    return () => {
      socket.off("rooms list", handleRoomsList);
    };
  }, [socket, isConnected, userId]);

  const sendMessage = (content) => {
    if (!conversation?.id || !loginUser) {
      console.error("Cannot send message: missing conversation or user");
      return;
    }

    if (!isConnected) {
      console.error("Cannot send message: socket not connected");
      return;
    }

    const messageData = {
      room_id: conversation.id,
      content,
      from: loginUser,
      type: "text",
      timestamp: new Date().toISOString(),
    };

    socket.emit("chat message", messageData);
  };

  const handleConversationSelect = (selectedConversation) => {
    setConversation(selectedConversation);
  };

  return (
    <ChatProvider>
      <div className={styles.chatContainer}>
        <ConversationList
          rooms={rooms}
          setConversation={handleConversationSelect}
          isConnected={isConnected}
        />
        <ChatArea
          conversation={conversation}
          onSendMessage={sendMessage}
          isConnected={isConnected}
        />
      </div>
    </ChatProvider>
  );
};

export default Chat;
