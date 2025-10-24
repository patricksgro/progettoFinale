import { Button, Col, Container, Row, Image, Badge } from "react-bootstrap"
import { NavLink, Outlet, useParams } from "react-router-dom"
import { useAuthContext } from "../../context/authContext"
import ProfileOptionsSimple from "../components/ProfileOptionsSimple"
import { getSingleUser } from "../../data/auth"
import { useEffect, useState } from "react"
import { cancelFriendRequest, getFriends, getPendingRequests, sendRequest } from "../../data/friendship"
import { User, Heart, ImageIcon, Users, Send, X, Mail, Clock } from "lucide-react"
import Chat from "../components/Chat"
import FooterPages from "../components/FooterPages"
import '../style/style.css'

function UserProfile() {
    const [currentUser, setCurrentUser] = useState(null)
    const { id } = useParams()
    const { loggeedUser } = useAuthContext()
    const [request, setRequest] = useState(false)
    const [modalMessages, setModalMessagges] = useState(false)
    const [friendsState, setFriendsState] = useState(null)

    const isOwner = loggeedUser && loggeedUser._id === id

    useEffect(() => {
        if (isOwner) {
            setCurrentUser(loggeedUser)
        } else {
            getSingleUser(id).then(user => setCurrentUser(user))
        }
    }, [id, loggeedUser, isOwner])

    //FRIENDSHIP

    useEffect(() => {
        pendingRequest()
        getUserFriends()
    }, [])

    const getUserFriends = async () => {
        const friends = await getFriends(id)
        setFriendsState(friends)
        console.log(friends)
        console.log(friendsState)
    }

    const isFriend = friendsState?.some(f =>
        f.status === "accepted" &&
        (
            (f.requester?._id === loggeedUser?._id && f.recipient?._id === id) ||
            (f.recipient?._id === loggeedUser?._id && f.requester?._id === id)
        )
    )

    const pendingRequest = async () => {
        await getPendingRequests()
    }

    const sendFriendRequest = async () => {
        await sendRequest(id)
    }

    const cancelRequest = async () => {
        await cancelFriendRequest(id)
    }

    //MESSAGES

    const handleOpenModalMessages = () => {
        setModalMessagges(true)
    }

    const handleCloseModalMessages = () => {
        setModalMessagges(false)
    }

    return (
        <>
            {loggeedUser && currentUser && id && (
                <Container
                    fluid
                    style={{
                        paddingTop: '140px',
                        background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
                        paddingBottom: '60px',
                        minHeight: "100vh"
                    }}
                >
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        {/* BLOCCO SUPERIORE */}
                        <Row className="align-items-center mb-5">
                            {/* AVATAR + NOME */}
                            <Col lg={4} className="text-center mb-4 mb-lg-0">
                                <div style={{ position: "relative", display: "inline-block" }}>
                                    <Image
                                        src={currentUser.avatar}
                                        roundedCircle
                                        style={{
                                            width: "220px",
                                            height: "220px",
                                            objectFit: "cover",
                                            border: "4px solid #fff",
                                            boxShadow: "0 0 15px rgba(0,0,0,0.1)"
                                        }}
                                    />
                                    <Badge
                                        bg="success"
                                        pill
                                        style={{
                                            position: "absolute",
                                            bottom: 5,
                                            right: 5,
                                            width: "18px",
                                            height: "18px",
                                            border: "2px solid #fff"
                                        }}
                                    />
                                </div>

                                <h2 className="mt-3 mb-1">{currentUser.name} {currentUser.surname}</h2>
                                <p className="text-muted mb-3 d-flex justify-content-center align-items-center gap-2">
                                    <Mail size={16} /> {currentUser.email}
                                </p>

                                {/* Pulsanti */}
                                <div className="d-flex justify-content-center gap-3 flex-wrap">
                                    {!isOwner && (
                                        isFriend ? (
                                            <Button
                                                variant="primary"
                                                className="d-flex align-items-center gap-2 px-4 py-2 rounded-pill"
                                                style={{
                                                    background: "linear-gradient(90deg,#22c55e,#16a34a)",
                                                    border: "none"
                                                }}
                                            >
                                                <Users size={18} /> Amici
                                            </Button>
                                        ) : request ? (
                                            <Button
                                                variant="outline-secondary"
                                                className="d-flex align-items-center gap-2 px-4 py-2 rounded-pill"
                                                onClick={() => { cancelRequest(); setRequest(false) }}
                                            >
                                                <X size={18} /> Cancella richiesta
                                            </Button>
                                        ) : (
                                            <Button
                                                className="d-flex align-items-center gap-2 px-4 py-2 rounded-pill"
                                                style={{
                                                    background: "linear-gradient(90deg,#22c55e,#16a34a)",
                                                    border: "none"
                                                }}
                                                onClick={() => { sendFriendRequest(); setRequest(true) }}
                                            >
                                                <Send size={18} /> Invia richiesta
                                            </Button>
                                        )
                                    )}
                                </div>
                            </Col>

                            {/* BIO + STATISTICHE */}
                            <Col lg={8}>
                                <div className="text-center my-4 fs-5 text-secondary fst-italic">
                                    {currentUser.bio || "Nessuna biografia disponibile."}
                                </div>

                                <div className="d-flex justify-content-around text-center py-3 border-bottom">
                                    <div className="d-flex flex-column align-items-center">
                                        <User size={28} className="text-primary mb-2" />
                                        <strong>{currentUser.posts?.length || 0}</strong>
                                        <span className="text-muted">Posts</span>
                                    </div>
                                    <div className="d-flex flex-column align-items-center">
                                        <Users size={28} className="text-primary mb-2" />
                                        <strong>{currentUser.friends?.length || 0}</strong>
                                        <span className="text-muted">Friends</span>
                                    </div>
                                    <div className="d-flex flex-column align-items-center">
                                        <Clock size={28} className="text-primary mb-2" />
                                        <strong>{new Date(currentUser.createdAt).getFullYear()}</strong>
                                        <span className="text-muted">Joined</span>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        {/* NAVIGATION TABS */}
                        <div className="d-flex justify-content-start align-items-center gap-4 mb-4 border-bottom pb-2 flex-wrap">
                            {[
                                { key: "posts", icon: <User size={18} />, label: "Posts" },
                                { key: "friends", icon: <Users size={18} />, label: "Friends" },
                                { key: "galleries", icon: <ImageIcon size={18} />, label: "Galleries" },
                                { key: "about", icon: <Heart size={18} />, label: "About" },
                            ].map(tab => (
                                <NavLink
                                    key={tab.key}
                                    to={tab.key}
                                    style={({ isActive }) => ({
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        fontSize: "1.1rem",
                                        fontWeight: isActive ? "700" : "500",
                                        color: isActive ? "#3b82f6" : "#6b7280",
                                        textDecoration: "none",
                                        paddingBottom: "6px",
                                        borderBottom: isActive ? "3px solid #3b82f6" : "3px solid transparent",
                                        transition: "all 0.3s"
                                    })}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </NavLink>
                            ))}
                            <div style={{ marginLeft: "auto" }}>
                                {loggeedUser && isOwner ? <ProfileOptionsSimple /> :
                                    <Button
                                        onClick={handleOpenModalMessages}
                                        variant="success"
                                        className="d-flex align-items-center gap-2 px-4 py-2 rounded-pill"
                                        style={{
                                            background: "linear-gradient(90deg,#22c55e,#16a34a)",
                                            border: "none"
                                        }}>Messaggia
                                    </Button>}
                            </div>
                        </div>

                        {/* CONTENUTO PRINCIPALE */}
                        <div style={{ minHeight: "400px" }}>
                            <Outlet context={{ currentUser, isOwner }} />
                        </div>
                    </div>
                </Container>
            )}

            {
                modalMessages && (
                    <Chat
                        loggeedUser={loggeedUser}
                        recipientId={id}
                        show={modalMessages}
                        close={handleCloseModalMessages} />
                )

            }
            <FooterPages />
        </>
    )
}

export default UserProfile
