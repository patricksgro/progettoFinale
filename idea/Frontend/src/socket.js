import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
    autoConnect: false,
});

export const connectSocket = (token) => {
    if (!socket.connected) {
        socket.auth = { token }; // token passato all'handshake
        socket.connect();
    }
};

export default socket;
