import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {io} from "socket.io-client";

const SocketContext = createContext(null);

const SOCKET_URL = "https://chat-service.u-code.io";

export const SocketProvider = ({children}) => {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!socketRef.current) {
      const newSocket = io(SOCKET_URL, {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
        autoConnect: true,
        withCredentials: true,
      });

      socketRef.current = newSocket;
      setSocket(newSocket);

      newSocket.on("connect", (data) => {
        console.log("connection", data);
        setIsConnected(true);
        setConnectionError(null);
      });

      newSocket.on("disconnect", (reason) => {
        setIsConnected(false);
      });

      newSocket.on("connect_error", (err) => {
        setConnectionError(err.message);
        setIsConnected(false);
      });

      newSocket.on("reconnect", (attemptNumber) => {
        setIsConnected(true);
        setConnectionError(null);
      });

      newSocket.on("reconnect_attempt", (attemptNumber) => {
        console.log("🔄 Reconnection attempt", attemptNumber);
      });

      newSocket.on("reconnect_error", (err) => {
        console.error("❌ Reconnection error:", err.message);
      });

      newSocket.on("reconnect_failed", () => {
        console.error("❌ Reconnection failed");
        setConnectionError("Failed to reconnect to chat service");
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off("connect");
        socketRef.current.off("disconnect");
        socketRef.current.off("connect_error");
        socketRef.current.off("reconnect");
        socketRef.current.off("reconnect_attempt");
        socketRef.current.off("reconnect_error");
        socketRef.current.off("reconnect_failed");
        socketRef.current.disconnect();
        socketRef.current = null;
        setSocket(null);
      }
    };
  }, []);

  const value = {
    socket,
    isConnected,
    connectionError,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context.socket;
};

export const useSocketConnection = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketConnection must be used within a SocketProvider");
  }
  return {
    isConnected: context.isConnected,
    connectionError: context.connectionError,
  };
};
