import React, {useMemo} from "react";
import {Flex, Box, Text} from "@chakra-ui/react";
import TextMessage from "./TextMessage";
import FileMessage from "./FileMessage";
import ImageMessage from "./ImageMessage";
import AudioMessage from "./AudioMessage";
import VideoMessage from "./VideoMessage";

const MessageBubble = ({rooms = [], message, isOwn, conversation}) => {
  const {message: content, created_at, type, fileInfo, read_at} = message;

  const isRead = useMemo(() => {
    if (!isOwn) return false;
    return !!read_at;
  }, [isOwn, read_at]);

  const normalizedType = type ? String(type).toLowerCase().trim() : "text";
  const sender = useMemo(
    () =>
      rooms?.find((room) => room.id === message?.room_id) || {
        to_name: "Unknown",
      },
    [rooms, message?.room_id]
  );

  const messageTime = useMemo(
    () =>
      new Date(created_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    [created_at]
  );

  const messageComponents = {
    text: TextMessage,
    file: FileMessage,
    image: ImageMessage,
    voice: AudioMessage,
    video: VideoMessage,
  };

  const MessageComponent = messageComponents[normalizedType] || TextMessage;

  const getMessageWidth = () => {
    if (normalizedType === "text") {
      return "fit-content";
    } else {
      return "500px";
    }
  };

  const messageWidth = getMessageWidth();

  return isOwn ? (
    <Flex ml="auto" justifyContent="flex-end" p="6px 0" gap="12px">
      <Box maxW="500px" w={messageWidth}>
        <Box
          bg="#E0F0FF"
          color="#080707"
          borderRadius="8px"
          borderBottomRightRadius="0"
          w="100%">
          <Flex gap="8px" alignItems="flex-end" position="relative">
            <Box flex="1">
              <MessageComponent
                isOwn={isOwn}
                content={content}
                fileInfo={fileInfo}
              />
            </Box>

            {/* <Flex
              gap="2px"
              alignItems="center"
              fontSize="14px"
              color="#080707"
              ml="4px">
              <Text fontSize="12px" color="#080707" opacity={0.9} mr="4px">
                {messageTime}
              </Text>
              {isRead ? (
                <svg
                  width="26"
                  height="14"
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0 6L5 11L11 1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 6L11 11L16 1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0 6L5 11L11 1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </Flex> */}
          </Flex>
        </Box>
        <Flex
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
          gap="4px">
          {isRead && <img src="/img/doublecheck.svg" alt="read" />}
          <Text fontWeight="400" color="#535862" fontSize="12px">
            {messageTime}
          </Text>
        </Flex>
      </Box>
    </Flex>
  ) : (
    <Flex p="6px 0" gap="12px">
      <Box
        w="40px"
        h="40px"
        borderRadius="50%"
        border="1px solid #E9EAEB"
        color="#fff"
        bg="#F79009"
        display="flex"
        alignItems="center"
        justifyContent="center">
        {conversation?.type === "group"
          ? message?.from?.[0]
          : sender?.to_name?.[0]}
      </Box>

      <Box maxW="500px" w={messageWidth}>
        <Flex justifyContent="space-between" alignItems="center"></Flex>

        <Box
          bg="#E9EAED"
          color="#181D27"
          borderRadius="20px"
          borderBottomLeftRadius="4px"
          border="1px solid #E9EAEB"
          w="100%">
          <MessageComponent content={content} fileInfo={fileInfo} />
        </Box>
        <Text mt="2px" fontWeight="400" color="#535862" fontSize="12px">
          {messageTime}
        </Text>
      </Box>
    </Flex>
  );
};

export default React.memo(MessageBubble, (prevProps, nextProps) => {
  const isSame =
    prevProps.message?.type === nextProps.message?.type &&
    prevProps.message?.message === nextProps.message?.message &&
    prevProps.message?.id === nextProps.message?.id &&
    prevProps.message?.created_at === nextProps.message?.created_at &&
    prevProps.message?.read_at === nextProps.message?.read_at &&
    prevProps.isOwn === nextProps.isOwn &&
    JSON.stringify(prevProps.message?.fileInfo) ===
      JSON.stringify(nextProps.message?.fileInfo);

  return isSame;
});
