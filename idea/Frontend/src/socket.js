import { io } from "socket.io-client";

const socket = io("https://idea-sable.vercel.app", {
    autoConnect: false,
});

export const connectSocket = (token) => {
    if (!socket.connected) {
        socket.auth = { token }; 
        socket.connect();
    }
};

export default socket;
