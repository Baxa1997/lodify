import React, {useMemo} from "react";
import {Flex, Box, Text} from "@chakra-ui/react";
import TextMessage from "./TextMessage";
import FileMessage from "./FileMessage";
import ImageMessage from "./ImageMessage";
import AudioMessage from "./AudioMessage";
import VideoMessage from "./VideoMessage";

const MessageBubble = ({rooms = [], message, isOwn}) => {
  const {message: content, created_at, type, fileInfo} = message;

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
    audio: AudioMessage,
    video: VideoMessage,
  };

  const MessageComponent = messageComponents[normalizedType] || TextMessage;

  return isOwn ? (
    <Flex justifyContent="flex-end" p="12px 0" gap="12px">
      <Box w="500px">
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="500" color="#181D27" fontSize="14px">
            You
          </Text>
          <Text fontWeight="400" color="#535862" fontSize="12px">
            {messageTime}
          </Text>
        </Flex>

        <Box
          bg="#EF6820"
          color="#fff"
          borderRadius="8px"
          borderTopRightRadius="0">
          <MessageComponent
            isOwn={isOwn}
            content={content}
            fileInfo={fileInfo}
          />
        </Box>
      </Box>
    </Flex>
  ) : (
    <Flex p="12px 0" gap="12px">
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
        {sender?.to_name?.[0]}
      </Box>

      <Box w="500px">
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="500" color="#181D27" fontSize="14px">
            {sender?.to_name}
          </Text>
          <Text fontWeight="400" color="#535862" fontSize="12px">
            {messageTime}
          </Text>
        </Flex>

        <Box
          bg="#fff"
          color="#181D27"
          borderRadius="8px"
          borderTopLeftRadius="0"
          border="1px solid #E9EAEB">
          <MessageComponent content={content} fileInfo={fileInfo} />
        </Box>
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
    prevProps.isOwn === nextProps.isOwn &&
    JSON.stringify(prevProps.message?.fileInfo) ===
      JSON.stringify(nextProps.message?.fileInfo);

  return isSame;
});
