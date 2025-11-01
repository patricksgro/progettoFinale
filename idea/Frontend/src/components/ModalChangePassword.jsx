import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { setPassword } from "../../data/auth";

function ModalChangePAssword({ show, handleClose }) {

    const [datiForm, setDatiForm] = useState({
        password: ''
    })

    const handleChange = (e) => {
        setDatiForm({
            ...datiForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        const results = await setPassword(datiForm)
        console.log(results)
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <h4>
                        Set Password
                    </h4>
                </Modal.Header>

                <Modal.Body>
                    <input
                        type="password"
                        name="password"
                        value={datiForm.password}
                        onChange={handleChange} />
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        onClick={() => {
                            handleSubmit();
                            handleClose()
                        }}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalChangePAssword;