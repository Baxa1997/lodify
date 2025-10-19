import React from "react";
import {useChat} from "../../context/ChatContext";
import {mockUsers} from "../../data/mockData";
import styles from "./MessageBubble.module.scss";
import {Flex, Box, Text} from "@chakra-ui/react";

const MessageBubble = ({message, isOwn, showAvatar}) => {
  const {addReaction} = useChat();
  const {
    message: content,
    created_at,
    type,
    fileInfo,
    reactions,
    senderId,
  } = message;

  const sender = mockUsers[senderId] || {
    name: "Unknown",
    avatar: "/img/avatars/default.jpg",
  };
  const messageTime = new Date(created_at).toLocaleTimeString([], {
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

  return isOwn ? (
    <>
      <Flex justifyContent="flex-end" p="12px 0" gap={"12px"}>
        <Box w="500px">
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontWeight="500" color="#181D27" fontSize="14px">
              You
            </Text>
            <Text fontWeight={400} color="#535862" fontSize="12px">
              {created_at}
            </Text>
          </Flex>

          <Box
            bg="#EF6820"
            mt="6px"
            color="#fff"
            borderRadius="8px"
            borderTopRightRadius="0"
            border="1px solid #E9EAEB"
            p="10px 14px">
            {renderMessageContent()}
          </Box>
        </Box>
      </Flex>
    </>
  ) : (
    <Flex p="12px 0" gap={"12px"}>
      <Box w="40px" h="40px" borderRadius="50%" overflow="hidden">
        <img src={"/img/chatAvatar.svg"} alt={sender.name} />
      </Box>

      <Box w="500px">
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="500" color="#181D27">
            {sender?.name}
          </Text>
          <Text fontWeight={400} color="#535862" fontSize="12px">
            {messageTime}
          </Text>
        </Flex>

        <Box
          mt="6px"
          borderRadius="8px"
          borderTopLeftRadius="0"
          border="1px solid #E9EAEB"
          p="10px 14px">
          {renderMessageContent()}
        </Box>
      </Box>
    </Flex>
  );
};

export default MessageBubble;
