import React, {useEffect, useRef, useState, useCallback} from "react";
import MessageBubble from "../MessageBubble/MessageBubble";
import DateSeparator from "../DateSeparator/DateSeparator";
import styles from "./MessagesList.module.scss";
import {useSocket} from "@context/SocketProvider";
import {useSelector} from "react-redux";

const MessagesList = ({rooms = [], conversation, isConnected}) => {
  const socket = useSocket();
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [localMessages, setLocalMessages] = useState([]);
  const [isNewMessage, setIsNewMessage] = useState(false);
  const loggedInUser = useSelector((state) => state.auth.user_data?.login);
  const userId = useSelector((state) => state.auth.userInfo?.id);
  const prevMessageCountRef = useRef(0);

  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    hasMoreMessages: true,
    isLoadingMore: false,
  });

  const scrollToBottom = (behavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({behavior});
  };

  const deduplicateMessages = useCallback((existingMessages, newMessages) => {
    const existingIds = new Set(
      existingMessages.map((msg) => msg.id || msg._id)
    );
    const uniqueNewMessages = newMessages.filter(
      (msg) => !existingIds.has(msg.id || msg._id)
    );
    return [...uniqueNewMessages, ...existingMessages];
  }, []);

  const loadMoreMessages = useCallback(() => {
    if (
      !socket ||
      !conversation?.id ||
      pagination.isLoadingMore ||
      !pagination.hasMoreMessages
    ) {
      console.log("loadMoreMessages blocked:", {
        noSocket: !socket,
        noConversation: !conversation?.id,
        isLoading: pagination.isLoadingMore,
        noMoreMessages: !pagination.hasMoreMessages,
      });
      return;
    }

    setPagination((prev) => ({...prev, isLoadingMore: true}));

    const nextOffset = pagination.offset + pagination.limit;

    // socket.emit("chat message", {
    //   author_row_id: userId,
    //   from: loggedInUser,
    //   room_id: conversation.id,
    //   limit: pagination.limit,
    //   offset: nextOffset,
    // });
  }, [
    socket,
    conversation?.id,
    pagination.isLoadingMore,
    pagination.hasMoreMessages,
    pagination.offset,
    pagination.limit,
  ]);

  const handleScroll = useCallback(
    (e) => {
      const {scrollTop, scrollHeight, clientHeight} = e.target;

      // console.log("Scroll event:", {
      //   scrollTop,
      //   scrollHeight,
      //   clientHeight,
      //   hasMoreMessages: pagination.hasMoreMessages,
      //   isLoadingMore: pagination.isLoadingMore,
      //   shouldLoad:
      //     scrollTop <= 10 &&
      //     pagination.hasMoreMessages &&
      //     !pagination.isLoadingMore,
      // });

      if (
        scrollTop <= 10 &&
        pagination.hasMoreMessages &&
        !pagination.isLoadingMore
      ) {
        console.log("Loading more messages...");
        loadMoreMessages();
      }
    },
    [loadMoreMessages, pagination.hasMoreMessages, pagination.isLoadingMore]
  );

  useEffect(() => {
    if (localMessages.length > prevMessageCountRef.current) {
      setIsNewMessage(true);
      scrollToBottom("smooth");

      setTimeout(() => setIsNewMessage(false), 1000);
    }
    prevMessageCountRef.current = localMessages.length;
  }, [localMessages]);

  useEffect(() => {
    scrollToBottom("auto");
  }, [conversation?.id]);

  useEffect(() => {
    if (!socket) return;

    const handleRoomHistory = (messages) => {
      if (Array.isArray(messages)) {
        setLocalMessages(messages);

        // setPagination((prev) => ({
        //   ...prev,
        //   offset: 0,
        //   hasMoreMessages: messages.length >= prev.limit,
        //   isLoadingMore: false,
        // }));
      } else if (messages?.data && Array.isArray(messages.data)) {
        setLocalMessages(messages.data);
        // setPagination((prev) => ({
        //   ...prev,
        //   offset: 0,
        //   hasMoreMessages: messages.data.length >= prev.limit,
        //   isLoadingMore: false,
        // }));
      } else {
        console.warn("⚠️ Unexpected room history format:", messages);
      }
    };

    const handleReceiveMessage = (message) => {
      if (message.room_id === conversation?.id) {
        setLocalMessages((prevMessages) => {
          const existingMessage = prevMessages.find(
            (msg) => (msg.id || msg._id) === (message.id || message._id)
          );
          if (existingMessage) {
            return prevMessages;
          }
          return [...prevMessages, message];
        });
      } else {
        console.log("Received message for different room, ignoring:", {
          messageRoomId: message.room_id,
          currentRoomId: conversation?.id,
          message: message,
        });
      }
    };

    const handleMoreMessages = (response) => {
      setPagination((prev) => ({...prev, isLoadingMore: false}));

      if (response && Array.isArray(response)) {
        if (response.length === 0) {
          setPagination((prev) => ({...prev, hasMoreMessages: false}));
          return;
        }

        setLocalMessages((prevMessages) => {
          const deduplicatedMessages = deduplicateMessages(
            prevMessages,
            response
          );
          return deduplicatedMessages;
        });

        setPagination((prev) => ({
          ...prev,
          offset: prev.offset + prev.limit,
          hasMoreMessages: response.length >= prev.limit,
        }));
      } else if (response?.data && Array.isArray(response.data)) {
        if (response.data.length === 0) {
          setPagination((prev) => ({...prev, hasMoreMessages: false}));
          return;
        }

        setLocalMessages((prevMessages) => {
          const deduplicatedMessages = deduplicateMessages(
            prevMessages,
            response.data
          );
          return deduplicatedMessages;
        });

        // setPagination((prev) => ({
        //   ...prev,
        //   offset: prev.offset + prev.limit,
        //   hasMoreMessages: response.data.length >= prev.limit,
        // }));
      }
    };

    socket.on("room history", handleRoomHistory);
    socket.on("chat message", handleReceiveMessage);
    socket.on("more messages", handleMoreMessages);

    return () => {
      socket.off("room history", handleRoomHistory);
      socket.off("chat message", handleReceiveMessage);
      socket.off("more messages", handleMoreMessages);
    };
  }, [socket, conversation?.id, deduplicateMessages]);

  useEffect(() => {
    if (!socket || !conversation?.id || !userId) return;

    setLocalMessages([]);

    setPagination({
      limit: 10,
      offset: 0,
      hasMoreMessages: true,
      isLoadingMore: false,
    });

    socket.emit("join room", {
      room_id: conversation.id,
      row_id: userId,
    });
    socket.emit("presence:get", {row_id: conversation.to_row_id});
  }, [socket, conversation?.id, userId]);

  const groupMessagesByDate = (messages) => {
    const groups = [];
    let currentGroup = [];
    let currentDate = null;

    messages.forEach((message, index) => {
      const messageDate = new Date(message.timestamp).toDateString();

      if (currentDate !== messageDate) {
        if (currentGroup.length > 0) {
          groups.push({
            date: currentDate,
            messages: currentGroup,
          });
        }
        currentGroup = [message];
        currentDate = messageDate;
      } else {
        currentGroup.push(message);
      }
    });

    if (currentGroup.length > 0) {
      groups.push({
        date: currentDate,
        messages: currentGroup,
      });
    }

    return groups;
  };

  const messageGroups = groupMessagesByDate(localMessages);

  useEffect(() => {
    if (!socket || !conversation?.id || !userId) {
      return;
    }

    const sendMessageRead = () => {
      if (socket && socket.connected && conversation?.id && userId) {
        console.log("READDDDDDD");
        socket.emit("message:read", {
          row_id: userId,
          room_id: conversation.id,
        });
      }
    };

    sendMessageRead();

    const messageReadInterval = setInterval(() => {
      sendMessageRead();
    }, 30000);

    return () => {
      clearInterval(messageReadInterval);
    };
  }, [socket, conversation?.id, userId, isConnected]);

  if (!isConnected) {
    return (
      <div className={styles.messagesList}>
        <div className={styles.connectionStatus}>
          <div className={styles.statusIcon}>⚠️</div>
          <p>Connecting to chat server...</p>
        </div>
      </div>
    );
  }

  if (!conversation?.id) {
    return (
      <div className={styles.messagesList}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>💬</div>
          <h3>Select a conversation</h3>
          <p>Choose a room to start chatting</p>
        </div>
      </div>
    );
  }

  if (localMessages.length === 0) {
    return (
      <div className={styles.messagesList}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>💬</div>
          <h3>No messages yet</h3>
          <p>Start the conversation by sending a message</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.messagesList}
      ref={messagesContainerRef}
      onScroll={handleScroll}>
      <div className={styles.messagesContainer}>
        {pagination.isLoadingMore && (
          <div className={styles.loadingMore}>
            <div className={styles.loadingSpinner}>⏳</div>
            <span>Loading more messages...</span>
          </div>
        )}

        {messageGroups.map((group, groupIndex) => (
          <div key={`${group.date}-${groupIndex}`}>
            <DateSeparator date={group.date} />
            {group.messages.map((message, messageIndex) => (
              <MessageBubble
                conversation={conversation}
                rooms={rooms}
                key={`${message.id || message._id || messageIndex}-${
                  message.type || "text"
                }-${message.timestamp}`}
                message={message}
                isOwn={message.from === loggedInUser}
                showAvatar={
                  messageIndex === 0 ||
                  group.messages[messageIndex - 1].senderId !== message.senderId
                }
              />
            ))}
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessagesList;
