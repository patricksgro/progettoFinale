import { Server } from "socket.io";
import jwt from "jsonwebtoken";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    try {
      const token = socket.handshake.auth.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      socket.join(decoded.id);
      console.log(`🔌 Utente ${decoded.id} autenticato e connesso`);
    } catch {
      socket.emit("unauthorized");
      socket.disconnect();
      return;
    }

    socket.on("send_message", ({ receiverId, text }) => {
      console.log(`Messaggio da ${socket.userId} a ${receiverId}: ${text}`);
      io.to(receiverId).emit("receive_message", {
        senderId: socket.userId,
        receiverId,
        text,
      });
    });

    socket.on("disconnect", () => {
      console.log("❌ Utente disconnesso:", socket.id);
    });
  });

  return io;
};

export const getIo = () => {
  if (!io) throw new Error("Socket.io non inizializzato!");
  return io;
};
