import React, {useState} from "react";
import {Flex, Box, Text} from "@chakra-ui/react";
import {DownloadIcon} from "@chakra-ui/icons";
import FilesReader from "../../../../components/FileViewer/FilesReader";

function FileMessage({isOwn, content, fileInfo}) {
  const [isFileReaderOpen, setIsFileReaderOpen] = useState(false);
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

  const isViewableFile = (filename) => {
    const ext = filename?.split(".").pop()?.toLowerCase();
    const viewableExtensions = [
      "pdf",
      "doc",
      "docx",
      "xls",
      "xlsx",
      "jpg",
      "jpeg",
      "png",
      "gif",
      "bmp",
      "webp",
    ];
    return viewableExtensions.includes(ext);
  };

  const handleFileClick = () => {
    if (isViewableFile(fileName)) {
      setIsFileReaderOpen(true);
    } else {
      // For non-viewable files, open in new tab
      window.open(fileUrl, "_blank");
    }
  };

  return (
    <>
      <Flex
        gap="12px"
        p="10px 14px"
        alignItems="center"
        cursor="pointer"
        onClick={handleFileClick}
        transition="all 0.2s"
        _hover={{
          bg: isOwn ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.05)",
          borderRadius: "6px",
        }}>
        <Box
          w="44px"
          h="44px"
          borderRadius="6px"
          border={
            isOwn ? "1px solid rgba(255,255,255,0.2)" : "1px solid #E9EAEB"
          }
          bg={isOwn ? "rgba(255,255,255,0.1)" : "#FEF3E9"}
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="20px">
          {getFileIcon(fileName)}
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

      {/* File Reader Modal */}
      <FilesReader
        isOpen={isFileReaderOpen}
        onClose={() => setIsFileReaderOpen(false)}
        file={fileUrl}
      />
    </>
  );
}

export default FileMessage;
