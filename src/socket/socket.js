import {io} from "socket.io-client";

export const useSocket = () => {
  const socket = io("https://chat-service.u-code.io", {
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
    autoConnect: true,
    withCredentials: true,
  });

  return socket;
};
