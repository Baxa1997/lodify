import React from "react";
import {useChat} from "../../context/ChatContext";
import ChatHeader from "../ChatHeader/ChatHeader";
import MessagesList from "../MessagesList/MessagesList";
import MessageInput from "../MessageInput/MessageInput";
import styles from "./ChatArea.module.scss";

const ChatArea = ({conversation}) => {
  if (!conversation?.id) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyContent}>
          <svg
            style={{
              margin: "0 auto",
            }}
            className={styles.emptyIcon}
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none">
            <path
              d="M32 8C18.745 8 8 18.745 8 32s10.745 24 24 24 24-10.745 24-24S45.255 8 32 8zM32 48c-8.837 0-16-7.163-16-16s7.163-16 16-16 16 7.163 16 16-7.163 16-16 16z"
              fill="#E5E7EB"
            />
            <path d="M24 24h16v16H24V24z" fill="#9CA3AF" />
          </svg>
          <h3 className={styles.emptyTitle}>Select a conversation</h3>
          <p className={styles.emptyDescription}>
            Choose a conversation from the sidebar to start chatting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.chatArea}>
      <ChatHeader conversation={conversation} />
      <MessagesList conversation={conversation} />
      <MessageInput />
    </div>
  );
};

export default ChatArea;
