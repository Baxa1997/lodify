import React, {useState, useEffect} from "react";
import {ChatProvider} from "../../context/ChatContext";
import ConversationList from "../ConversationList/ConversationList";
import ChatArea from "../ChatArea/ChatArea";
import styles from "./Chat.module.scss";

const Chat = () => {
  return (
    <ChatProvider>
      <div className={styles.chatContainer}>
        <ConversationList />
        <ChatArea />
      </div>
    </ChatProvider>
  );
};

export default Chat;
