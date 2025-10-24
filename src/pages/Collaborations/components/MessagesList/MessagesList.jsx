import React, {useEffect, useRef, useState} from "react";
import MessageBubble from "../MessageBubble/MessageBubble";
import DateSeparator from "../DateSeparator/DateSeparator";
import styles from "./MessagesList.module.scss";
import {useSocket} from "@context/SocketProvider";
import {useSelector} from "react-redux";

const MessagesList = ({rooms = [], conversation, isConnected}) => {
  const socket = useSocket();
  const messagesEndRef = useRef(null);
  const [localMessages, setLocalMessages] = useState([]);
  const [isNewMessage, setIsNewMessage] = useState(false);
  const loggedInUser = useSelector((state) => state.auth.user_data?.login);
  const userId = useSelector((state) => state.auth.userInfo?.id);
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

  useEffect(() => {
    if (!socket) return;

    const handleRoomHistory = (messages) => {
      if (Array.isArray(messages)) {
        setLocalMessages(messages);
      } else if (messages?.data && Array.isArray(messages.data)) {
        setLocalMessages(messages.data);
      } else {
        console.warn("⚠️ Unexpected room history format:", messages);
      }
    };

    const handleReceiveMessage = (message) => {
      console.log("messagemessage", message);
      if (message.room_id === conversation?.id) {
        console.log("Received message for current room:", message);
        setLocalMessages((prevMessages) => [...prevMessages, message]);
      } else {
        console.log("Received message for different room, ignoring:", {
          messageRoomId: message.room_id,
          currentRoomId: conversation?.id,
          message: message,
        });
      }
    };
    socket.on("room history", handleRoomHistory);
    socket.on("chat message", handleReceiveMessage);

    return () => {
      socket.off("room history", handleRoomHistory);
      socket.off("chat message", handleReceiveMessage);
    };
  }, [socket, conversation?.id]);

  useEffect(() => {
    if (!socket || !conversation?.id || !userId) return;

    console.log("Joining room:", {
      roomId: conversation.id,
      userId: userId,
      conversation: conversation,
    });

    setLocalMessages([]);

    socket.emit("join room", {
      room_id: conversation.id,
      row_id: userId,
    });
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
          <div key={`${group.date}-${groupIndex}`}>
            <DateSeparator date={group.date} />
            {group.messages.map((message, messageIndex) => (
              <MessageBubble
                conversation={conversation}
                rooms={rooms}
                key={`${message.id || message._id || messageIndex}-${
                  message.type || "text"
                }-${message.timestamp}`}
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

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessagesList;
