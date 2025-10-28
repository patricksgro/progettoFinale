import { useEffect, useState, useRef } from "react";
import socket, { connectSocket } from "../socket";
import axios from "axios";
import MessageInput from "./MessageInput";
import { useAuthContext } from "../../context/authContext";
import { Modal } from "react-bootstrap";
import { sendMessage } from "../../data/messagges";

function Chat({ recipientId, show, close, currentUser }) {
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
                    `https://idea-s74i.onrender.com/messages/${recipientId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setMessages(res.data);
                console.log(messages)
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
    const handleSendMessage = async (text) => {
        const msgData = {
            receiverId: recipientId,
            text,
            createdAt: new Date().toISOString(),
        };

        socket.emit("send_message", msgData);
        await sendMessage(msgData.receiverId, { text })
        setMessages((prev) => [
            ...prev,
            { ...msgData, senderId: loggeedUser._id },
        ]);
    };

    return (
        <Modal show={show} onHide={close} centered>
            <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-3"
                aria-label="Close"
                onClick={close}
                style={{ zIndex: 1056 }} // sopra tutto
            ></button>
            <Modal.Header>
                <h2 className="">Live chat con {currentUser.name}</h2>
            </Modal.Header>
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
                            {msg.text}
                            {msg.createdAt && (
                                <div
                                    style={{
                                        fontSize: "0.75rem",
                                        marginTop: "4px",
                                        opacity: 0.7,
                                        textAlign:
                                            msg.senderId === loggeedUser._id ? "right" : "left",
                                    }}
                                >
                                    {new Date(msg.createdAt).toLocaleDateString([], {
                                        day: "2-digit",
                                        month: "2-digit",
                                    })}{" "}
                                    alle{" "}
                                    {new Date(msg.createdAt).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </div>
                            )}
                        </div>
                    ))}

                    <div ref={messagesEndRef} />
                    <MessageInput onSend={handleSendMessage} />
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default Chat;
