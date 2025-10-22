import React from "react";
import {Flex, Box, Text} from "@chakra-ui/react";

function FileMessage({isOwn, content, fileInfo}) {
  const fileName = fileInfo?.name || content || "File attachment";
  const fileSize = fileInfo?.size || "Unknown size";

  const formatFileSize = (bytes) => {
    if (!bytes || isNaN(bytes)) return fileSize;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <Flex gap="12px" p="10px 14px" alignItems="center">
      <Box
        w="44px"
        h="44px"
        borderRadius="6px"
        border="1px solid #E9EAEB"
        color="#fff"
        bg="#F79009"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="20px">
        📄
      </Box>
      <Box>
        <Text color={isOwn ? "#fff" : "#181D27"} fontWeight="500">
          {fileName}
        </Text>
        <Text color={isOwn ? "#fff" : "#181D27"} fontSize="12px">
          {formatFileSize(fileInfo?.size)}
        </Text>
      </Box>
    </Flex>
  );
}

export default FileMessage;
