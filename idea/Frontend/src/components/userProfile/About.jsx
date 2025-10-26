import { Card, Container, Row, Col } from "react-bootstrap"
import { motion } from "framer-motion"
import { Mail, Calendar, User } from "lucide-react"
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { useState } from "react";
import ModalEditProfile from '../../components/ModalEditProfile'
import { useOutletContext } from "react-router-dom";

function About() {

    const { currentUser, isOwner } = useOutletContext()
    const [showModal, setShowModal] = useState(false)

    const handleOpenModalEditProfile = () => setShowModal(true)
    const handleCloseModalEditProfile = () => setShowModal(false)

    return (
        <>
            {currentUser &&
                <Container fluid className="py-5" >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="shadow-lg border-0 rounded-5 p-4" style={{ background: "#ffffffcc", backdropFilter: "blur(10px)" }}>
                            <Row>
                                {/* FOTO + BIO */}
                                <Col md={4} className="text-center mb-4 mb-md-0">
                                    <motion.img
                                        src={currentUser.avatar}
                                        alt={currentUser.name}
                                        className="rounded-circle shadow-lg border border-white"
                                        width={180}
                                        height={180}
                                        style={{ objectFit: "cover" }}
                                        whileHover={{ scale: 1.1 }}
                                    />
                                    <h3 className="mt-3 mb-1 fw-bold" style={{ letterSpacing: "0.5px" }}>
                                        {currentUser.name} {currentUser.surname}
                                    </h3>
                                    <p className="text-muted fst-italic" style={{ fontSize: "0.95rem", maxWidth: "220px", margin: "0 auto" }}>
                                        {currentUser.bio || "Nessuna biografia disponibile."}
                                    </p>
                                </Col>

                                {/* INFORMAZIONI PERSONALI */}
                                <Col md={8}>
                                    <Row>
                                        <Col xs={12} className="mb-3">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <h3 className="fw-bold mb-0" style={{ letterSpacing: "0.5px" }}>Personal info</h3>
                                                {isOwner &&
                                                    <button
                                                        onClick={handleOpenModalEditProfile}
                                                        className="p-2 rounded-circle border-0 hover-shadow"
                                                        style={{
                                                            backgroundColor: "#3b82f6",
                                                            color: "#fff",
                                                            cursor: "pointer",
                                                            transition: "all 0.2s",
                                                        }}
                                                        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
                                                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                                                    >
                                                        <HiOutlinePencilSquare size={20} />
                                                    </button>
                                                }
                                            </div>

                                            <ul className="list-unstyled">
                                                <li className="mb-3 d-flex align-items-center">
                                                    <User size={20} className="me-3 text-primary" />
                                                    <span className="fw-medium">{currentUser.name} {currentUser.surname}</span>
                                                </li>
                                                <li className="mb-3 d-flex align-items-center">
                                                    <Mail size={20} className="me-3 text-primary" />
                                                    <span className="fw-medium">{currentUser.email}</span>
                                                </li>
                                                <li className="d-flex align-items-center">
                                                    <Calendar size={20} className="me-3 text-primary" />
                                                    <span className="fw-medium">Joined {new Date(currentUser.createdAt).toLocaleDateString()}</span>
                                                </li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </motion.div>
                </Container>
            }

            <ModalEditProfile
                show={showModal}
                closeModal={handleCloseModalEditProfile} />
        </>
    )
}

export default About
