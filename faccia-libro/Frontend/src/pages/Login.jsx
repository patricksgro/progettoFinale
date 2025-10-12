import { Button, Col, Container, Row } from 'react-bootstrap'
import '../style/style.css'
import { useState } from 'react'
import Signup from './Signup'
import { useAuthContext } from '../../context/authContext'

function Login() {

    const { login } = useAuthContext()

    const [signupLogin, setSignupLogin] = useState(false)
    const [showOTP, setShowOTP] = useState(false)

    const googleLogin = () => {
        window.location.href = import.meta.env.VITE_BASEURL + import.meta.env.VITE_GOOGLE_PATH
    }

    const [datiFormCredentials, setDatiFormCredentials] = useState({
        email: '',
        password: ''
    })

    const [datiFormOTP, setDatiFormOTP] = useState({
        email: '',
        otp: ''
    })

    const handleChange = (e) => {
        setDatiFormCredentials({
            ...datiFormCredentials,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeConfirm = (e) => {
        setDatiFormOTP({
            ...datiFormOTP,
            [e.target.name]: e.target.value
        })
    }

    const sendOTP = async () => {
        try {
            const res = await fetch(import.meta.env.VITE_BASEURL + '/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: datiFormCredentials.email,
                    password: datiFormCredentials.password
                })
            });

            const data = await res.json();

            if (!res.ok) {
                console.log(data.message); // mostra eventuali errori
                return;
            }

        } catch (err) {
            console.log(err)
        }
    }


    const localLogin = async () => {
        try {
            const res = await fetch(import.meta.env.VITE_BASEURL + '/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: datiFormOTP.email,
                    otp: datiFormOTP.otp
                })
            });

            const data = await res.json();

            if (!res.ok) {
                console.log(data.message); // mostra eventuali errori
                return;
            }

            login(data.jwt)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {
                !signupLogin ?
                    < Container className="d-flex justify-content-center align-items-center vh-100" >
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
                                            {
                                                !showOTP ?
                                                    <>
                                                        <div>
                                                            <i className="bi bi-envelope-at"></i>
                                                            <input className='fields'
                                                                type="email"
                                                                name='email'
                                                                placeholder="name@example.com"
                                                                value={datiFormCredentials.email}
                                                                onChange={handleChange} />
                                                        </div>
                                                        <div className='my-4'>
                                                            <i className="bi bi-lock"></i>
                                                            <input className='fields'
                                                                type="password"
                                                                name='password'
                                                                value={datiFormCredentials.password}
                                                                onChange={handleChange} />
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <div>
                                                            <i className="bi bi-envelope-at"></i>
                                                            <input className='fields'
                                                                type="email"
                                                                name='email'
                                                                value={datiFormOTP.email}
                                                                onChange={handleChangeConfirm} />
                                                        </div>
                                                        <div className='my-4'>
                                                            <i className="bi bi-person-check-fill"></i>
                                                            <input className='fields'
                                                                type="number"
                                                                name='otp'
                                                                value={datiFormOTP.otp}
                                                                onChange={handleChangeConfirm} />
                                                        </div>
                                                        <p className='text-danger'>
                                                            Confirm again your email and insert the OTP code that we have been sent
                                                        </p>
                                                    </>
                                            }
                                        </div>

                                        {
                                            !showOTP ? <Button className='color-btn' onClick={() => {
                                                setShowOTP(!showOTP);
                                                sendOTP()
                                            }
                                            } >Send OTP</Button>
                                                :
                                                <Button className='color-btn'
                                                    onClick={localLogin}
                                                >Login</Button>
                                        }

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
                                            onClick={googleLogin}
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
                                        <p>Don't you have an account? <span className='link' onClick={() => setSignupLogin(!signupLogin)}>Signup</span></p>
                                    </div>

                                </div>
                            </Col>
                        </Row>
                    </Container >
                    :
                    <Signup />
            }
        </>
    )

}

export default Login