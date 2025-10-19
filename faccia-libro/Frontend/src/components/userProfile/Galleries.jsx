import { Col, Row } from "react-bootstrap"
import { useAuthContext } from "../../../context/authContext"
import { useState } from "react"
import { motion } from "framer-motion"
import ModalComment from "../ModalComment"
import { useOutletContext } from "react-router-dom"

function Galleries() {

    const { currentUser } = useOutletContext()

    const [showModal, setShowModal] = useState(false)
    const [selectedPost, setSelectedPost] = useState(null)

    const handleOpenModal = (post) => {
        setSelectedPost(post)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setSelectedPost(null)
        setShowModal(false)
    }

    const imagePosts = currentUser?.posts?.filter((post) => post.cover)

    return (
        <>
            {imagePosts && imagePosts.length !== 0 ? (
                <Row className="g-5 justify-content-center">
                    {imagePosts.map((post, index) => (
                        <Col key={post._id} lg={4} md={6} sm={12} className="d-flex justify-content-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                whileHover={{ scale: 1.03 }}
                                style={{
                                    borderRadius: "18px",
                                    overflow: "hidden",
                                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                    cursor: "pointer",
                                    transition: "transform 0.3s ease",
                                }}
                                onClick={() => handleOpenModal(post)}
                            >
                                <motion.img
                                    src={post.cover}
                                    alt={post.title}
                                    width={260}
                                    height={260}
                                    style={{
                                        borderRadius: "18px",
                                        objectFit: "cover",
                                        filter: "brightness(0.96)",
                                        transition: "filter 0.3s ease",
                                    }}
                                    whileHover={{ filter: "brightness(1.05)" }}
                                />
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
                        <p>Aggiungi il tuo primo post per iniziare a popolare la tua galleria!</p>
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

export default Galleries