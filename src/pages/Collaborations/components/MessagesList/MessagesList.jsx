import React, {useEffect, useRef, useState} from "react";
import {useChat} from "../../context/ChatContext";
import MessageBubble from "../MessageBubble/MessageBubble";
import DateSeparator from "../DateSeparator/DateSeparator";
import styles from "./MessagesList.module.scss";
import {useSocket} from "@hooks/useSocket";
import {useSelector} from "react-redux";

const MessagesList = ({conversation, messages = [], isConnected}) => {
  const {getCurrentMessages, currentUser} = useChat();
  const messagesEndRef = useRef(null);
  const [localMessages, setLocalMessages] = useState([]);
  const socket = useSocket();
  const userId = useSelector((state) => state.auth.userId);
  const loggedInUser = useSelector((state) => state.auth.user_data?.login);

  useEffect(() => {
    if (messages && messages.length > 0) {
      setLocalMessages(messages);
    } else {
      setLocalMessages(getCurrentMessages(conversation?.id));
    }
  }, [conversation?.id, messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
  };

  useEffect(() => {
    scrollToBottom();
  }, [localMessages]);

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

  useEffect(() => {
    if (!conversation?.id || !userId) return;

    socket.emit("join room", {room_id: conversation.id, row_id: userId});

    socket.on("room history", (messages) => {
      console.log("📜 Room history:", messages);
      setLocalMessages(messages);
    });

    socket.on("receive message", (message) => {
      console.log("📨 New live message:", message);

      if (message.room_id === conversation.id) {
        setLocalMessages((prev) => [...prev, message]);
      }
    });

    socket.onAny((event, data) => console.log("⚡ Event:", event, data));

    return () => {
      socket.off("room history");
      socket.off("receive message");
      socket.offAny();
    };
  }, [conversation?.id, userId]);

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
