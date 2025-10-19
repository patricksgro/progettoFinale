import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { editCover, editPost } from '../../data/post';
import { useAuthContext } from '../../context/authContext';

function ModalEditPost({ show, closeModal, post }) {

    const { loggeedUser } = useAuthContext()

    const [cover, setCover] = useState(null)

    const [datiForm, setDatiForm] = useState({
        description: post.description
    })

    const handleChange = (e) => {
        setDatiForm({
            ...datiForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {

        const result = await editPost(post._id, datiForm)
        let finalResult = result
        if (cover) {
            const updateCoverAlso = await editCover(post._id, cover)
            finalResult = updateCoverAlso
        }
    }

    const handleCoverChange = (e) => {
        setCover(e.target.files[0])
    }


    return (
        <>
            {
                loggeedUser &&
                <Modal show={show} onHide={closeModal} centered>
                    <Modal.Header closeButton>
                        <img
                            src={loggeedUser.avatar}
                            alt={`${loggeedUser.name} ${loggeedUser.surname}`}
                            className="rounded-circle me-3"
                            style={{
                                width: '50px',
                                height: '50px',
                                objectFit: 'cover',
                                border: '2px solid #dee2e6',
                                boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                            }}
                        />
                        <div>
                            <Card.Title className="my-0 fw-bold">
                                {loggeedUser.name} {loggeedUser.surname}
                            </Card.Title>
                        </div>
                    </Modal.Header>

                    <Modal.Body
                        style={{
                            backgroundColor: "#f8fafc",
                            borderRadius: "15px",
                            padding: "20px",
                        }}
                    >
                        {/* Textarea descrizione */}
                        <div
                            style={{
                                background: "#fff",
                                borderRadius: "15px",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                                border: "1px solid #e2e8f0",
                                padding: "15px 20px",
                            }}
                        >
                            <textarea
                                name="description"
                                value={datiForm.description}
                                onChange={handleChange}
                                rows={4}
                                style={{
                                    width: "100%",
                                    border: "none",
                                    outline: "none",
                                    resize: "none",
                                    fontSize: "1.1rem",
                                    color: "#334155",
                                    lineHeight: "1.6",
                                    background: "transparent",
                                }}
                            />
                        </div>

                        {/* Divider */}
                        <hr style={{ borderColor: "#e2e8f0", margin: "20px 0 15px 0" }} />

                        {/* Upload immagine */}
                        <div className="d-flex align-items-center gap-3">
                            <label
                                htmlFor="cover"
                                className="d-flex align-items-center gap-2"
                                style={{ cursor: "pointer", color: "#22c55e" }}
                            >
                                <i className="bi bi-image" style={{ fontSize: "1.2rem" }}></i>
                                <small>Aggiungi foto</small>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleCoverChange}
                                style={{ display: "none" }}
                            />
                            {post.cover && (
                                <small style={{ color: "#64748b" }}>{post.cover.name}</small>
                            )}
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Close
                        </Button>
                        <Button onClick={() => {
                            handleSubmit();
                            closeModal()
                        }} variant="primary">
                            Edit post
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
        </>
    )
}

export default ModalEditPost