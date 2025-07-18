import {io} from "socket.io-client"

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
  transports: ["websocket"],
  reconnectionAttempts: 5,     // Try to reconnect 5 times before giving up
  reconnectionDelay: 1000,     // Wait 1 second between attempts
});

// Log when disconnected
socket.on("disconnect", (reason) => {
  console.warn("Socket disconnected:", reason);
});

// Log reconnection attempts
socket.on("reconnect_attempt", (attemptNumber) => {
  console.log(`Reconnecting... (attempt ${attemptNumber})`);
});

// Log when connected
socket.on("connect", () => {
  console.log("Connected to socket server");
});

// Handle connection error
socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err.message);
});

export default socket;