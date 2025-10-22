import React, {useState, useRef, useEffect} from "react";
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
  IconButton,
  HStack,
  VStack,
} from "@chakra-ui/react";
// import {PlayIcon, PauseIcon, DownloadIcon} from "@chakra-ui/icons";
import {FaPlay, FaPause, FaDownload} from "react-icons/fa";

function AudioMessage({isOwn, content, fileInfo}) {
  const [isAudioPlayerOpen, setIsAudioPlayerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef(null);
  const audioUrl = fileInfo?.url || content;
  const fileName = fileInfo?.name || "Audio";
  const audioDuration = fileInfo?.duration || 0;

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [audioUrl]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

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
        p="12px 16px"
        borderRadius="12px"
        bg={isOwn ? "transparent" : "#F8F9FA"}
        color={isOwn ? "#fff" : "#181D27"}
        maxW="100%"
        minW="100%"
        cursor="pointer"
        onClick={handleAudioClick}
        transition="all 0.2s ease">
        <Flex gap="12px" alignItems="center">
          {/* Play/Pause Button */}
          <IconButton
            size="sm"
            icon={isPlaying ? <FaPause /> : <FaPlay />}
            onClick={(e) => {
              e.stopPropagation();
              togglePlayPause();
            }}
            bg={isOwn ? "rgba(255, 255, 255, 0.2)" : "#007AFF"}
            color={isOwn ? "#fff" : "#fff"}
            borderRadius="50%"
            w="36px"
            h="36px"
            _hover={{
              bg: isOwn ? "rgba(255, 255, 255, 0.3)" : "#0056CC",
            }}
            _active={{
              transform: "scale(0.95)",
            }}
            disabled={isLoading}
          />

          {/* Audio Waveform/Info */}
          <Box flex="1" minW="0">
            <HStack justify="space-between" mb="4px">
              <Text
                color={isOwn ? "#fff" : "#181D27"}
                fontWeight="600"
                fontSize="14px"
                noOfLines={1}>
                {fileName.includes("Voice Message")
                  ? "🎤 Voice Message"
                  : fileName}
              </Text>
              <Text
                color={isOwn ? "rgba(255, 255, 255, 0.8)" : "#535862"}
                fontSize="12px"
                fontWeight="500">
                {formatTime(duration || audioDuration)}
              </Text>
            </HStack>

            {/* Progress Bar */}
            <Box position="relative" onClick={handleSeek} cursor="pointer">
              <Box
                h="4px"
                bg={isOwn ? "rgba(255, 255, 255, 0.3)" : "#E5E7EB"}
                borderRadius="2px"
                overflow="hidden">
                <Box
                  h="100%"
                  bg={isOwn ? "#fff" : "#007AFF"}
                  borderRadius="2px"
                  width={`${duration ? (currentTime / duration) * 100 : 0}%`}
                  transition="width 0.1s ease"
                />
              </Box>
            </Box>

            {/* Time Display */}
            <HStack justify="space-between" mt="4px">
              <Text
                color={isOwn ? "rgba(255, 255, 255, 0.7)" : "#9CA3AF"}
                fontSize="11px">
                {formatTime(currentTime)}
              </Text>
              <Text
                color={isOwn ? "rgba(255, 255, 255, 0.7)" : "#9CA3AF"}
                fontSize="11px">
                {formatTime(duration || audioDuration)}
              </Text>
            </HStack>
          </Box>
        </Flex>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src={audioUrl}
          preload="metadata"
          onLoadStart={() => setIsLoading(true)}
        />
      </Box>

      {/* Professional Audio Player Modal */}
      <Modal
        isOpen={isAudioPlayerOpen}
        onClose={() => setIsAudioPlayerOpen(false)}
        size="lg"
        isCentered>
        <ModalOverlay bg="rgba(0, 0, 0, 0.8)" backdropFilter="blur(4px)" />
        <ModalContent
          maxW="600px"
          borderRadius="16px"
          overflow="hidden"
          bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          color="white">
          <ModalHeader
            bg="rgba(255, 255, 255, 0.1)"
            borderBottom="1px solid rgba(255, 255, 255, 0.2)"
            fontSize="20px"
            fontWeight="600"
            textAlign="center">
            {fileName.includes("Voice Message")
              ? "🎤 Voice Message"
              : "🎵 Audio Player"}
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={8}>
            <VStack spacing={8} py={8}>
              {/* Large Play Button */}
              <Box
                w="120px"
                h="120px"
                borderRadius="50%"
                bg="rgba(255, 255, 255, 0.2)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                onClick={togglePlayPause}
                transition="all 0.3s ease"
                _hover={{
                  bg: "rgba(255, 255, 255, 0.3)",
                  transform: "scale(1.05)",
                }}
                _active={{
                  transform: "scale(0.95)",
                }}
                boxShadow="0 8px 32px rgba(0, 0, 0, 0.3)">
                {isPlaying ? (
                  <FaPause boxSize="48px" />
                ) : (
                  <FaPlay boxSize="48px" ml="4px" />
                )}
              </Box>

              {/* Progress Section */}
              <VStack spacing={4} w="100%">
                {/* Progress Bar */}
                <Box w="100%" position="relative">
                  <Box
                    h="6px"
                    bg="rgba(255, 255, 255, 0.3)"
                    borderRadius="3px"
                    cursor="pointer"
                    onClick={handleSeek}>
                    <Box
                      h="100%"
                      bg="white"
                      borderRadius="3px"
                      width={`${
                        duration ? (currentTime / duration) * 100 : 0
                      }%`}
                      transition="width 0.1s ease"
                    />
                  </Box>
                </Box>

                {/* Time Display */}
                <HStack
                  justify="space-between"
                  w="100%"
                  fontSize="14px"
                  fontWeight="500">
                  <Text color="rgba(255, 255, 255, 0.8)">
                    {formatTime(currentTime)}
                  </Text>
                  <Text color="rgba(255, 255, 255, 0.8)">
                    {formatTime(duration || audioDuration)}
                  </Text>
                </HStack>
              </VStack>

              {/* Controls */}
              <HStack spacing={6}>
                <IconButton
                  // icon={<DownloadIcon />}
                  aria-label="Download audio"
                  bg="rgba(255, 255, 255, 0.2)"
                  color="white"
                  borderRadius="50%"
                  _hover={{bg: "rgba(255, 255, 255, 0.3)"}}
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = audioUrl;
                    link.download = fileName;
                    link.click();
                  }}
                />
              </HStack>
            </VStack>
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
