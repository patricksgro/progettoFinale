import { Modal } from "react-bootstrap"
import { useAuthContext } from "../../context/authContext"
import { useEffect, useState } from "react"
import { editAvatar, ediUserProfile } from "../../data/auth"

function ModalEditProfile({ closeModal, show }) {

    const { loggeedUser } = useAuthContext()
    const [error, setError] = useState(false)

    const [avatar, setAvatar] = useState(null)

    const [datiForm, setDatiForm] = useState({
        name: '',
        surname: '',
        bio: ''
    })

    useEffect(() => {
        if (loggeedUser) {
            setDatiForm({
                name: loggeedUser.name || '',
                surname: loggeedUser.surname || '',
                bio: loggeedUser.bio || ''
            })
        }
    }, [loggeedUser])

    const handleChange = (e) => {
        setDatiForm({
            ...datiForm,
            [e.target.name]: e.target.value
        })
    }

    const handleAvatarChange = (e) => {
        setAvatar(e.target.files[0])
    }

    const handleSubmit = async () => {

        let dataSend = { ...datiForm }

        if (dataSend.bio === '') dataSend.bio = null
        if (dataSend.surname === '') dataSend.surname = null
        if (dataSend.name === '') {
            setError(true)
            return
        }

        const result = await ediUserProfile(loggeedUser._id, dataSend)
        let finalResult = result
        if (avatar) {
            const updateAvatarAlso = await editAvatar(avatar)
            finalResult = updateAvatarAlso
        }

        closeModal()
    }

    return (
        <>
            {
                loggeedUser &&
                <Modal show={show} onHide={closeModal} centered size="lg">
                    <Modal.Header closeButton style={{ borderBottom: "1px solid #e2e8f0", padding: "15px 20px" }}>
                        <h5 className="fw-bold m-0">Modifica profilo</h5>
                    </Modal.Header>

                    <Modal.Body style={{ padding: "25px", backgroundColor: "#f8fafc", borderRadius: "0 0 15px 15px" }}>
                        {/* Avatar */}
                        <div className="text-center mb-4">
                            <label htmlFor="avatarInput" style={{ cursor: "pointer" }}>
                                <div
                                    style={{
                                        width: "120px",
                                        height: "120px",
                                        margin: "0 auto",
                                        borderRadius: "50%",
                                        overflow: "hidden",
                                        border: "2px solid #22c55e",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                                    }}
                                >
                                    <img
                                        src={loggeedUser.avatar}
                                        alt={`${loggeedUser.name} avatar`}
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                </div>
                            </label>
                            <small className="text-muted d-block mt-2">Clicca per cambiare avatar</small>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                name="avatar"
                                id="avatarInput"
                                style={{ display: "none" }}
                            />
                        </div>

                        {/* Form inputs */}
                        <div className="d-flex flex-column gap-3">
                            <div className="d-flex gap-2">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    className="form-control"
                                    style={{
                                        borderRadius: "10px",
                                        border: "1px solid #ced4da",
                                        padding: "10px",
                                        flex: 1
                                    }}
                                    value={datiForm.name}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="surname"
                                    placeholder="Surname"
                                    className="form-control"
                                    style={{
                                        borderRadius: "10px",
                                        border: "1px solid #ced4da",
                                        padding: "10px",
                                        flex: 1
                                    }}
                                    value={datiForm.surname}
                                    onChange={handleChange}
                                />
                            </div>

                            <textarea
                                name="bio"
                                placeholder="Write something about you..."
                                className="form-control"
                                rows={4}
                                style={{
                                    borderRadius: "10px",
                                    border: "1px solid #ced4da",
                                    padding: "10px",
                                    resize: "none",
                                    lineHeight: "1.5",
                                    backgroundColor: "#fff"
                                }}
                                value={datiForm.bio}
                                onChange={handleChange}
                            />
                        </div>

                        {
                            error &&
                            <p className="text-danger mt-3">
                                Name is required
                            </p>
                        }
                    </Modal.Body>

                    <Modal.Footer style={{ borderTop: "1px solid #e2e8f0", padding: "15px 20px" }}>
                        <button
                            className="btn btn-secondary"
                            style={{ borderRadius: "12px", padding: "8px 18px" }}
                            onClick={closeModal}
                        >
                            Annulla
                        </button>
                        <button
                            className="btn btn-success"
                            onClick={() => {
                                handleSubmit();
                            }}
                            style={{ borderRadius: "12px", padding: "8px 18px" }}
                        >
                            Save
                        </button>
                    </Modal.Footer>
                </Modal>
            }
        </>
    )
}

export default ModalEditProfile