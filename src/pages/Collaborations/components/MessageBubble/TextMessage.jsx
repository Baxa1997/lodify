import React from "react";
import {Flex, Box, Text} from "@chakra-ui/react";

const TextMessage = ({messageTime, sender, content}) => {
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontWeight="500" color="#181D27">
          {sender?.to_name}
        </Text>
        <Text fontWeight={400} color="#535862" fontSize="12px">
          {messageTime}
        </Text>
      </Flex>
      <Box
        borderRadius="8px"
        borderTopLeftRadius="0"
        border="1px solid #E9EAEB"
        p="10px 14px">
        {content}
      </Box>
    </>
  );
};

export default TextMessage;
