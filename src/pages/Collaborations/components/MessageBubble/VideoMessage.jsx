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
      <Flex
        gap="12px"
        p="10px 14px"
        alignItems="center"
        cursor="pointer"
        onClick={handleVideoClick}
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
          ▶️
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
            {fileInfo?.size ? formatFileSize(fileInfo.size) : "Video file"}
          </Text>
        </Box>
      </Flex>

      {/* Video Player Modal */}
      <Modal
        isOpen={isVideoPlayerOpen}
        onClose={() => setIsVideoPlayerOpen(false)}
        size="xl"
        isCentered>
        <ModalOverlay />
        <ModalContent maxW="800px" maxH="600px">
          <ModalHeader>{fileName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <AspectRatio maxW="100%" ratio={16 / 9}>
              <video
                controls
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
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
