import React, {useEffect, useRef, useState} from "react";
import {useChat} from "../../context/ChatContext";
import MessageBubble from "../MessageBubble/MessageBubble";
import DateSeparator from "../DateSeparator/DateSeparator";
import styles from "./MessagesList.module.scss";
import {useSocket} from "@hooks/useSocket";
import {useSelector} from "react-redux";

const MessagesList = ({conversation, isConnected}) => {
  const {currentUser} = useChat();
  const socket = useSocket();
  const messagesEndRef = useRef(null);
  const [localMessages, setLocalMessages] = useState([]);
  const [isNewMessage, setIsNewMessage] = useState(false);
  const loggedInUser = useSelector((state) => state.auth.user_data?.login);
  const userId = useSelector((state) => state.auth.userId);
  const prevMessageCountRef = useRef(0);

  const scrollToBottom = (behavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({behavior});
  };

  useEffect(() => {
    if (localMessages.length > prevMessageCountRef.current) {
      setIsNewMessage(true);
      scrollToBottom("smooth");

      setTimeout(() => setIsNewMessage(false), 1000);
    }
    prevMessageCountRef.current = localMessages.length;
  }, [localMessages]);

  useEffect(() => {
    scrollToBottom("auto");
  }, [conversation?.id]);

  // Set up socket listeners FIRST (only once)
  useEffect(() => {
    if (!socket) return;

    const handleRoomHistory = (messages) => {
      console.log("📜 Room history received:", messages);

      if (Array.isArray(messages)) {
        setLocalMessages(messages);
        console.log("💬 Loaded", messages.length, "messages from history");
      } else if (messages?.data && Array.isArray(messages.data)) {
        setLocalMessages(messages.data);
      } else {
        console.warn("⚠️ Unexpected room history format:", messages);
      }
    };

    const handleReceiveMessage = (message) => {
      console.log("📨 LIVE MESSAGE RECEIVED:", message);

      setLocalMessages((prevMessages) => {
        // Check if message already exists
        const messageExists = prevMessages.some(
          (msg) =>
            msg.id === message.id ||
            msg._id === message._id ||
            (msg.content === message.content &&
              msg.from === message.from &&
              Math.abs(
                new Date(msg.timestamp || msg.created_at || Date.now()) -
                  new Date(
                    message.timestamp || message.created_at || Date.now()
                  )
              ) < 2000)
        );

        if (messageExists) {
          console.log("⚠️ Duplicate message, skipping");
          return prevMessages;
        }

        console.log("✅ Adding NEW LIVE message to chat!");
        return [...prevMessages, message];
      });
    };

    // Register listeners
    socket.on("room history", handleRoomHistory);
    socket.on("receive message", handleReceiveMessage);

    console.log("✅ Socket listeners registered");

    return () => {
      socket.off("room history", handleRoomHistory);
      socket.off("receive message", handleReceiveMessage);
    };
  }, [socket]);

  // Join room when conversation changes
  useEffect(() => {
    if (!socket || !conversation?.id || !userId) return;

    console.log("🚪 Joining room:", conversation.id, "with user:", userId);

    // Clear messages when switching rooms
    setLocalMessages([]);

    // Join the room
    socket.emit("join room", {
      room_id: conversation.id,
      row_id: userId,
    });

    return () => {
      console.log("👋 Leaving room:", conversation.id);
      socket.emit("leave room", {room_id: conversation.id});
    };
  }, [socket, conversation?.id, userId]);

  const groupMessagesByDate = (messages) => {
    const groups = [];
    let currentGroup = [];
    let currentDate = null;

    messages.forEach((message, index) => {
      const messageDate = new Date(message.timestamp).toDateString();

      if (currentDate !== messageDate) {
        if (currentGroup.length > 0) {
          groups.push({
            date: currentDate,
            messages: currentGroup,
          });
        }
        currentGroup = [message];
        currentDate = messageDate;
      } else {
        currentGroup.push(message);
      }
    });

    if (currentGroup.length > 0) {
      groups.push({
        date: currentDate,
        messages: currentGroup,
      });
    }

    return groups;
  };

  const messageGroups = groupMessagesByDate(localMessages);
  console.log("messageGroups:", messageGroups);

  if (!isConnected) {
    return (
      <div className={styles.messagesList}>
        <div className={styles.connectionStatus}>
          <div className={styles.statusIcon}>⚠️</div>
          <p>Connecting to chat server...</p>
        </div>
      </div>
    );
  }

  if (!conversation?.id) {
    return (
      <div className={styles.messagesList}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>💬</div>
          <h3>Select a conversation</h3>
          <p>Choose a room to start chatting</p>
        </div>
      </div>
    );
  }

  if (localMessages.length === 0) {
    return (
      <div className={styles.messagesList}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>💬</div>
          <h3>No messages yet</h3>
          <p>Start the conversation by sending a message</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.messagesList}>
      <div className={styles.messagesContainer}>
        {messageGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <DateSeparator date={group.date} />
            {group.messages.map((message, messageIndex) => (
              <MessageBubble
                key={message.id || messageIndex}
                message={message}
                isOwn={message.from === loggedInUser}
                showAvatar={
                  messageIndex === 0 ||
                  group.messages[messageIndex - 1].senderId !== message.senderId
                }
              />
            ))}
          </div>
        ))}

        {/* {typingUsers.length > 0 && <TypingIndicator users={typingUsers} />} */}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessagesList;
