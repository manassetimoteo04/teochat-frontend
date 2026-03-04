import { io } from "socket.io-client";

let socket = null;

function getStoredToken() {
  const raw = localStorage.getItem("token");
  if (!raw) return "";

  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

function createSocket() {
  return io(import.meta.env.VITE_SOCKET_URL, {
    withCredentials: true,
    transports: ["websocket", "polling"],
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 15000,
    randomizationFactor: 0.5,
    timeout: 20000,
  });
}

export function getSocket() {
  if (!socket) {
    socket = createSocket();
  }

  return socket;
}

export function ensureSocketConnected() {
  const client = getSocket();
  client.auth = {
    ...(client.auth || {}),
    token: getStoredToken(),
  };

  if (!client.connected) {
    client.connect();
  }

  return client;
}

export function disconnectSocket() {
  if (!socket) return;
  socket.disconnect();
}

export function emitWithTimeout(event, payload, timeout = 12000) {
  const client = ensureSocketConnected();

  return new Promise((resolve, reject) => {
    client.timeout(timeout).emit(event, payload, (err, response) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}
