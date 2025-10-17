import React, {useState, useRef} from "react";
import {useChat} from "../../context/ChatContext";
import styles from "./MessageInput.module.scss";
import {Box, Button, Flex, Textarea} from "@chakra-ui/react";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const {sendMessage, setTyping, currentUser} = useChat();
  const inputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message.trim());
      setMessage("");
      setTyping(currentUser.id, false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessage(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (value.trim()) {
      setTyping(currentUser.id, true);

      typingTimeoutRef.current = setTimeout(() => {
        setTyping(currentUser.id, false);
      }, 2000);
    } else {
      setTyping(currentUser.id, false);
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
            placeholder="Send a message"
            border="none"
            h="40px"
            _focus={{
              outline: "none",
              boxShadow: "none",
            }}
          />

          <Flex justifyContent="flex-end" alignItems="center" gap="12px">
            <Button
              _hover={{
                bg: "#EF6820",
              }}
              mb="12px"
              mr="12px"
              bg="#EF6820"
              color="#fff"
              borderRadius="8px"
              onClick={handleSubmit}
              disabled={!message.trim()}>
              Send
            </Button>
          </Flex>
        </Box>
      </form>
    </Box>
  );
};

export default MessageInput;
