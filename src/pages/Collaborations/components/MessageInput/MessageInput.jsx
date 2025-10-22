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
} from "@chakra-ui/react";
import {useSocket} from "@context/SocketProvider";
import {AttachmentIcon} from "@chakra-ui/icons";
import fileService from "@services/fileService";

const MessageInput = ({
  onSendMessage = () => {},
  isConnected = false,
  disabled = false,
}) => {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const {setTyping, currentUser} = useChat();
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const toast = useToast();

  // Determine file type based on MIME type
  const getFileType = (file) => {
    const mimeType = file.type;

    if (mimeType.startsWith("image/")) {
      return "image";
    } else if (mimeType.startsWith("video/")) {
      return "video";
    } else if (mimeType.startsWith("audio/")) {
      return "audio";
    } else {
      return "file";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submitted:", {
      hasFile: !!selectedFile,
      hasMessage: !!message.trim(),
      fileName: selectedFile?.name,
    });

    if (selectedFile) {
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
        console.warn("File too large:", file.size);
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

    console.log("Starting file upload:", {
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
      fileType: selectedFile.type,
    });

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      console.log("Uploading file to CDN...");
      const response = await fileService.folderUpload(formData, {
        folder_name: "chat",
      });

      console.log("Upload response:", response);

      if (!response?.link) {
        throw new Error("Invalid response from upload service");
      }

      const fileUrl = `https://cdn.u-code.io/${response.link}`;
      const fileType = getFileType(selectedFile);

      console.log("File uploaded successfully:", {
        fileUrl,
        fileType,
        fileName: selectedFile.name,
      });

      console.log("Sending message via socket...");
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
      console.error("Error details:", {
        message: error?.message,
        response: error?.response,
        stack: error?.stack,
      });

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

  return (
    <Box px="20px" mb="10px">
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
            disabled={disabled || !isConnected || selectedFile !== null}
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
              disabled={!isConnected || disabled || isUploading}
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
                isUploading
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
