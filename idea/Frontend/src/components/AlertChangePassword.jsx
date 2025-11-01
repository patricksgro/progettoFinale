import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function AlertChangePassword() {
    const [show, setShow] = useState(true);

    return (
        <>
            <Alert show={show} variant="success">
                <Alert.Heading>Hey, nice to see you..</Alert.Heading>
                <p>
                    If you logged in for the first time with Google, remember to set a password to improve your security. <br></br>
                    You just need to go to the about section of your profile and make the change.
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setShow(false)} variant="outline-success">
                        Close me
                    </Button>
                </div>
            </Alert>
        </>
    );
}

export default AlertChangePassword;