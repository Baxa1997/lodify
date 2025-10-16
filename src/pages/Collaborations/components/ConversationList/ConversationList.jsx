import React from "react";
import {useChat} from "../../context/ChatContext";
import ConversationItem from "../ConversationItem/ConversationItem";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./ConversationList.module.scss";

const ConversationList = () => {
  const {
    getFilteredConversations,
    selectedConversationId,
    selectConversation,
    searchQuery,
    setSearchQuery,
    isEditing,
    toggleEditMode,
  } = useChat();

  const conversations = getFilteredConversations();

  return (
    <div className={styles.conversationList}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Collabration</h2>
          <div className={styles.count}>40</div>
        </div>
        <button className={styles.editButton} onClick={toggleEditMode}>
          <img src="/img/chatNewChat.svg" alt="" />
        </button>
      </div>

      <SearchBar value={searchQuery} onSearch={setSearchQuery} bg="#fff" />

      <div className={styles.conversations}>
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isSelected={conversation.id === selectedConversationId}
            onClick={() => selectConversation(conversation.id)}
            isEditing={isEditing}
          />
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
