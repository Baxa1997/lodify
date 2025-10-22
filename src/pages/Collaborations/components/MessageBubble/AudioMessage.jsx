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
} from "@chakra-ui/react";

function AudioMessage({isOwn, content, fileInfo}) {
  const [isAudioPlayerOpen, setIsAudioPlayerOpen] = useState(false);
  const audioUrl = fileInfo?.url || content;
  const fileName = fileInfo?.name || "Audio";

  if (!audioUrl) {
    return (
      <Box p="10px 14px">
        <Text color={isOwn ? "#fff" : "#181D27"}>Audio not available</Text>
      </Box>
    );
  }

  const handleAudioClick = () => {
    setIsAudioPlayerOpen(true);
  };

  return (
    <>
      <Flex
        gap="12px"
        p="10px 14px"
        alignItems="center"
        cursor="pointer"
        onClick={handleAudioClick}
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
            {fileInfo?.size ? formatFileSize(fileInfo.size) : "Audio file"}
          </Text>
        </Box>
      </Flex>

      {/* Audio Player Modal */}
      <Modal
        isOpen={isAudioPlayerOpen}
        onClose={() => setIsAudioPlayerOpen(false)}
        size="md"
        isCentered>
        <ModalOverlay />
        <ModalContent maxW="500px">
          <ModalHeader>{fileName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap="20px"
              py="20px">
              <Box
                w="80px"
                h="80px"
                borderRadius="50%"
                bg={isOwn ? "rgba(255,255,255,0.1)" : "#FEF3E9"}
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="40px">
                🎵
              </Box>
              <audio
                controls
                style={{
                  width: "100%",
                  height: "50px",
                  outline: "none",
                }}>
                <source src={audioUrl} type="audio/mpeg" />
                <source src={audioUrl} type="audio/ogg" />
                <source src={audioUrl} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
            </Box>
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

export default AudioMessage;
