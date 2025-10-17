import React, {useState, useEffect} from "react";
import {ChatProvider} from "../../context/ChatContext";
import ConversationList from "../ConversationList/ConversationList";
import ChatArea from "../ChatArea/ChatArea";
import styles from "./Chat.module.scss";
import {io} from "socket.io-client";
import {useSelector} from "react-redux";
import axios from "axios";
import {useSocket} from "@hooks/useSocket";

const Chat = () => {
  // const socket = io("https://chat-service.u-code.io", {
  //   transports: ["websocket"],
  //   reconnection: true,
  //   reconnectionAttempts: Infinity,
  //   reconnectionDelay: 1000,
  //   reconnectionDelayMax: 5000,
  //   timeout: 20000,
  //   autoConnect: true,
  //   withCredentials: true,
  // });
  const socket = useSocket();
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [lastPong, setLastPong] = useState(null);
  const userId = useSelector((state) => state.auth.userId);
  const [conversation, setConversation] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  useEffect(() => {
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  useEffect(() => {
    socket.on("pong", (pong) => {
      setLastPong(pong);
    });
  }, []);

  const getRooms = async () => {
    try {
      const response = await axios.get(
        `https://chat-service.u-code.io/v1/room?row_id=${userId}&offset=0&limit=100`
      );
      setRooms(response.data.body?.rooms);
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <ChatProvider>
      <div className={styles.chatContainer}>
        <ConversationList rooms={rooms} setConversation={setConversation} />
        <ChatArea conversation={conversation} />
      </div>
    </ChatProvider>
  );
};

export default Chat;
