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
    console.log("🔌 Nuovo utente connesso:", socket.id);

    // Autenticazione socket tramite token JWT
    socket.on("authenticate", (token) => {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.id;
        socket.join(decoded.id);
        console.log(`Utente ${decoded.id} autenticato e unito alla propria stanza`);
      } catch {
        socket.emit("unauthorized");
        socket.disconnect();
      }
    });

    // Inoltro messaggi 1-to-1 (senza salvare nel DB)
    socket.on("send_message", ({ receiverId, message }) => {
      console.log(`Messaggio da ${socket.userId} a ${receiverId}: ${message}`);
      io.to(receiverId).emit("receive_message", {
        senderId: socket.userId,
        text: message,
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
