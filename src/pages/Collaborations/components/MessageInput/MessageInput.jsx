import React, {useState, useRef} from "react";
import {useChat} from "../../context/ChatContext";
import styles from "./MessageInput.module.scss";
import {
  Box,
  Button,
  Flex,
  Textarea,
  Input,
  IconButton,
  useToast,
  Text,
  HStack,
  Progress,
} from "@chakra-ui/react";
import {AttachmentIcon, CloseIcon} from "@chakra-ui/icons";
import fileService from "@services/fileService";
import {FaMicrophone, FaStop, FaTrash} from "react-icons/fa";

const MessageInput = ({
  onSendMessage = () => {},
  isConnected = false,
  disabled = false,
}) => {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  const {setTyping, currentUser} = useChat();
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const toast = useToast();

  const getFileType = (file) => {
    const mimeType = file.type;

    if (mimeType.startsWith("image/")) {
      return "image";
    } else if (mimeType.startsWith("video/")) {
      return "video";
    } else if (mimeType.startsWith("audio/")) {
      return "voice";
    } else {
      return "file";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (audioUrl) {
      await sendAudioRecording();
    } else if (selectedFile) {
      await handleFileSend();
    } else if (message.trim()) {
      onSendMessage(message.trim(), "text");
      setMessage("");
      setTyping(currentUser?.id, false);
    } else {
      console.warn("No file or message to send");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessage(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (value.trim() && isConnected) {
      setTyping(currentUser?.id, true);

      typingTimeoutRef.current = setTimeout(() => {
        setTyping(currentUser?.id, false);
      }, 2000);
    } else {
      setTyping(currentUser?.id, false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("File selected:", {
        name: file.name,
        size: file.size,
        type: file.type,
      });

      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: "Maximum file size is 10MB",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      setSelectedFile(file);
      setMessage(file.name);
      console.log("File ready for upload");
    }
  };

  const handleFileSend = async () => {
    if (!selectedFile) {
      console.warn("No file selected");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      console.log("Uploading file to CDN...");
      const response = await fileService.folderUpload(formData, {
        folder_name: "chat",
      });

      if (!response?.link) {
        throw new Error("Invalid response from upload service");
      }

      const fileUrl = `https://cdn.u-code.io/${response.link}`;
      const fileType = getFileType(selectedFile);

      onSendMessage(fileUrl, fileType, {
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
        url: fileUrl,
      });

      setSelectedFile(null);
      setMessage("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast({
        title: "File sent successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("File upload error:", error);

      toast({
        title: "Upload failed",
        description: error?.message || "Could not send file. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsUploading(false);
      console.log("Upload process completed");
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setMessage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatRecordingTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio: true});

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : "audio/ogg",
      });

      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: mediaRecorderRef.current.mimeType,
        });
        setAudioBlob(audioBlob);
        setAudioUrl(URL.createObjectURL(audioBlob));

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      toast({
        title: "Recording started",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error starting recording:", error);
      toast({
        title: "Recording failed",
        description: "Could not access microphone. Please check permissions.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const cancelRecording = () => {
    if (isRecording) {
      stopRecording();
    }

    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
    audioChunksRef.current = [];

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  const sendAudioRecording = async () => {
    if (!audioBlob) {
      return;
    }

    setIsUploading(true);

    try {
      const audioFile = new File(
        [audioBlob],
        `voice-message-${Date.now()}.webm`,
        {type: audioBlob.type}
      );

      const formData = new FormData();
      formData.append("file", audioFile);
      const response = await fileService.folderUpload(formData, {
        folder_name: "chat",
      });

      if (!response?.link) {
        throw new Error("Invalid response from upload service");
      }

      const audioUrl = `https://cdn.u-code.io/${response.link}`;

      onSendMessage(audioUrl, "voice", {
        name: `Voice Message (${formatRecordingTime(recordingTime)})`,
        size: audioFile.size,
        type: audioFile.type,
        url: audioUrl,
        duration: recordingTime,
      });

      setAudioBlob(null);
      setAudioUrl(null);
      setRecordingTime(0);

      toast({
        title: "Voice message sent",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("=== AUDIO UPLOAD ERROR ===");

      toast({
        title: "Upload failed",
        description: `Could not send voice message: ${
          error?.message || "Unknown error"
        }`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsUploading(false);
      console.log("=== AUDIO UPLOAD COMPLETED ===");
    }
  };

  return (
    <Box px="20px" mb="10px">
      {(isRecording || audioUrl) && (
        <Box
          mb="10px"
          p="12px 16px"
          bg={isRecording ? "#FFF5F5" : "#F7FAFC"}
          borderRadius="8px"
          border="1px solid"
          borderColor={isRecording ? "#FC8181" : "#E2E8F0"}>
          <Flex alignItems="center" gap="12px">
            <Box
              w="40px"
              h="40px"
              borderRadius="50%"
              bg={isRecording ? "#E53E3E" : "#3182CE"}
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
              fontSize="18px">
              {isRecording ? <FaMicrophone /> : "🎵"}
            </Box>

            <Box flex="1">
              <HStack justify="space-between" mb="4px">
                <Text fontWeight="600" fontSize="14px" color="#181D27">
                  {isRecording ? "Recording..." : "Voice Message"}
                </Text>
                <Text fontWeight="500" fontSize="14px" color="#535862">
                  {formatRecordingTime(recordingTime)}
                </Text>
              </HStack>

              {isRecording && (
                <Progress
                  size="xs"
                  isIndeterminate
                  colorScheme="red"
                  borderRadius="2px"
                />
              )}

              {audioUrl && !isRecording && (
                <audio
                  controls
                  src={audioUrl}
                  style={{
                    width: "100%",
                    height: "32px",
                    marginTop: "4px",
                  }}
                />
              )}
            </Box>

            <HStack spacing="4px">
              {isRecording ? (
                <>
                  <IconButton
                    size="sm"
                    icon={<FaStop />}
                    onClick={stopRecording}
                    colorScheme="red"
                    aria-label="Stop recording"
                  />
                  <IconButton
                    size="sm"
                    icon={<FaTrash />}
                    onClick={cancelRecording}
                    variant="ghost"
                    colorScheme="red"
                    aria-label="Cancel recording"
                  />
                </>
              ) : (
                <>
                  <IconButton
                    size="sm"
                    icon={<FaTrash />}
                    onClick={cancelRecording}
                    variant="ghost"
                    colorScheme="red"
                    aria-label="Delete recording"
                  />
                </>
              )}
            </HStack>
          </Flex>
        </Box>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <Box border="1px solid #D5D7DA" borderRadius="8px" pr="15px">
          <Textarea
            resize="none"
            ref={inputRef}
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={
              selectedFile
                ? "File selected - click Send"
                : isConnected
                ? "Send a message"
                : "Connecting..."
            }
            border="none"
            h="40px"
            disabled={
              disabled ||
              !isConnected ||
              selectedFile !== null ||
              isRecording ||
              audioUrl !== null
            }
            _focus={{
              outline: "none",
              boxShadow: "none",
            }}
          />

          <Flex justifyContent="flex-end" alignItems="center" gap="6px">
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              display="none"
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip,.rar"
            />

            <IconButton
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              aria-label={isRecording ? "Stop recording" : "Start recording"}
              icon={
                isRecording ? (
                  <FaStop fontSize="20px" />
                ) : (
                  <FaMicrophone fontSize="20px" />
                )
              }
              _hover={{
                bg: isRecording ? "#FEE" : "transparent",
              }}
              mb="12px"
              mr="0px"
              bg={isRecording ? "#FEE" : "transparent"}
              color={isRecording ? "#E53E3E" : "#535862"}
              borderRadius="8px"
              disabled={
                !isConnected || disabled || isUploading || audioUrl !== null
              }
            />

            <IconButton
              type="button"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Attach file"
              icon={<AttachmentIcon fontSize="20px" />}
              _hover={{
                bg: "transparent",
              }}
              mb="12px"
              mr="0px"
              bg="transparent"
              color="#535862"
              borderRadius="8px"
              disabled={
                !isConnected ||
                disabled ||
                isUploading ||
                isRecording ||
                audioUrl !== null
              }
            />

            {selectedFile && (
              <Button
                type="button"
                onClick={handleClearFile}
                _hover={{
                  bg: "transparent",
                }}
                mb="12px"
                mr="0px"
                bg="transparent"
                color="#DC2626"
                borderRadius="8px"
                size="sm">
                Clear
              </Button>
            )}

            <Button
              type="submit"
              _hover={{
                bg: isConnected ? "#EF6820" : "#9CA3AF",
              }}
              mb="12px"
              mr="12px"
              bg={isConnected ? "#EF6820" : "#9CA3AF"}
              color="#fff"
              borderRadius="8px"
              isLoading={isUploading}
              disabled={
                (!message.trim() && !selectedFile) ||
                !isConnected ||
                disabled ||
                isUploading ||
                isRecording ||
                audioUrl !== null
              }>
              {isUploading
                ? "Uploading..."
                : isConnected
                ? "Send"
                : "Connecting..."}
            </Button>
          </Flex>
        </Box>
      </form>
    </Box>
  );
};

export default MessageInput;
