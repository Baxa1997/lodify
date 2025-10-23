import React from "react";
import styles from "./ConversationItem.module.scss";
import {Box, Flex, Text} from "@chakra-ui/react";
import {checkValidUrl} from "@utils/checkValidUrl";
import {calculateTimeHoursDifferenceInTimeZone} from "@utils/dateFormats";

const ConversationItem = ({conversation, isSelected, onClick}) => {
  const {
    name,
    to_name,
    last_message,
    timestamp,
    isOnline,
    type,
    last_message_created_at,
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
              {/* {type === "single" ? to_name : name} */}
              {to_name}
            </Text>
            <Text fontSize="12px" h="20px" fontWeight="400" color="#535862">
              No username
            </Text>
          </Flex>
        </Flex>

        <Box>
          <Text fontSize="12px" fontWeight="400" color="#535862">
            {calculateTimeHoursDifferenceInTimeZone(last_message_created_at) ??
              "Online"}
          </Text>
        </Box>
      </Flex>

      <Box p="12px 18px" h="40px">
        <Text
          className={styles.lastMessage}
          fontSize="12px"
          fontWeight="400"
          color="#535862">
          {checkValidUrl(last_message) ? (
            <Text>File attached</Text>
          ) : (
            last_message || "No messages yet"
          )}
        </Text>
      </Box>
    </Box>
  );
};

export default ConversationItem;
