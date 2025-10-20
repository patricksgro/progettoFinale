import { Button, Col, Container, Row } from 'react-bootstrap'
import '../style/style.css'
import { useEffect, useState } from 'react'
import Signup from './Signup'
import { useAuthContext } from '../../context/authContext'
import { useSearchParams } from 'react-router-dom'
import FooterPages from '../components/FooterPages'

function Login() {
    const { login } = useAuthContext()
    const [signupLogin, setSignupLogin] = useState(false)
    const [searchParams] = useSearchParams()

    const [datiFormCredentials, setDatiFormCredentials] = useState({
        email: '',
        password: ''
    })

    // login con Google
    const googleLogin = () => {
        window.location.href = import.meta.env.VITE_BASEURL + import.meta.env.VITE_GOOGLE_PATH
    }

    // se torna token da Google, logga
    useEffect(() => {
        const token = searchParams.get('jwt')
        if (token) login(token)
    }, [searchParams])

    // gestisci i cambi nei campi input
    const handleChange = (e) => {
        setDatiFormCredentials({
            ...datiFormCredentials,
            [e.target.name]: e.target.value
        })
    }

    // login con email e password
    const localLogin = async () => {
        try {
            const res = await fetch(import.meta.env.VITE_BASEURL + '/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: datiFormCredentials.email,
                    password: datiFormCredentials.password
                })
            })

            const data = await res.json()

            if (!res.ok) {
                console.log(data.message)
                return
            }

            // token JWT ricevuto → login
            login(data.jwt)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {!signupLogin ? (
                <Container fluid className="bg-image d-flex justify-content-center align-items-center vh-100 text-white">
                    <Row>
                        <Col>
                            <div style={{ maxWidth: '108rem' }}>
                                <div className="card-body">
                                    <h5 className="card-title fs-1 my-4 fw-bold">Welcome to login system</h5>
                                    <p className="card-text">
                                        To keep connected with us please login with your personal information by email address and password
                                    </p>

                                    {/* Email */}
                                    <div className="input-wrapper">
                                        <i className="bi bi-person input-icon"></i>
                                        <input
                                            className="fields"
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            value={datiFormCredentials.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Password */}
                                    <div className="input-wrapper my-4">
                                        <i className="bi bi-lock-fill input-icon"></i>
                                        <input
                                            className="fields"
                                            type="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            value={datiFormCredentials.password}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Bottone login */}
                                    <Button className="color-btn" onClick={localLogin}>
                                        Login
                                    </Button>

                                    <p className="card-text my-3">
                                        <small>Or you can join with</small>
                                    </p>

                                    {/* Login con Google */}
                                    <button
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            padding: '8px 16px',
                                            border: 'none',
                                            borderRadius: '4px',
                                            background: 'transparent',
                                            cursor: 'pointer'
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
                                                color: '#757575'
                                            }}
                                        >
                                            Sign in with Google
                                        </span>
                                    </button>
                                </div>

                                <div className="my-4 text-center">
                                    <p>
                                        Don't you have an account?{' '}
                                        <span className="link" onClick={() => setSignupLogin(!signupLogin)}>
                                            Signup
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </Col>

                        <Col></Col>
                        <FooterPages />
                    </Row>
                </Container>
            ) : (
                <Signup />
            )}
        </>
    )
}

export default Login
