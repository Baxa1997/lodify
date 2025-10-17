import React, {useState, useRef} from "react";
import {useChat} from "../../context/ChatContext";
import styles from "./MessageInput.module.scss";
import {Box, Button, Flex, Textarea} from "@chakra-ui/react";
import {useSocket} from "@hooks/useSocket";

const MessageInput = ({
  onSendMessage = () => {},
  isConnected = false,
  disabled = false,
}) => {
  const [message, setMessage] = useState("");
  const {setTyping, currentUser} = useChat();
  const inputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("message", message);
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
      setTyping(currentUser?.id, false);
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
            placeholder={isConnected ? "Send a message" : "Connecting..."}
            border="none"
            h="40px"
            disabled={disabled || !isConnected}
            _focus={{
              outline: "none",
              boxShadow: "none",
            }}
          />

          <Flex justifyContent="flex-end" alignItems="center" gap="12px">
            <Button
              _hover={{
                bg: isConnected ? "#EF6820" : "#9CA3AF",
              }}
              mb="12px"
              mr="12px"
              bg={isConnected ? "#EF6820" : "#9CA3AF"}
              color="#fff"
              borderRadius="8px"
              onClick={handleSubmit}
              disabled={!message.trim() || !isConnected || disabled}>
              {isConnected ? "Send" : "Connecting..."}
            </Button>
          </Flex>
        </Box>
      </form>
    </Box>
  );
};

export default MessageInput;
