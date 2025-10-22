import React, {useState} from "react";
import {Flex, Box, Text} from "@chakra-ui/react";
import FileViewer from "../../../../components/FileViewer";

function ImageMessage({isOwn, content, fileInfo}) {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const imageUrl = fileInfo?.url || content;
  const fileName = fileInfo?.name || "Image";

  if (!imageUrl) {
    return (
      <Box p="10px 14px">
        <Text color={isOwn ? "#fff" : "#181D27"}>Image not available</Text>
      </Box>
    );
  }

  const handleImageClick = () => {
    setIsImageViewerOpen(true);
  };

  return (
    <>
      <Box
        p="10px 14px"
        borderRadius="8px"
        bg={isOwn ? "transparent" : "#fff"}
        color={isOwn ? "#fff" : "#181D27"}
        maxW="80%"
        cursor="pointer"
        onClick={handleImageClick}>
        <Flex gap="12px" alignItems="center">
          <Box
            w="44px"
            h="44px"
            borderRadius="6px"
            border="1px solid #E9EAEB"
            bg={isOwn ? "#fff" : "#fff"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
            flexShrink={0}>
            <img
              src={imageUrl}
              alt=""
              width="100%"
              height="100%"
              style={{objectFit: "cover"}}
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
            <Text color={isOwn ? "#fff" : "#535862"} fontSize="12px">
              {fileInfo?.size ? formatFileSize(fileInfo.size) : "Image file"}
            </Text>
          </Box>
        </Flex>
      </Box>

      <FileViewer
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
        startIndex={0}
        images={[imageUrl]}
      />
    </>
  );
}

const formatFileSize = (bytes) => {
  if (!bytes || isNaN(bytes)) return "Unknown size";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
};

export default ImageMessage;
