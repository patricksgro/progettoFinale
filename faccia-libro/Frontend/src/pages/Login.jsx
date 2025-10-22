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

    // Step: 1 = inserimento email+password, 2 = inserimento OTP
    const [step, setStep] = useState(1)

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        otp: ''
    })

    const [otpId, setOtpId] = useState(null)

    // login con Google
    const googleLogin = () => {
        window.location.href = import.meta.env.VITE_BASEURL + import.meta.env.VITE_GOOGLE_PATH
    }

    // se torna token da Google, logga
    useEffect(() => {
        const token = searchParams.get('jwt')
        if (token) login(token)
    }, [searchParams])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // Step 1: login email+password
    const localLogin = async () => {
        try {
            const res = await fetch(import.meta.env.VITE_BASEURL + '/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, password: formData.password })
            })
            const data = await res.json()
            if (!res.ok) return console.log(data.message)

            setOtpId(data.otpId)
            setStep(2) // passa al form OTP
        } catch (err) {
            console.log(err)
        }
    }

    // Step 2: verifica OTP
    const verifyOtp = async () => {
        try {
            const res = await fetch(import.meta.env.VITE_BASEURL + '/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ otpId, otp: formData.otp })
            })
            const data = await res.json()
            if (!res.ok) return console.log(data.message)

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

                                    {step === 1 && (
                                        <>
                                            {/* Email */}
                                            <div className="input-wrapper">
                                                <i className="bi bi-person input-icon"></i>
                                                <input
                                                    className="fields"
                                                    type="email"
                                                    name="email"
                                                    placeholder="Enter your email"
                                                    value={formData.email}
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
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            {/* Bottone login */}
                                            <Button className="color-btn" onClick={localLogin}>
                                                Login
                                            </Button>
                                        </>
                                    )}

                                    {step === 2 && (
                                        <>
                                            {/* OTP */}
                                            <div className="input-wrapper my-4">
                                                <i className="bi bi-key-fill input-icon"></i>
                                                <input
                                                    className="fields"
                                                    type="text"
                                                    name="otp"
                                                    placeholder="Enter OTP"
                                                    value={formData.otp}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <Button className="color-btn" onClick={verifyOtp}>
                                                Verify OTP
                                            </Button>
                                        </>
                                    )}

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
                                    {step === 2 && <p className="my-4">Check your email for the OTP.</p>}

                                </div>

                                <div className="my-4 text-center">
                                    <p>
                                        {!signupLogin
                                            ? "Don't you have an account? "
                                            : "Do you already have an account? "}
                                        <span className="link" onClick={() => setSignupLogin(!signupLogin)}>
                                            {signupLogin ? 'Login' : 'Signup'}
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
