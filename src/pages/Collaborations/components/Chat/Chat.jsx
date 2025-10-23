import React, {useState, useEffect} from "react";
import {ChatProvider} from "../../context/ChatContext";
import ConversationList from "../ConversationList/ConversationList";
import ChatArea from "../ChatArea/ChatArea";
import styles from "./Chat.module.scss";
import {useSelector} from "react-redux";
import {useSocket, useSocketConnection} from "@context/SocketProvider";
import AddRoom from "../AddRoom";
import {useLocation} from "react-router-dom";

const Chat = () => {
  const {state: locationState} = useLocation();
  const socket = useSocket();
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const {isConnected, connectionError} = useSocketConnection();
  const [rooms, setRooms] = useState([]);
  const [conversation, setConversation] = useState(null);

  const userId = useSelector((state) => state.auth.userInfo?.id);
  const loginUser = useSelector((state) => state.auth.user_data?.login);
  console.log("locationlocation", locationState);
  useEffect(() => {
    if (!socket || !isConnected || !userId) return;
    socket.emit("rooms list", {row_id: userId});

    const handleRoomsList = (data) => {
      setRooms(data || []);
    };

    const handleError = (error) => {
      console.error("Socket error received:", error);
    };

    const handleMessageSent = (data) => {
      console.log("Message sent confirmation:", data);
    };

    socket.on("rooms list", handleRoomsList);
    socket.on("error", handleError);
    socket.on("message sent", handleMessageSent);

    return () => {
      socket.off("rooms list", handleRoomsList);
      socket.off("error", handleError);
      socket.off("message sent", handleMessageSent);
    };
  }, [socket, isConnected, userId]);

  const sendMessage = (content, type = "text", fileInfo = null) => {
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
      type: type,
      timestamp: new Date().toISOString(),
      file: fileInfo?.url,
    };

    socket.emit("chat message", messageData, (response) => {
      if (response && response.error) {
        console.error("Server error response:", response.error);
      } else {
        console.log("Server success response:", response);
      }
    });

    console.log("9. Socket emit completed");
  };

  const handleConversationSelect = (selectedConversation) => {
    setConversation(selectedConversation);
  };

  return (
    <ChatProvider>
      <div className={styles.chatContainer}>
        <ConversationList
          setIsAddRoomOpen={setIsAddRoomOpen}
          rooms={rooms}
          setConversation={handleConversationSelect}
          isConnected={isConnected}
        />
        <ChatArea
          rooms={rooms}
          setIsAddRoomOpen={setIsAddRoomOpen}
          conversation={conversation}
          onSendMessage={sendMessage}
          isConnected={isConnected}
        />

        <AddRoom
          isOpen={isAddRoomOpen}
          onClose={() => setIsAddRoomOpen(false)}
          text="Add Chat"
        />
      </div>
    </ChatProvider>
  );
};

export default Chat;
