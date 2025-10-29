import { Col, Row } from "react-bootstrap"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ModalComment from "../ModalComment"
import PostOptionsSimple from "../PostOptionSimple"
import { dislikePost, getlikesPost, likePost } from "../../../data/like"
import { useOutletContext } from "react-router-dom"

function Posts() {

    const { currentUser, isOwner } = useOutletContext()

    const [showModal, setShowModal] = useState(false)
    const [selectedPost, setSelectedPost] = useState(null)
    const [unlike, setUnLike] = useState({})
    const [likesCount, setLikesCount] = useState({}) 

    const handleOpenModal = (post) => {
        setSelectedPost(post)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setSelectedPost(null)
        setShowModal(false)
    }

    //  recupera numero like di ogni post
    useEffect(() => {
        if (currentUser && currentUser.posts.length > 0) {
            currentUser.posts.forEach(async (post) => {
                const likes = await getlikesPost(post._id)
                setLikesCount(prev => ({
                    ...prev,
                    [post._id]: likes.length
                }))
            })
        }
    }, [currentUser])

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

    return (
        <>
            {currentUser && currentUser.posts.length > 0 ? (
                <Row className="g-4 justify-content-center">
                    {currentUser.posts.map((post, index) => (
                        <Col key={post._id} lg={8} md={10} sm={12}>
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                whileHover={{ scale: 1.01 }}
                                style={{
                                    background: "linear-gradient(145deg, #ffffff, #f4f6f8)",
                                    borderRadius: "18px",
                                    padding: "25px 30px",
                                    boxShadow: "0 3px 12px rgba(0,0,0,0.07)",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                }}
                            >
                                {/* Autore e data */}
                                <div className="d-flex align-items-center mb-3">
                                    <img
                                        src={currentUser.avatar}
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
                                    <div className="ms-3">
                                        <h5 className="mb-0 fw-bold">{currentUser.name} {currentUser.surname}</h5>
                                        <small className="text-muted">
                                            {new Date(post.createdAt).toLocaleDateString("it-IT", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </small>
                                    </div>
                                </div>

                                {/* Cover del post */}
                                {post.cover && (
                                    <div className="my-3 text-center">
                                        <img
                                            src={post.cover}
                                            alt="post cover"
                                            style={{
                                                maxWidth: "100%",
                                                maxHeight: "400px",
                                                borderRadius: "15px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Testo del post */}
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="fs-5 text-secondary"
                                    style={{ lineHeight: "1.6", whiteSpace: "pre-wrap" }}
                                >
                                    {post.description}
                                </motion.p>

                                {/* Reazioni e interazioni */}
                                <div className="d-flex justify-content-between align-items-center mt-4 text-muted" >
                                    <div className="d-flex align-items-center gap-3" onClick={() => handleLikeToggle(post._id)} style={{ cursor: "pointer" }}>
                                        <motion.img
                                            src={!unlike[post._id] ? "/icons8-like-32.png" : "/icons8-like-48.png"}
                                            alt="like"
                                            width="32px"
                                            whileTap={{ scale: 1.4 }}
                                        />
                                        {/* mostra numero like aggiornato */}
                                        <span>{likesCount[post._id] || 0}</span>
                                    </div>
                                    <div style={{ cursor: "pointer" }} onClick={() => handleOpenModal(post)}>
                                        💬 <small>Comments</small>
                                    </div>
                                    {
                                        isOwner &&
                                        <PostOptionsSimple
                                            post={post}
                                        />
                                    }
                                </div>
                            </motion.div>
                        </Col>
                    ))}
                </Row>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center text-muted py-5"
                >
                    <div
                        style={{
                            backgroundColor: "#f8f9fa",
                            borderRadius: "20px",
                            padding: "50px 20px",
                            maxWidth: "600px",
                            margin: "0 auto",
                            boxShadow: "0 3px 10px rgba(0, 0, 0, 0.05)",
                        }}
                    >
                        <h3 className="mb-3">Nessun post ancora</h3>
                        <p>Scrivi il tuo primo pensiero o stato per condividerlo con i tuoi amici!</p>
                    </div>
                </motion.div>
            )}

            {selectedPost && (
                <ModalComment
                    show={showModal}
                    handleClose={handleCloseModal}
                    post={selectedPost}
                />
            )}
        </>
    )
}

export default Posts
