import React, {useState, useEffect} from "react";
import {ChatProvider} from "../../context/ChatContext";
import ConversationList from "../ConversationList/ConversationList";
import ChatArea from "../ChatArea/ChatArea";
import styles from "./Chat.module.scss";
import {useSelector} from "react-redux";
import axios from "axios";
import {useSocket, useSocketConnection} from "@context/SocketProvider";

const Chat = () => {
  const socket = useSocket();
  const {isConnected, connectionError} = useSocketConnection();
  const [rooms, setRooms] = useState([]);
  const [conversation, setConversation] = useState(null);
  const userId = useSelector((state) => state.auth.userId);
  const loginUser = useSelector((state) => state.auth.user_data?.login);

  console.log("🔍 Chat Debug:", {
    socket: socket ? "✅ Socket exists" : "❌ Socket is null",
    isConnected,
    connectionError,
    userId,
    loginUser,
  });

  const getRooms = async () => {
    try {
      const response = await axios.get(
        `https://chat-service.u-code.io/v1/room?row_id=${userId}&offset=0&limit=100`
      );
      setRooms(response.data.body?.rooms);
      console.log("Rooms fetched:", response.data.body?.rooms);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

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
      content: content,
      from: loginUser,
      type: "text",
      timestamp: new Date().toISOString(),
    };

    console.log("📤 Sending message:", messageData);
    socket.emit("chat message", messageData);
  };

  const handleConversationSelect = (selectedConversation) => {
    setConversation(selectedConversation);
  };

  useEffect(() => {
    getRooms();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("test", {message: "Hello from client"});

      socket.on("test_response", (data) => {
        console.log("✅ Socket test response:", data);
      });
    }
  }, [socket]);

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
