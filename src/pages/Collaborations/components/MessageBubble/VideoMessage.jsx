import React from "react";
import {Flex, Box, Text} from "@chakra-ui/react";

function VideoMessage({isOwn, content, fileInfo}) {
  const videoUrl = fileInfo?.url || content;
  const fileName = fileInfo?.name || "Video";

  if (!videoUrl) {
    return (
      <Box p="10px 14px">
        <Text color={isOwn ? "#fff" : "#181D27"}>Video not available</Text>
      </Box>
    );
  }

  return (
    <Flex gap="12px" p="10px 14px" alignItems="center">
      {/* 44px Icon Box */}
      <Box
        w="44px"
        h="44px"
        borderRadius="6px"
        border={isOwn ? "1px solid rgba(255,255,255,0.2)" : "1px solid #E9EAEB"}
        bg={isOwn ? "rgba(255,255,255,0.1)" : "#FEF3E9"}
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="20px">
        ▶️
      </Box>

      {/* File Details */}
      <Box flex="1" minW="0">
        <Text
          color={isOwn ? "#fff" : "#181D27"}
          fontWeight="500"
          fontSize="14px"
          noOfLines={1}>
          {fileName}
        </Text>
        <Text
          color={isOwn ? "rgba(255,255,255,0.8)" : "#535862"}
          fontSize="12px">
          {fileInfo?.size ? formatFileSize(fileInfo.size) : "Video file"}
        </Text>
      </Box>
    </Flex>
  );
}

// Helper function to format file size
const formatFileSize = (bytes) => {
  if (!bytes || isNaN(bytes)) return "Unknown size";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
};

export default VideoMessage;
