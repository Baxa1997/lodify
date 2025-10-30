import React, {useEffect, useState} from "react";
import {useChat} from "../../context/ChatContext";
import ConversationItem from "../ConversationItem/ConversationItem";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./ConversationList.module.scss";
import {Button, Flex, Box} from "@chakra-ui/react";
import AddingChat from "./AddingChat";

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
  } = useChat();

  const getFilteredRooms = () => {
    return (
      rooms?.filter((room) =>
        room?.to_name?.toLowerCase().includes(searchQuery.toLowerCase())
      ) || []
    );
  };

  const filteredRooms = getFilteredRooms();

  return (
    <div className={styles.conversationList}>
      {/* <div className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>Chats</h2>
            {isConnected && (
              <div className={styles.connectionStatus}>
                <div className={styles.statusDot}></div>
              </div>
            )}
          </div>
          <button
            className={styles.addButton}
            onClick={() => {
              setIsAddRoomOpen(true);
            }}
            title="New Chat">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
          </button>
        </div>

        <div className={styles.searchContainer}>
          <SearchBar value={searchQuery} onSearch={setSearchQuery} />
        </div>
      </div> */}

      <Flex p="9px 16px 9px 11px" gap="8px">
        <AddingChat setIsAddRoomOpen={setIsAddRoomOpen} />
        <SearchBar
          p="0"
          value={searchQuery}
          onSearch={setSearchQuery}
          inputBorderRadius="25px"
          showKeyboardShortcut={false}
        />
      </Flex>

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
            <div className={styles.emptyIcon}>💬</div>
            <p className={styles.emptyMessage}>
              {searchQuery ? "No chats found" : "No chats yet"}
            </p>
            <p className={styles.emptySubMessage}>
              {searchQuery
                ? "Try a different search term"
                : "Start a new conversation"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
