import { useEffect, useState, useRef } from "react";
import socket, { connectSocket } from "../socket";
import axios from "axios";
import MessageInput from "./MessageInput";
import { useAuthContext } from "../../context/authContext";
import { Modal } from "react-bootstrap";

function Chat({ recipientId, show, close }) {
    const { token, loggeedUser } = useAuthContext();
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    // Connessione socket e ricezione messaggi
    useEffect(() => {
        if (!token) return;

        connectSocket(token);

        socket.on("receive_message", (msg) => {
            // Controlla che il messaggio sia tra gli utenti giusti
            if (
                (msg.senderId === recipientId && msg.receiverId === loggeedUser._id) ||
                (msg.senderId === loggeedUser._id && msg.receiverId === recipientId)
            ) {
                setMessages((prev) => [...prev, msg]);
            }
        });

        return () => {
            socket.off("receive_message");
        };
    }, [recipientId, token, loggeedUser]);

    // Recupera messaggi storici
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/messages/${recipientId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setMessages(res.data);
            } catch (error) {
                console.error("Errore caricamento messaggi:", error);
            }
        };

        if (recipientId && token) fetchMessages();
    }, [recipientId, token]);

    // Scroll automatico verso il basso
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Invia messaggio
    const sendMessage = (text) => {
        const msgData = {
            receiverId: recipientId,
            message: text,
        };

        socket.emit("send_message", msgData);
        setMessages((prev) => [
            ...prev,
            { ...msgData, senderId: loggeedUser._id },
        ]);
    };

    return (
        <Modal show={show} onHide={close} centered>
            <Modal.Body
                style={{
                    backgroundColor: "#f8fafc",
                    borderRadius: "15px",
                    padding: "20px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "500px",
                        border: "1px solid #e2e8f0",
                        borderRadius: "12px",
                        padding: "10px",
                        overflowY: "auto",
                        background: "#f8fafc",
                    }}
                >
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            style={{
                                alignSelf:
                                    msg.senderId === loggeedUser._id ? "flex-end" : "flex-start",
                                background: msg.senderId === loggeedUser._id ? "#4f46e5" : "#e2e8f0",
                                color: msg.senderId === loggeedUser._id ? "#fff" : "#1e293b",
                                padding: "8px 12px",
                                borderRadius: "16px",
                                margin: "4px 0",
                                maxWidth: "75%",
                                wordWrap: "break-word",
                            }}
                        >
                            {msg.message}
                        </div>
                    ))}

                    <div ref={messagesEndRef} />
                    <MessageInput onSend={sendMessage} />
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default Chat;
