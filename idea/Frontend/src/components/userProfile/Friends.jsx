import { useEffect, useState } from "react"
import { getFriends } from "../../../data/friendship"
import { useParams } from 'react-router-dom'
import { Card, Container, Row, Col, Image, Button } from "react-bootstrap"
import { motion } from "framer-motion"
import { UserMinus } from "lucide-react"

function Friends() {
    const [userFriends, setUserFriends] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        getUserFriends()
    }, [id])

    const getUserFriends = async () => {
        const results = await getFriends(id)
        setUserFriends(results)
    }

    return (
        <Container fluid className="py-4">
            <Row className="g-4">
                {userFriends && userFriends.length > 0 ? userFriends.map(friend => (
                    <Col key={friend._id} xs={12} sm={6} md={4} lg={3}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <Card className="shadow-sm rounded-4 text-center p-3" style={{ border: "1px solid #e2e8f0", background: "#ffffff" }}>
                                <div className="d-flex justify-content-center mb-3">
                                    <Image
                                        src={friend.requester._id === id ? friend.recipient.avatar : friend.requester.avatar}
                                        roundedCircle
                                        style={{ width: "80px", height: "80px", objectFit: "cover", border: "2px solid #3b82f6" }}
                                    />
                                </div>

                                <Card.Body>
                                    <Card.Title className="fs-6 fw-bold text-truncate" title={`${friend.requester.name} ${friend.requester.surname}`}>
                                        {friend.requester._id === id ? friend.recipient.name : friend.requester.name} {friend.requester._id === id ? friend.recipient?.surname || '' : friend.requester?.surname || ''}
                                    </Card.Title>
                                    <Card.Text className="text-muted mb-3 d-flex justify-content-center align-items-center gap-1" style={{ fontSize: "0.85rem" }}>
                                        Amico
                                    </Card.Text>

                                    {/* Pulsante rimuovi */}
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        style={{ backgroundColor: "#3b82f6", border: "none" }}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <UserMinus size={16} className="me-1" /> Rimuovi dagli amici
                                    </Button>
                                </Card.Body>
                            </Card>
                        </motion.div>
                    </Col>
                ))
                :
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
                        <h3 className="mb-3">Nessun amico ancora</h3>
                        <p>Aggiungi il tuo primo amico e comincia a chattare</p>
                    </div>
                </motion.div>
                }

            </Row>
        </Container>
    )
}

export default Friends
