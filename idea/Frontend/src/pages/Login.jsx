import { Button, Col, Container, Row } from 'react-bootstrap'
import '../style/style.css'
import { useEffect, useState } from 'react'
import Signup from './Signup'
import { useAuthContext } from '../../context/authContext'
import { useSearchParams } from 'react-router-dom'
import {Mail} from 'lucide-react'

function Login() {
    const { login } = useAuthContext()
    const [signupLogin, setSignupLogin] = useState(false)
    const [searchParams] = useSearchParams()
    const [errorMessage, setErrorMessage] = useState(false)

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
            if (!res.ok) {
                setErrorMessage(true)
                console.log(data.message)
                return
            }


            setOtpId(data.otpId)
            setStep(2)
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
                <Container
                    fluid
                    className="d-flex justify-content-center align-items-center min-vh-100 bg-gradient"
                    style={{
                        background: "linear-gradient(135deg, #0e2cb3ff 0%, #480a86ff 100%)",
                    }}
                >
                    <Row className="w-100 justify-content-center align-items-center">
                        {/* SEZIONE SINISTRA - SIGNUP PANEL */}
                        <Col
                            md={5}
                            className="d-flex flex-column justify-content-center align-items-center text-white p-5 rounded-start-5 shadow-lg"
                            style={{
                                background: "rgba(3, 117, 211, 0.66)",
                                backdropFilter: "blur(12px)",
                                minHeight: "80vh",
                            }}
                        >
                            <h2 className="fw-bold mb-3 text-center">Hello, Friend!</h2>
                            <p className="text-center mb-4" style={{ maxWidth: "80%" }}>
                                Enter your personal details and start your journey with us.
                            </p>
                            <Button
                                variant="outline-light"
                                className="rounded-pill px-4 py-2 fw-semibold"
                                onClick={() => setSignupLogin(true)}
                                style={{
                                    borderWidth: "2px",
                                    transition: "all 0.3s ease",
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.background = "#fff";
                                    e.currentTarget.style.color = "#0072ff";
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.background = "transparent";
                                    e.currentTarget.style.color = "#fff";
                                }}
                            >
                                SIGN UP
                            </Button>
                        </Col>

                        {/* SEZIONE DESTRA - LOGIN PANEL */}
                        <Col
                            xs={11}
                            md={5}
                            className="p-5 rounded-end-5 shadow-lg glass-card animate__animated animate__fadeInRight"
                            style={{
                                backdropFilter: "blur(16px)",
                                background: "rgba(255, 255, 255, 0.85)",
                                border: "1px solid rgba(0, 0, 0, 0.1)",
                                color: "#222",
                                minHeight: "80vh",
                            }}
                        >
                            <h1
                                className="fw-bold mb-3 text-center text-dark"
                                style={{ letterSpacing: "1px" }}
                            >
                                Sign In
                            </h1>
                            <p className="text-center mb-4" style={{ color: "#333" }}>
                                To keep connected with us please login with your personal info.
                            </p>

                            {/* Step 1: Email + Password */}
                            {step === 1 && (
                                <>
                                    <div className="input-wrapper mb-3">
                                        <div className="position-relative">
                                            <i className="bi bi-envelope text-secondary position-absolute top-50 translate-middle-y ms-3"></i>
                                            <input
                                                className="form-control ps-5 py-3 rounded-pill bg-transparent border-dark text-dark"
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                style={{ backdropFilter: "blur(4px)", transition: "0.3s" }}
                                            />
                                        </div>
                                    </div>

                                    <div className="input-wrapper mb-4">
                                        <div className="position-relative">
                                            <i className="bi bi-lock-fill text-secondary position-absolute top-50 translate-middle-y ms-3"></i>
                                            <input
                                                className="form-control ps-5 py-3 rounded-pill bg-transparent border-dark text-dark"
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                style={{ backdropFilter: "blur(4px)", transition: "0.3s" }}
                                            />
                                        </div>
                                    </div>

                                    {
                                        errorMessage && <p className='text-danger text-center'>Credenziali errate</p>
                                    }

                                    <Button
                                        className="w-100 py-3 rounded-pill fw-semibold mt-2"
                                        onClick={localLogin}
                                        style={{
                                            background:
                                                "linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)",
                                            border: "none",
                                            boxShadow: "0 4px 20px rgba(0, 114, 255, 0.4)",
                                            transition: "transform 0.2s",
                                        }}
                                        onMouseOver={(e) =>
                                            (e.currentTarget.style.transform = "scale(1.03)")
                                        }
                                        onMouseOut={(e) =>
                                            (e.currentTarget.style.transform = "scale(1)")
                                        }
                                    >
                                        Login
                                    </Button>
                                </>
                            )}

                            {/* Step 2: OTP */}
                            {step === 2 && (
                                <>
                                    <div className="input-wrapper mb-4 mt-4">
                                        <div className="position-relative">
                                            <Mail />
                                            <input
                                                className="form-control ps-5 py-3 rounded-pill bg-transparent border-dark text-dark"
                                                type="text"
                                                name="otp"
                                                placeholder="Enter OTP"
                                                value={formData.otp}
                                                onChange={handleChange}
                                                style={{ backdropFilter: "blur(4px)", transition: "0.3s" }}
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        className="w-100 py-3 rounded-pill fw-semibold mt-2"
                                        onClick={verifyOtp}
                                        style={{
                                            background:
                                                "linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)",
                                            border: "none",
                                            boxShadow: "0 4px 20px rgba(0, 114, 255, 0.4)",
                                            transition: "transform 0.2s",
                                        }}
                                        onMouseOver={(e) =>
                                            (e.currentTarget.style.transform = "scale(1.03)")
                                        }
                                        onMouseOut={(e) =>
                                            (e.currentTarget.style.transform = "scale(1)")
                                        }
                                    >
                                        Verify OTP
                                    </Button>

                                    <p className="text-center mt-4" style={{ color: "#333" }}>
                                        Check your email for the OTP.
                                    </p>
                                </>
                            )}

                            {/* Divider */}
                            <div className="text-center mt-4">
                                <small style={{ color: "#333" }}>Or sign in with</small>
                            </div>

                            {/* Login con Google */}
                            <button
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "10px",
                                    width: "100%",
                                    marginTop: "15px",
                                    padding: "10px 16px",
                                    border: "1px solid #ccc",
                                    borderRadius: "50px",
                                    background: "#fff",
                                    cursor: "pointer",
                                    fontWeight: "500",
                                    color: "#222",
                                    transition: "0.3s",
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.background = "#f1f1f1")}
                                onMouseOut={(e) => (e.currentTarget.style.background = "#fff")}
                                onClick={googleLogin}
                            >
                                <img
                                    src="https://developers.google.com/identity/images/g-logo.png"
                                    alt="Google logo"
                                    style={{ width: "20px", height: "20px" }}
                                />
                                <span
                                    style={{
                                        fontFamily: "Roboto, sans-serif",
                                        fontSize: "14px",
                                    }}
                                >
                                    Sign in with Google
                                </span>
                            </button>

                            <div className="my-5 text-center">
                                <p className="text-danger">
                                    If you signed in for the first time with Google, continue to sign in with Google
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <Signup />
            )}
        </>

    )

}

export default Login
