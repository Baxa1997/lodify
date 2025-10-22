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
      <Box
        p="10px 14px"
        borderRadius="8px"
        bg={isOwn ? "#007AFF" : "#F5F5F5"}
        color={isOwn ? "#fff" : "#181D27"}
        maxW="80%"
        cursor="pointer"
        onClick={handleAudioClick}>
        <Flex gap="12px" alignItems="center">
          <Box
            w="44px"
            h="44px"
            borderRadius="6px"
            border="1px solid #E9EAEB"
            bg="#FEF3E9"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="20px"
            flexShrink={0}>
            ▶️
          </Box>

          <Box flex="1" minW="0">
            <Text
              color="#181D27"
              fontWeight="500"
              fontSize="14px"
              noOfLines={1}>
              {fileName}
            </Text>
            <Text color="#535862" fontSize="12px">
              {fileInfo?.size ? formatFileSize(fileInfo.size) : "Audio file"}
            </Text>
          </Box>
        </Flex>
      </Box>

      {/* Audio Player Modal */}
      <Modal
        isOpen={isAudioPlayerOpen}
        onClose={() => setIsAudioPlayerOpen(false)}
        size="md"
        isCentered>
        <ModalOverlay bg="rgba(0, 0, 0, 0.8)" />
        <ModalContent maxW="500px" borderRadius="12px" overflow="hidden">
          <ModalHeader
            bg="#f7fafc"
            borderBottom="1px solid #e2e8f0"
            fontSize="18px"
            fontWeight="600">
            {fileName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap="24px"
              py="32px">
              <Box
                w="100px"
                h="100px"
                borderRadius="50%"
                bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="48px"
                boxShadow="0 8px 32px rgba(102, 126, 234, 0.3)">
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
