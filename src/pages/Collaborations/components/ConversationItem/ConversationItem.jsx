import React from "react";
import styles from "./ConversationItem.module.scss";
import {Box, Flex, Text} from "@chakra-ui/react";

const ConversationItem = ({
  conversation,
  isSelected,
  onClick,
  isEditing,
  isConnected,
}) => {
  const {
    name,
    username,
    avatar,
    lastMessage,
    timestamp,
    unreadCount,
    isOnline,
    isGroup,
  } = conversation;

  return (
    <Box
      p="12px 16px"
      bg={isSelected ? "#F5F7FA" : "#fff"}
      borderBottom="1px solid #E9EAEB"
      cursor="pointer"
      h="120px"
      onClick={onClick}>
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <Box
            w="8px"
            h="8px"
            borderRadius="50%"
            bg={isOnline ? "#10B981" : "#fff"}
            mr="12px"></Box>
          <Box w="40px" h="40px" borderRadius="50%" mr="8px">
            <img src={"/img/Avatar.svg"} alt={name} />
          </Box>
          <Flex h="40px" flexDir="column">
            <Text fontSize="14px" h="20px" fontWeight="600" color="#181D27">
              {name}
            </Text>
            <Text fontSize="12px" h="20px" fontWeight="400" color="#535862">
              @phoenix
            </Text>
          </Flex>
        </Flex>

        <Box>
          <Text fontSize="12px" fontWeight="400" color="#535862">
            {timestamp}
          </Text>
        </Box>
      </Flex>

      <Box p="12px 18px" h="40px">
        <Text
          className={styles.lastMessage}
          fontSize="12px"
          fontWeight="400"
          color="#535862">
          {lastMessage || "No messages yet"}
        </Text>
      </Box>
    </Box>
  );
};

export default ConversationItem;
