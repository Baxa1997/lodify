import React from "react";
import {Box, Text} from "@chakra-ui/react";

const TextMessage = ({isOwn, content}) => {
  return (
    <Box
      p="10px 14px"
      borderRadius="8px"
      bg={isOwn ? "transparent" : "#fff"}
      color={isOwn ? "#fff" : "#181D27"}
      maxW="80%"
      wordBreak="break-word">
      <Text fontSize="14px" lineHeight="1.4" color={isOwn ? "#fff" : "#181D27"}>
        {content}
      </Text>
    </Box>
  );
};

export default TextMessage;
