import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { createComment, editComment, removeComment } from '../../data/comment';
import { useAuthContext } from '../../context/authContext';
import PostOptionsSimple from './PostOptionSimple';

function ModalComment({ show, handleClose, post }) {

    const { loggeedUser } = useAuthContext()
    const [update, setUpdate] = useState(false)

    const [datiFormUpdate, setDatiFormUpdate] = useState({
        text: ''
    })

    const [datiform, setDatiForm] = useState({
        text: ''
    })
    const [comments, setComments] = useState(post.comments || [])


    const handleChange = (e) => {
        setDatiForm({
            ...datiform,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeUpdate = (e) => {
        setDatiFormUpdate({
            ...datiFormUpdate,
            [e.target.name]: e.target.value
        })
    }

    //CREATE COMMENT
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const newComment = await createComment(post._id, datiform)

            setComments(prev => [...prev, newComment])
            setDatiForm({ text: '' })
        } catch (err) {
            console.log(err)
        }
    }

    //UPDATE COMMENT
    const edit = async (commentID) => {

        try {
            const editedComment = await editComment(post._id, commentID, datiFormUpdate)

            setComments((prev) =>
                prev.map((c) => (c._id === update ? editedComment : c))
            )

            setUpdate(null)
            setDatiFormUpdate({ text: '' })
        } catch (err) {
            console.log(err)
        }
    }

    //DELETE COMMENT
    const remove = async (commentID) => {

        try {
            await removeComment(post._id, commentID)

            setComments(prev => prev.filter(c => c._id !== commentID))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton style={{ borderBottom: "1px solid #e2e8f0", padding: "15px 20px" }}>
                <img
                    src={post.author.avatar}
                    alt={`${post.author.name} ${post.author.surname}`}
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
                        {post.author.name} {post.author.surname}
                    </Card.Title>
                    <Card.Text className="text-muted my-0" style={{ fontSize: '0.9rem' }}>
                        {new Date(post.createdAt).toLocaleDateString('it-IT', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                        })}
                    </Card.Text>
                </div>
                <div style={{marginLeft: '70%'}}>
                    {
                        post.author === loggeedUser._id &&
                        <PostOptionsSimple
                            post={post}
                        />
                    }
                </div>
            </Modal.Header>

            <Modal.Body style={{ padding: "20px" }}>
                <Card.Text className="fs-5 mb-3">
                    {post.description}
                </Card.Text>
                {post.cover && (
                    <img
                        alt=""
                        src={post.cover}
                        className="d-block mx-auto mb-4"
                        style={{
                            maxWidth: '100%',
                            height: 'auto',
                            borderRadius: '25px',
                            boxShadow: "0 6px 18px rgba(0,0,0,0.1)"
                        }}
                    />
                )}

                {comments && comments.length > 0 ? (
                    <div className="mt-3">
                        <h6 className="mb-2" style={{ fontWeight: 600 }}>Commenti:</h6>
                        {comments.map((comment) => (
                            <Card
                                key={comment._id}
                                className="my-2 p-3"
                                style={{
                                    borderRadius: "15px",
                                    background: "#f8f9fa",
                                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                                }}
                            >
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div>
                                        {update === comment._id ? (
                                            <input
                                                type="text"
                                                name='text'
                                                value={datiFormUpdate.text}
                                                onChange={handleChangeUpdate}
                                                style={{
                                                    borderRadius: "8px",
                                                    padding: "5px 10px",
                                                    border: "1px solid #ced4da",
                                                    width: "100%",
                                                }}
                                            />
                                        ) : (
                                            <span>{comment.text}</span>
                                        )}
                                        <div className="text-muted small mt-1">{comment.author}</div>
                                    </div>
                                    <div className="d-flex gap-2 align-items-center">
                                        {loggeedUser._id === comment.author && (
                                            <>
                                                <span>
                                                    {update === comment._id ? null : (
                                                        <button
                                                            onClick={() => remove(comment._id)}
                                                            style={{
                                                                border: "none",
                                                                background: "transparent",
                                                                cursor: "pointer",
                                                                fontSize: "1.1rem",
                                                            }}
                                                            title="Elimina"
                                                        >
                                                            🗑️
                                                        </button>
                                                    )}
                                                </span>
                                                <span onClick={() => {
                                                    setUpdate(update === comment._id ? null : comment._id);
                                                    setDatiFormUpdate({ text: comment.text })
                                                }}>
                                                    {update === comment._id ? (
                                                        <button
                                                            onClick={() => edit(comment._id)}
                                                            style={{
                                                                border: "none",
                                                                background: "#4ade80",
                                                                color: "#fff",
                                                                borderRadius: "5px",
                                                                padding: "2px 6px",
                                                                cursor: "pointer",
                                                                fontSize: "0.9rem",
                                                            }}
                                                            title="Salva"
                                                        >
                                                            ✔️
                                                        </button>
                                                    ) : (
                                                        <span style={{ cursor: "pointer", fontSize: "1.1rem" }} title="Modifica">✏️</span>
                                                    )}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p className="mt-3 text-muted text-center">Nessun commento ancora.</p>
                )}
            </Modal.Body>

            <Modal.Footer style={{ borderTop: "1px solid #e2e8f0", padding: "15px 20px" }}>
                <input
                    type="text"
                    name='text'
                    style={{
                        borderRadius: '15px',
                        border: '1px solid #ced4da',
                        padding: '8px 12px',
                        width: '50%',
                        outline: 'none',
                        transition: "all 0.2s",
                    }}
                    className='me-2'
                    value={datiform.text}
                    onChange={handleChange}
                    placeholder="Scrivi un commento..."
                />
                <Button
                    onClick={handleSubmit}
                    style={{
                        borderRadius: "15px",
                        padding: "8px 18px",
                        background: "#3b82f6",
                        border: "none",
                        color: "#fff",
                        fontWeight: 500,
                        transition: "all 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#2563eb"}
                    onMouseLeave={e => e.currentTarget.style.background = "#3b82f6"}
                >
                    Commenta
                </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default ModalComment;
