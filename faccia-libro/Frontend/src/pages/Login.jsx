import { Button, Col, Container, Row } from 'react-bootstrap'
import '../style/style.css'

function Login() {

    const googleLogin = () => {
        window.location.href = import.meta.env.VITE_BASEURL + import.meta.env.VITE_GOOGLE_PATH
    }

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row>
                <Col >
                    <img src="public\pexels-ann-h-45017-15368261.png" alt="Idea" className="img-fluid" />
                </Col>

                <Col >
                    <div style={{ maxWidth: '108rem' }}>
                        <div className="card-body">
                            <h5 className="card-title fs-1 my-4">Login</h5>
                            <p className="card-text text-body-secondary ">To keep connected with us please login with your personal information by email address and password</p>
                            <div>
                                <i className="bi bi-envelope-at"></i>
                                <input className='fields' type="email" />
                            </div>
                            <div className='my-4'>
                                <i className="bi bi-lock"></i>
                                <input className='fields' type="password" />
                            </div>

                            <Button className='color-btn text-color'>Login</Button>

                            <p className="card-text my-3"><small className="text-body-secondary">Or you can join with</small></p>

                            <button
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '8px 16px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    background: '#fff',
                                    cursor: 'pointer',
                                }}
                            >
                                <img
                                    src="https://developers.google.com/identity/images/g-logo.png"
                                    alt="Google logo"
                                    style={{ width: '20px', height: '20px' }}
                                />
                                <span
                                    style={{
                                        fontFamily: 'Roboto, sans-serif',
                                        fontSize: '14px',
                                        color: '#757575',
                                    }}
                                >
                                </span>
                            </button>
                        </div>

                        <div className='my-4 text-center'>
                            <p>Don't you have an account? <span className='link'>Signup</span></p>
                        </div>

                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Login