import { io } from "socket.io-client";

let socket = null;

export function getSocket() {
  if (!socket) {
    socket = io("http://localhost:5000", {
      withCredentials: true,
      auth: {
        token:
          typeof window !== "undefined" ? localStorage.getItem("token") : "",
      },
    });
  }

  return socket;
}
