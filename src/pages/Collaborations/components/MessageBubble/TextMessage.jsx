import React from "react";
import {Box, Text} from "@chakra-ui/react";

const TextMessage = ({isOwn, content}) => {
  return (
    <Box
      p="6px 0px 6px 14px"
      borderRadius="8px"
      bg={isOwn ? "transparent" : "#fff"}
      color={isOwn ? "#fff" : "#181D27"}
      maxW="100%"
      whiteSpace="pre-wrap"
      wordBreak="normal"
      overflowWrap="break-word">
      <Text
        fontSize="14px"
        lineHeight="1.4"
        color={isOwn ? "#fff" : "#181D27"}
        whiteSpace="pre-wrap"
        wordBreak="normal"
        overflowWrap="break-word">
        {content}
      </Text>
    </Box>
  );
};

export default TextMessage;
