import { io } from "socket.io-client";

let socket = null;

export function getSocket() {
  if (!socket) {
    socket = io(import.meta.env.VITE_API_URL || "http://localhost:5000", {
      withCredentials: true,
      transports: ["websocket"],
    });
  }

  return socket;
}
