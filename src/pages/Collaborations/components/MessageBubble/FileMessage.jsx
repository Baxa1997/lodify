import React from "react";
import {Flex, Box, Text, Link, Icon} from "@chakra-ui/react";
import {DownloadIcon} from "@chakra-ui/icons";

function FileMessage({isOwn, content, fileInfo}) {
  const fileName = fileInfo?.name || content || "File attachment";
  const fileSize = fileInfo?.size || "Unknown size";
  const fileUrl = fileInfo?.url || content;

  const formatFileSize = (bytes) => {
    if (!bytes || isNaN(bytes)) return fileSize;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  };

  const getFileIcon = (filename) => {
    const ext = filename?.split(".").pop()?.toLowerCase();
    const iconMap = {
      pdf: "📄",
      doc: "📝",
      docx: "📝",
      xls: "📊",
      xlsx: "📊",
      txt: "📃",
      zip: "🗜️",
      rar: "🗜️",
      default: "📎",
    };
    return iconMap[ext] || iconMap.default;
  };

  return (
    <Link href={fileUrl} isExternal _hover={{textDecoration: "none"}}>
      <Flex
        gap="12px"
        p="10px 14px"
        alignItems="center"
        cursor="pointer"
        transition="all 0.2s"
        _hover={{
          bg: isOwn ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.05)",
          borderRadius: "6px",
        }}>
        <Box
          w="44px"
          h="44px"
          borderRadius="8px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="22px">
          <img
            src="/img/messagePdf.svg"
            alt="file"
            width="100%"
            height="100%"
          />
        </Box>
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
            {formatFileSize(fileInfo?.size)}
          </Text>
        </Box>
        <DownloadIcon color={isOwn ? "#fff" : "#535862"} />
      </Flex>
    </Link>
  );
}

export default FileMessage;
