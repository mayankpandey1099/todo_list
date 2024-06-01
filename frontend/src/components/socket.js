import io from "socket.io-client";

let socket;

export const connectWebSocket = (url) => {
  socket = io(url);
  return socket;
};

export const disconnectWebSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

export const getSocket = () => {
  if (!socket) {
    throw new Error(
      "Socket not initialized. Please call connectWebSocket first."
    );
  }
  return socket;
};
