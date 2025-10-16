import React, {useEffect, useRef} from "react";
import {useChat} from "../../context/ChatContext";
import MessageBubble from "../MessageBubble/MessageBubble";
import TypingIndicator from "../TypingIndicator/TypingIndicator";
import DateSeparator from "../DateSeparator/DateSeparator";
import styles from "./MessagesList.module.scss";

const MessagesList = ({messages}) => {
  const {currentUser, typingUsers} = useChat();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingUsers]);

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

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className={styles.messagesList}>
      <div className={styles.messagesContainer}>
        {messageGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <DateSeparator date={group.date} />
            {group.messages.map((message, messageIndex) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwn={message.senderId === currentUser.id}
                showAvatar={
                  messageIndex === 0 ||
                  group.messages[messageIndex - 1].senderId !== message.senderId
                }
              />
            ))}
          </div>
        ))}

        {typingUsers.length > 0 && <TypingIndicator users={typingUsers} />}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessagesList;
