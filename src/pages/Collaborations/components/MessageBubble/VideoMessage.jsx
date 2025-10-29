import React, {useState} from "react";
import {
  Flex,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  AspectRatio,
} from "@chakra-ui/react";

function VideoMessage({isOwn, content, fileInfo}) {
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const videoUrl = fileInfo?.url || content;
  const fileName = fileInfo?.name || "Video";

  if (!videoUrl) {
    return (
      <Box p="10px 14px">
        <Text color={isOwn ? "#fff" : "#181D27"}>Video not available</Text>
      </Box>
    );
  }

  const handleVideoClick = () => {
    setIsVideoPlayerOpen(true);
  };

  return (
    <>
      <Box
        p={isOwn ? "6px 0px 6px 14px" : "6px 14px 6px 14px"}
        borderRadius="8px"
        bg={isOwn ? "transparent" : "#fff"}
        color={isOwn ? "#fff" : "#181D27"}
        maxW="80%"
        cursor="pointer"
        onClick={handleVideoClick}>
        <Flex gap="12px" alignItems="center">
          <Box
            w="44px"
            h="44px"
            borderRadius="6px"
            border="1px solid #E9EAEB"
            bg={isOwn ? "transparent" : "#FEF3E9"}
            color={isOwn ? "#fff" : "#181D27"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="20px">
            ▶
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
              {fileInfo?.size ? formatFileSize(fileInfo.size) : "Video file"}
            </Text>
          </Box>
        </Flex>
      </Box>

      <Modal
        isOpen={isVideoPlayerOpen}
        onClose={() => setIsVideoPlayerOpen(false)}
        size="xl"
        isCentered>
        <ModalOverlay bg="rgba(0, 0, 0, 0.8)" />
        <ModalContent
          maxW="900px"
          maxH="700px"
          borderRadius="12px"
          overflow="hidden">
          <ModalHeader
            bg="#f7fafc"
            borderBottom="1px solid #e2e8f0"
            fontSize="18px"
            fontWeight="600">
            {fileName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p={0}>
            <AspectRatio maxW="100%" ratio={16 / 9}>
              <video
                controls
                style={{
                  width: "100%",
                  height: "100%",
                }}>
                <source src={videoUrl} type="video/mp4" />
                <source src={videoUrl} type="video/webm" />
                <source src={videoUrl} type="video/ogg" />
                Your browser does not support the video tag.
              </video>
            </AspectRatio>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
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
