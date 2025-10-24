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
    socket.emit("rooms list", {row_id: userId});

    const handleRoomsList = (data) => {
      console.log("DATA=====>", data);
      setRooms(data || []);
    };

    const handleError = (error) => {
      console.error("Socket error received:", error);
    };

    const handleMessageSent = (data) => {
      console.log("Message sent confirmation:", data);
    };
    console.log("SOCKET=====> ROOM LIST");
    socket.on("rooms list", handleRoomsList);
    socket.on("error", handleError);
    socket.on("message sent", handleMessageSent);

    return () => {
      socket.off("rooms list", handleRoomsList);
      socket.off("error", handleError);
      socket.off("message sent", handleMessageSent);
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
      console.error("❌ Cannot send message: missing conversation or user", {
        conversationId: conversation?.id,
        loginUser,
      });
      return;
    }

    if (!isConnected) {
      console.error("❌ Cannot send message: socket not connected", {
        isConnected,
      });
      return;
    }

    const messageData = {
      room_id: conversation.id,
      content: content,
      from: loginUser,
      type: type,
      row_id: userId,
      file: fileInfo?.url || "",
    };

    console.log("SENDING MESSAGE EMIT");
    socket.emit("chat message", messageData, (response) => {
      if (response && response.error) {
        console.error("❌ Server error response:", response.error);
      } else {
        console.log("✅ Server success response:", response);
      }
    });
  };

  useEffect(() => {
    if (!socket || !userId) return;

    const handleChatMessage = (message) => {
      console.log("📨 Received chat message:", message);

      if (message && message.room_id) {
        console.log("🔄 Updating room with message:", message.room_id);

        setRooms((prevRooms) => {
          const roomIndex = prevRooms.findIndex(
            (room) => room.id === message.room_id
          );

          if (roomIndex !== -1) {
            const updatedRooms = [...prevRooms];
            const oldRoom = updatedRooms[roomIndex];

            updatedRooms[roomIndex] = {
              ...oldRoom,
              last_message: message.message,
              last_message_created_at: message.created_at,
              unread_count:
                message.from !== loginUser
                  ? (oldRoom.unread_count || 0) + 1
                  : oldRoom.unread_count,
            };

            console.log("✅ Room updated successfully:", {
              roomName: updatedRooms[roomIndex].to_name,
              newMessage: updatedRooms[roomIndex].last_message,
              from: message.from,
              isOwnMessage: message.from === loginUser,
            });

            return updatedRooms;
          } else {
            console.warn(
              "❌ Room not found for message:",
              message.room_id,
              "Available rooms:",
              prevRooms.map((r) => r.id)
            );
            return prevRooms;
          }
        });
      } else {
        console.warn("❌ Invalid message data:", message);
      }
    };

    const handleAllEvents = (eventName, ...args) => {
      console.log("🔌 Socket event:", eventName, args);
    };

    socket.on("chat message", handleChatMessage);
    socket.onAny(handleAllEvents);

    return () => {
      socket.off("chat message", handleChatMessage);
      socket.offAny(handleAllEvents);
    };
  }, [socket, userId, loginUser]);

  const handleConversationSelect = (selectedConversation) => {
    setConversation(selectedConversation);

    if (selectedConversation && selectedConversation.id) {
      setRooms((prevRooms) => {
        const roomIndex = prevRooms.findIndex(
          (room) => room.id === selectedConversation.id
        );
        if (roomIndex !== -1) {
          const updatedRooms = [...prevRooms];
          updatedRooms[roomIndex] = {
            ...updatedRooms[roomIndex],
            unread_count: 0,
          };
          return updatedRooms;
        }
        return prevRooms;
      });
    }
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
