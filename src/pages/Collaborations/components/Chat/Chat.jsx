import React, {useState, useEffect} from "react";
import {ChatProvider} from "../../context/ChatContext";
import ConversationList from "../ConversationList/ConversationList";
import ChatArea from "../ChatArea/ChatArea";
import styles from "./Chat.module.scss";
import {useSelector} from "react-redux";
import {useSocket, useSocketConnection} from "@context/SocketProvider";
import AddRoom from "../AddRoom";
import {useLocation} from "react-router-dom";

const Chat = () => {
  const {state: locationState} = useLocation();
  const socket = useSocket();
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const {isConnected, connectionError} = useSocketConnection();
  const [rooms, setRooms] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [hasProcessedTripId, setHasProcessedTripId] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const loginName = useSelector((state) => state.auth.user_data?.login);
  const projectId = useSelector((state) => state.auth.projectId);

  const userId = useSelector((state) => state.auth.userInfo?.id);
  const loginUser = useSelector((state) => state.auth.user_data?.login);
  const tripId = locationState?.tripId;
  const tripName = locationState?.tripName;

  useEffect(() => {
    setHasProcessedTripId(false);
  }, [tripId]);

  useEffect(() => {
    if (!socket || !isConnected || !userId) return;

    console.log("Setting up socket listeners for user:", userId);
    socket.emit("rooms list", {row_id: userId});

    const handleRoomsList = (data) => {
      setRooms(data || []);
    };

    const handleRoomsUpdate = (data) => {
      console.log("Rooms update received:", data);

      // Handle different possible data structures
      let roomId = null;
      let messageData = null;

      if (data && data.room_id) {
        // Format: { room_id: "123", message: "Hello", created_at: "..." }
        roomId = data.room_id;
        messageData = {
          last_message: data.message || data.content,
          last_message_created_at: data.created_at || data.timestamp,
          unread_count: data.unread_count,
        };
      } else if (data && data.room && data.room.id) {
        // Format: { room: { id: "123", last_message: "Hello", ... } }
        roomId = data.room.id;
        messageData = {
          last_message: data.room.last_message || data.room.message,
          last_message_created_at:
            data.room.last_message_created_at || data.room.created_at,
          unread_count: data.room.unread_count,
        };
      } else if (data && data.id) {
        // Format: { id: "123", last_message: "Hello", ... }
        roomId = data.id;
        messageData = {
          last_message: data.last_message || data.message,
          last_message_created_at:
            data.last_message_created_at || data.created_at,
          unread_count: data.unread_count,
        };
      }

      if (roomId && messageData) {
        console.log(
          "Updating room ID:",
          roomId,
          "with message:",
          messageData.last_message
        );

        setRooms((prevRooms) => {
          const roomIndex = prevRooms.findIndex((room) => room.id === roomId);

          if (roomIndex !== -1) {
            const updatedRooms = [...prevRooms];
            updatedRooms[roomIndex] = {
              ...updatedRooms[roomIndex],
              last_message: messageData.last_message,
              last_message_created_at: messageData.last_message_created_at,
              unread_count:
                messageData.unread_count ||
                updatedRooms[roomIndex].unread_count,
            };

            console.log(
              "Successfully updated room:",
              updatedRooms[roomIndex].to_name
            );
            return updatedRooms;
          } else {
            console.warn("Room not found with ID:", roomId);
            return prevRooms;
          }
        });

        // Also set the last message for any other use
        setLastMessage(messageData.last_message);
      } else {
        console.warn("Invalid room update data structure:", data);
      }
    };

    const handleError = (error) => {
      console.error("Socket error received:", error);
    };

    const handleMessageSent = (data) => {
      console.log("Message sent confirmation:", data);
    };

    // Debug: Listen to all socket events
    const handleAllEvents = (eventName, ...args) => {
      console.log("Socket event received:", eventName, args);
    };

    socket.on("rooms list", handleRoomsList);
    socket.on("rooms update", handleRoomsUpdate);
    socket.on("error", handleError);
    socket.on("message sent", handleMessageSent);

    // Add debug listener for all events
    socket.onAny(handleAllEvents);

    return () => {
      socket.off("rooms list", handleRoomsList);
      socket.off("rooms update", handleRoomsUpdate);
      socket.off("error", handleError);
      socket.off("message sent", handleMessageSent);
      socket.offAny(handleAllEvents);
    };
  }, [socket, isConnected, userId]);

  useEffect(() => {
    const existingRoom = rooms.find((room) => room.item_id === tripId);

    if (Boolean(existingRoom?.id)) {
      setConversation(existingRoom);
      setHasProcessedTripId(true);
    } else if (
      Boolean(tripId && tripName) &&
      Boolean(socket) &&
      Boolean(!conversation?.id)
    ) {
      setIsInitializing(true);
      setHasProcessedTripId(true);

      socket.emit(
        "create room",
        {
          name: "",
          type: "group",
          row_id: userId,
          item_id: tripId,
          from_name: loginName,
          project_id: projectId,
          to_name: tripName,
        },
        (response) => {
          if (response && response.room) {
            setConversation(response.room);
            setRooms((prevRooms) => [...prevRooms, response.room]);
            setIsInitializing(false);
          } else if (response && response.error) {
            console.error("Error creating room:", response.error);
            setIsInitializing(false);
          }
        }
      );
    } else {
      setIsInitializing(false);
      setConversation(existingRoom);
    }
  }, [
    tripId,
    rooms.length,
    socket,
    userId,
    isInitializing,
    loginName,
    projectId,
    hasProcessedTripId,
  ]);

  const sendMessage = (content, type = "text", fileInfo = null) => {
    if (!conversation?.id || !loginUser) {
      console.error("Cannot send message: missing conversation or user");
      return;
    }

    if (!isConnected) {
      console.error("Cannot send message: socket not connected");
      return;
    }

    const messageData = {
      room_id: conversation.id,
      content,
      from: loginUser,
      type: type,
      timestamp: new Date().toISOString(),
      row_id: userId,
      file: fileInfo?.url,
    };

    socket.emit("chat message", messageData, (response) => {
      if (response && response.error) {
        console.error("Server error response:", response.error);
      } else {
        console.log("Server success response:", response);
      }
    });
  };

  const handleConversationSelect = (selectedConversation) => {
    setConversation(selectedConversation);
  };

  return (
    <ChatProvider>
      <div className={styles.chatContainer}>
        <ConversationList
          setIsAddRoomOpen={setIsAddRoomOpen}
          rooms={rooms}
          setConversation={handleConversationSelect}
          isConnected={isConnected}
        />
        <ChatArea
          rooms={rooms}
          setIsAddRoomOpen={setIsAddRoomOpen}
          conversation={conversation}
          onSendMessage={sendMessage}
          isConnected={isConnected}
          isInitializing={isInitializing}
          tripId={tripId}
        />

        <AddRoom
          isOpen={isAddRoomOpen}
          onClose={() => setIsAddRoomOpen(false)}
          text="Add Chat"
        />
      </div>
    </ChatProvider>
  );
};

export default Chat;
