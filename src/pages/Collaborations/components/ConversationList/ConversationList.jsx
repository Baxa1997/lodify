import React from "react";
import {useChat} from "../../context/ChatContext";
import ConversationItem from "../ConversationItem/ConversationItem";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./ConversationList.module.scss";

const ConversationList = ({
  rooms = [],
  setConversation,
  isConnected,
  setIsAddRoomOpen = () => {},
}) => {
  const {
    selectedConversationId,
    selectConversation,
    searchQuery,
    setSearchQuery,
    isEditing,
    toggleEditMode,
  } = useChat();

  const getFilteredRooms = () => {
    return (
      rooms?.filter((room) =>
        room?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      ) || []
    );
  };

  const filteredRooms = getFilteredRooms();

  return (
    <div className={styles.conversationList}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Collabration</h2>
          <div className={styles.count}>{filteredRooms.length}</div>
          {isConnected && (
            <div className={styles.connectionStatus}>
              <div className={styles.statusDot}></div>
              <span>Connected</span>
            </div>
          )}
        </div>
        <button
          className={styles.editButton}
          onClick={() => {
            setIsAddRoomOpen(true);
          }}>
          <img src="/img/chatNewChat.svg" alt="" />
        </button>
      </div>

      <SearchBar value={searchQuery} onSearch={setSearchQuery} bg="#fff" />

      <div className={styles.conversations}>
        {filteredRooms?.length > 0 ? (
          filteredRooms.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isSelected={conversation.id === selectedConversationId}
              onClick={() => {
                selectConversation(conversation.id);
                setConversation(conversation);
              }}
              isEditing={isEditing}
              isConnected={isConnected}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.emptyMessage}>
              {searchQuery
                ? "No rooms found matching your search"
                : "No rooms available"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
