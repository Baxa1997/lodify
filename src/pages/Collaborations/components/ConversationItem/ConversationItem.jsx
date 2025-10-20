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
    to_name,
    username,
    avatar,
    last_message,
    timestamp,
    unreadCount,
    isOnline,
    isGroup,
    type,
  } = conversation;
  console.log("to_nameto_name", conversation, to_name);
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
          <Box
            w="40px"
            h="40px"
            bg="#F79009"
            borderRadius="50%"
            border="1px solid #E9EAEB"
            color="#fff"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mr="8px">
            {to_name?.[0]}
          </Box>
          <Flex h="40px" flexDir="column">
            <Text fontSize="14px" h="20px" fontWeight="600" color="#000">
              {type === "single" ? to_name : name}
            </Text>
            <Text fontSize="12px" h="20px" fontWeight="400" color="#535862">
              {/* @phoenix */} No username
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
          {last_message || "No messages yet"}
        </Text>
      </Box>
    </Box>
  );
};

export default ConversationItem;
