import { Card, Container, Row, Col } from "react-bootstrap"
import { motion } from "framer-motion"
import { Mail, Calendar, User } from "lucide-react"
import { useAuthContext } from "../../../context/authContext"
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { useState } from "react";
import ModalEditProfile from '../../components/ModalEditProfile'
import { useOutletContext } from "react-router-dom";

function About() {

    const { currentUser, isOwner } = useOutletContext()

    const [showModal, setShowModal] = useState(false)

    const handleOpenModalEditProfile = () => {
        setShowModal(true)
    }

    const handleCloseModalEditProfile = () => {
        setShowModal(false)
    }

    return (
        <>
            {
                currentUser &&
                <Container fluid >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Card className="shadow-sm border-0 rounded-4 p-4" style={{ backgroundColor: "#f8f9fa" }}>
                            <Row>
                                <Col md={4} className="text-center mb-4 mb-md-0">
                                    <motion.img
                                        src={currentUser.avatar}
                                        alt={currentUser.name}
                                        className="rounded-circle shadow-sm"
                                        width={150}
                                        height={150}
                                        whileHover={{ scale: 1.05 }}
                                    />
                                    <h3 className="mt-3 mb-0">{currentUser.name} {currentUser.surname}</h3>
                                    <p className="text-muted">{currentUser.bio}</p>
                                </Col>

                                <Col md={8}>
                                    <Row>
                                        <Col xs={12} className="mb-3">
                                            <div className="d-flex justify-content-between">
                                                <h3 className="fw-bold mb-3">Personal info</h3>
                                                <button
                                                    onClick={handleOpenModalEditProfile}
                                                    style={{ border: 'none', backgroundColor: 'transparent' }}>
                                                    <HiOutlinePencilSquare />
                                                </button>
                                            </div>

                                            <ul className="list-unstyled">
                                                <li className="mb-2"><User size={18} className="me-2 text-primary" /> {currentUser.name} {currentUser.surname}</li>
                                                <li className="mb-2"><Mail size={18} className="me-2 text-primary" /> {currentUser.email}</li>
                                                <li><Calendar size={18} className="me-2 text-primary" /> Joined {currentUser.createdAt}</li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </motion.div>
                </Container>
            }

            {
                <ModalEditProfile
                    show={showModal}
                    closeModal={handleCloseModalEditProfile} />
            }
        </>
    )
}

export default About
