import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { getAllPosts } from '../../data/post';
import ModalComment from './ModalComment';
import { dislikePost, getlikesPost, likePost } from '../../data/like';
import { motion } from "framer-motion"
import { useAuthContext } from '../../context/authContext';
import ModalCreatePost from './ModalCreatePost';
import { Link } from 'react-router-dom';

function Feed() {

    const { loggeedUser } = useAuthContext()

    const [unlike, setUnLike] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [modalCreatePost, setModalCreatePost] = useState(false)
    const [selectedPost, setSelectedPost] = useState(null)
    const [usersPost, setUsersPost] = useState(null)
    const [likesCount, setLikesCount] = useState({})

    const getAllUsersPost = async () => {
        const results = await getAllPosts()
        setUsersPost(results)

        results.forEach(async post => {
            const likes = await getlikesPost(post._id)
            setLikesCount(prev => ({
                ...prev,
                [post._id]: likes.length
            }))
        })
    }

    useEffect(() => {
        getAllUsersPost();
    }, [])

    const handleOpenModalComment = (post) => {
        setSelectedPost(post)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setSelectedPost(null)
        setShowModal(false)
    }

    //LIKE POST
    const handleLikeToggle = async (postID) => {
        if (unlike[postID]) {
            await dislikePost(postID);
            setLikesCount(prev => ({
                ...prev,
                [postID]: (prev[postID] || 1) - 1
            }))
        } else {
            await likePost(postID);
            setLikesCount(prev => ({
                ...prev,
                [postID]: (prev[postID] || 0) + 1
            }))
        }

        setUnLike(prev => ({
            ...prev,
            [postID]: !prev[postID]
        }))
    }

    const handleOpenModalCreatePost = () => {
        setModalCreatePost(true)
    }

    const handleCloseModalCreatePost = () => {
        setModalCreatePost(false)
    }

    return (
        <>

            {/* SEZIONE CREA POST */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="my-4"
                style={{
                    maxWidth: "52rem",
                    padding: "20px",
                    minWidth: "45rem",
                    margin: "0 auto",
                    borderRadius: "25px",
                    overflow: "hidden",
                    background: "#fff",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                    border: "1px solid #e2e8f0",
                }}
            >
                <div className="d-flex align-items-center gap-3 mb-3">
                    {/* Avatar utente loggato */}
                    <motion.img
                        src={loggeedUser && loggeedUser.avatar}
                        alt="User avatar"
                        className="rounded-circle"
                        style={{
                            width: "55px",
                            height: "55px",
                            objectFit: "cover",
                            border: "2px solid #fff",
                            boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
                        }}
                        whileHover={{ scale: 1.05 }}
                    />

                    {/* Input */}
                    <div
                        onClick={handleOpenModalCreatePost}
                        style={{
                            flex: 1,
                            background: "#f8fafc",
                            borderRadius: "20px",
                            padding: "10px 18px",
                            border: "1px solid #e2e8f0",
                            color: "#64748b",
                            cursor: "pointer",
                            transition: "0.2s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "#f8fafc")}
                    >
                        <span>Cosa stai pensando, {loggeedUser && loggeedUser.name}?</span>
                    </div>
                </div>

                {/* Divider */}
                <hr style={{ borderColor: "#e2e8f0", margin: "0 0 15px 0" }} />

                {/* Azioni “tipo di post” */}
                <div className="d-flex justify-content-between text-muted px-2">
                    <div className="d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
                        <i className="bi bi-image" style={{ color: "#22c55e" }}></i>
                        <small>Foto</small>
                    </div>
                    <div className="d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
                        <i className="bi bi-camera-video" style={{ color: "#3b82f6" }}></i>
                        <small>Video</small>
                    </div>
                    <div className="d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
                        <i className="bi bi-emoji-smile" style={{ color: "#f59e0b" }}></i>
                        <small>Stato</small>
                    </div>
                </div>
            </motion.div>

            {
                modalCreatePost && (
                    <ModalCreatePost
                        userData={loggeedUser}
                        show={modalCreatePost}
                        handleClose={handleCloseModalCreatePost} />
                )}

            {/* FEED POSTS USERS */}

            {usersPost &&
                [...usersPost]
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((post, index) => (
                        <motion.div
                            key={post._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="my-5"
                            style={{
                                maxWidth: "52rem",
                                padding: "15px",
                                minWidth: "45rem",
                                margin: "0 auto",
                                borderRadius: "25px",
                                overflow: "hidden",
                                background: "#fff",
                                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                                border: "1px solid #e2e8f0",
                            }}
                        >
                            {/* Header post */}
                            <Card.Body className="pb-2">
                                <div className="d-flex align-items-center mb-3">
                                    <div
                                        style={{
                                            position: "relative",
                                            width: "55px",
                                            height: "55px",
                                        }}
                                    >
                                        <motion.img
                                            src={post.author.avatar}
                                            alt={`${post.author.name} ${post.author.surname}`}
                                            className="rounded-circle"
                                            style={{
                                                width: "55px",
                                                height: "55px",
                                                objectFit: "cover",
                                                border: "2px solid #fff",
                                                boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
                                            }}
                                            whileHover={{ scale: 1.08 }}
                                        />
                                        {/* Badge piccolo online */}
                                        <span
                                            style={{
                                                position: "absolute",
                                                bottom: 0,
                                                right: 0,
                                                width: "12px",
                                                height: "12px",
                                                borderRadius: "50%",
                                                background: "#4ade80",
                                                border: "2px solid #fff",
                                            }}
                                        />
                                    </div>

                                    <div className="ms-3">
                                        <Card.Title className="my-0 fw-bold fs-5 d-flex align-items-center gap-2">
                                            <Link style={{ textDecoration: 'none', color: 'black' }} to={`/user/${post.author._id}`}>{post.author.name} {post.author.surname}</Link>
                                            {/* Icona piccolo tipo post */}
                                            {post.cover ? (
                                                <i className="bi bi-image" style={{ color: "#6c757d" }}></i>
                                            ) : (
                                                <i className="bi bi-chat-left-text" style={{ color: "#6c757d" }}></i>
                                            )}
                                        </Card.Title>
                                        <Card.Text className="text-muted my-0 d-flex align-items-center gap-1" style={{ fontSize: "0.9rem" }}>
                                            {new Date(post.createdAt).toLocaleDateString("it-IT", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                            {/* Icona “nuovo post” se pubblicato nelle ultime 24h */}
                                            {new Date() - new Date(post.createdAt) < 86400000 && (
                                                <span style={{ color: "#3b82f6", fontSize: "0.85rem", fontWeight: "500" }}>Nuovo!</span>
                                            )}
                                        </Card.Text>
                                    </div>
                                </div>

                                {/* Divider soft */}
                                <hr style={{ borderColor: "#e2e8f0", margin: "0 0 10px 0" }} />

                                {/* Testo */}
                                <Card.Text
                                    className="fs-5 text-secondary"
                                    style={{ lineHeight: "1.7", whiteSpace: "pre-wrap" }}
                                >
                                    {post.description}
                                </Card.Text>
                            </Card.Body>

                            {/* Immagine */}
                            {post.cover && (
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    style={{
                                        position: "relative",
                                        overflow: "hidden",
                                        borderRadius: "20px",
                                        margin: "0 20px 20px 20px",
                                    }}
                                >
                                    <motion.img
                                        src={post.cover}
                                        alt={post.description || "post image"}
                                        style={{
                                            width: "100%",
                                            height: "400px",
                                            objectFit: "cover",
                                            borderRadius: "20px",
                                            filter: "brightness(0.97)",
                                            transition: "all 0.3s ease",
                                        }}
                                        whileHover={{ filter: "brightness(1)" }}
                                    />
                                </motion.div>
                            )}

                            {/* Sezione like/commenti — SEMPRE visibile */}
                            <div className="d-flex justify-content-between align-items-center mt-4 text-muted mx-3">
                                {/* Likes */}
                                <div
                                    className="d-flex align-items-center gap-3"
                                    onClick={() => handleLikeToggle(post._id)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <motion.img
                                        src={!unlike[post._id] ? "public/icons8-like-32.png" : "public/icons8-like-48.png"}
                                        alt="like"
                                        width="32px"
                                        whileTap={{ scale: 1.4 }}
                                    />
                                    <span>{likesCount[post._id] || 0}</span>
                                </div>

                                {/* Commenti */}
                                <div
                                    onClick={() => handleOpenModalComment(post)}
                                    style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}
                                >
                                    💬 <small>Commenti</small>
                                </div>
                            </div>
                        </motion.div>
                    ))}

            {selectedPost && (
                <ModalComment show={showModal} handleClose={handleCloseModal} post={selectedPost} />
            )}
        </>
    );
}

export default Feed;
