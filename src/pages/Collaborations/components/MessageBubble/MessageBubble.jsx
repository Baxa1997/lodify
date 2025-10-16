import React from "react";
import {useChat} from "../../context/ChatContext";
import {mockUsers} from "../../data/mockData";
import styles from "./MessageBubble.module.scss";

const MessageBubble = ({message, isOwn, showAvatar}) => {
  const {addReaction} = useChat();
  const {content, timestamp, type, fileInfo, reactions, senderId} = message;

  const sender = mockUsers[senderId] || {
    name: "Unknown",
    avatar: "/img/avatars/default.jpg",
  };
  const messageTime = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleReaction = (emoji) => {
    addReaction(message.id, emoji);
  };

  const renderMessageContent = () => {
    if (type === "file" && fileInfo) {
      return (
        <div className={styles.fileMessage}>
          <div className={styles.fileIcon}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 3C3.44772 3 3 3.44772 3 4V16C3 16.5523 3.44772 17 4 17H16C16.5523 17 17 16.5523 17 16V6L13 2H4Z"
                stroke="#EF4444"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13 2V6H17"
                stroke="#EF4444"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={styles.fileInfo}>
            <div className={styles.fileName}>{fileInfo.name}</div>
            <div className={styles.fileSize}>{fileInfo.size}</div>
          </div>
        </div>
      );
    }

    return <div className={styles.textContent}>{content}</div>;
  };

  return (
    <div
      className={`${styles.messageContainer} ${
        isOwn ? styles.ownMessage : styles.otherMessage
      }`}>
      {!isOwn && showAvatar && (
        <img src={sender.avatar} alt={sender.name} className={styles.avatar} />
      )}

      <div className={styles.messageWrapper}>
        <div
          className={`${styles.messageBubble} ${
            isOwn ? styles.ownBubble : styles.otherBubble
          }`}>
          {renderMessageContent()}

          {reactions && reactions.length > 0 && (
            <div className={styles.reactions}>
              {reactions.map((reaction) => (
                <span key={reaction.id} className={styles.reaction}>
                  {reaction.emoji}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className={styles.messageActions}>
          <button
            className={styles.reactionButton}
            onClick={() => handleReaction("❤️")}
            title="Add reaction">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 14.5C8 14.5 1 9.5 1 5.5C1 3.5 2.5 2 4.5 2C5.5 2 6.5 2.5 7 3.5C7.5 2.5 8.5 2 9.5 2C11.5 2 13 3.5 13 5.5C13 9.5 8 14.5 8 14.5Z"
                fill="#6B7280"
              />
            </svg>
          </button>

          <span className={styles.timestamp}>{messageTime}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
