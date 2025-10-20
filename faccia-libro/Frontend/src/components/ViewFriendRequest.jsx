import { useEffect, useState } from "react"
import { getPendingRequests } from "../../data/friendship"

function ViewFriendRequest() {

    const [open, setOpen] = useState(false)
    const [sender, setSender] = useState()

    useEffect(() => {
        getFriendsRequestsFromUsers()
    }, [])

    const getFriendsRequestsFromUsers = async () => {
        const results = await getPendingRequests()
        setSender(results)
        console.log(results)
    }

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            {/* 🔔 Icona notifica */}
            <div
                style={{
                    position: "relative",
                    cursor: "pointer",
                    padding: "6px",
                    borderRadius: "50%",
                    transition: "background 0.2s ease",
                }}
                onClick={() => setOpen(!open)}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
                <img
                    src="public/icons8-bell-50.png"
                    alt="notifications"
                    width={25}
                />
                {/* 🔴 Puntino notifica */}
                <span
                    style={{
                        position: "absolute",
                        top: "4px",
                        right: "4px",
                        width: "8px",
                        height: "8px",
                        background: "#ef4444",
                        borderRadius: "50%",
                    }}
                ></span>
            </div>

            {open && (
                <div
                    style={{
                        position: "absolute",
                        top: "40px",
                        right: 0,
                        background: "#ffffff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "12px",
                        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                        width: "320px",
                        overflow: "hidden",
                        animation: "fadeIn 0.2s ease",
                    }}
                >
                    {/* 🔹 Header tendina */}
                    <div
                        style={{
                            padding: "10px 16px",
                            borderBottom: "1px solid #f1f5f9",
                            background: "#f8fafc",
                        }}
                    >
                        <h4
                            style={{
                                fontSize: "1rem",
                                margin: 0,
                                fontWeight: "600",
                                color: "#0f172a",
                            }}
                        >
                            Richieste di amicizia
                        </h4>
                    </div>

                    {/* 🔹 Corpo (lista richieste) */}
                    <div
                        style={{
                            maxHeight: "250px",
                            overflowY: "auto",
                            padding: "12px 16px",
                        }}
                    >
                        {sender ? (
                            <div
                                className="d-flex align-items-center justify-content-between p-2 rounded-3"
                                style={{
                                    transition: "background 0.2s ease",
                                    cursor: "pointer",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                            >
                                <div className="d-flex align-items-center">
                                    <img
                                        src={sender.requester.avatar}
                                        alt="user avatar"
                                        width="45"
                                        height="45"
                                        style={{
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                            border: "2px solid #fff",
                                            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                                        }}
                                    />
                                    <div style={{ marginLeft: "12px" }}>
                                        <h5
                                            style={{
                                                margin: 0,
                                                fontSize: "0.95rem",
                                                fontWeight: "600",
                                                color: "#1e293b",
                                            }}
                                        >
                                            {sender.requester.name} {sender.requester.surname}
                                        </h5>
                                        <p
                                            style={{
                                                margin: 0,
                                                fontSize: "0.8rem",
                                                color: "#64748b",
                                            }}
                                        >
                                            Ti ha inviato una richiesta
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p
                                style={{
                                    textAlign: "center",
                                    color: "#94a3b8",
                                    fontSize: "0.9rem",
                                    marginTop: "10px",
                                }}
                            >
                                Nessuna richiesta ricevuta
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ViewFriendRequest
