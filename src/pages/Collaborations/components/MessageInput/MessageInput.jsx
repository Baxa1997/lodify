import React, {useState, useRef} from "react";
import {useChat} from "../../context/ChatContext";
import styles from "./MessageInput.module.scss";

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

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set typing indicator
    if (value.trim()) {
      setTyping(currentUser.id, true);

      // Clear typing indicator after 2 seconds of no typing
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
    <div className={styles.messageInput}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputContainer}>
          <button
            type="button"
            className={styles.emojiButton}
            title="Add emoji">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13 7H13.01"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 7H7.01"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 13C10.5 13.5 11.5 14 12.5 14C13.5 14 14.5 13.5 15 13"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            className={styles.attachButton}
            title="Attach file">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 12L4 6C4 3.79086 5.79086 2 8 2H12C14.2091 2 16 3.79086 16 6V12C16 14.2091 14.2091 16 12 16H8C5.79086 16 4 14.2091 4 12Z"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 8H12"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 12H12"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Send a message"
            className={styles.input}
          />

          <button
            type="submit"
            className={styles.sendButton}
            disabled={!message.trim()}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
