import React from "react";
import styles from "./ChatHeader.module.scss";
import {Flex, Box, Text, Button} from "@chakra-ui/react";

const ChatHeader = ({conversation, isConnected, presence = {}}) => {
  const {name, to_name, type, username, avatar, isOnline, isGroup} =
    conversation;
  console.log("PRESENCE=====>", presence);
  return (
    <Flex p="20px 24px" alignItems="center" justifyContent="space-between">
      <Flex gap="12px" alignItems="center">
        <Box
          w="56px"
          h="56px"
          borderRadius="50%"
          border="1px solid #E9EAEB"
          color="#fff"
          display="flex"
          alignItems="center"
          bg="#F79009"
          fontSize="18px"
          justifyContent="center">
          {to_name?.[0]}
        </Box>
        <Box>
          <Flex alignItems="center" gap="8px">
            <Text fontSize="16px" fontWeight="600" color="#181D27">
              {/* {type === "single" ? to_name : name} */}
              {to_name}
            </Text>
            <Flex
              alignItems="center"
              gap="4px"
              h="20px"
              border="1px solid #D5D7DA"
              borderRadius="4px"
              p="4px">
              <Box
                w="6px"
                h="6px"
                borderRadius="50%"
                bg={presence?.status === "online" ? "#10B981" : "red"}></Box>
              <Text fontSize="12px" fontWeight="400" color={"#535862"}>
                {presence?.status === "online" ? "Online" : "Offline"}
              </Text>
            </Flex>
          </Flex>
          <Text fontSize="14px" fontWeight="400" color="#535862">
            {username}
          </Text>
        </Box>
      </Flex>

      <Button
        bg="#EF6820"
        color="#fff"
        borderRadius="8px"
        p="10px 16px"
        fontSize="14px"
        fontWeight="600"
        _hover={{bg: "#EF6820"}}>
        View Profile
      </Button>
    </Flex>
  );
};

export default ChatHeader;
