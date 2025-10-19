import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { createPost } from '../../data/post';

function ModalCreatePost({ show, handleClose, userData }) {

    const [cover, setCover] = useState(null)

    const [datiForm, setDatiForm] = useState({
        description: ''
    })

    const handleChange = (e) => {
        setDatiForm({
            ...datiForm,
            [e.target.name]: e.target.value
        })
    }

    const handleCoverChange = (e) => {
        setCover(e.target.files[0]);
    }

    const handleSubmit = async () => {

        const formData = new FormData()
        formData.append('description', datiForm.description)

        if (cover) {
            formData.append('cover', cover)
        }

        const result = await createPost(formData)
        console.log(result)
    }

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <img
                    src={userData.avatar}
                    alt={`${userData.name} ${userData.surname}`}
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
                        {userData.name} {userData.surname}
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
                        placeholder="A cosa stai pensando?"
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
                        id="cover"
                        accept="image/*"
                        onChange={handleCoverChange}
                        style={{ display: "none" }}
                    />
                    {cover && (
                        <small style={{ color: "#64748b" }}>{cover.name}</small>
                    )}
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Chiudi
                </Button>
                <Button onClick={() => {
                    handleSubmit();
                    handleClose()
                }} variant="primary">
                    Pubblica
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalCreatePost;
