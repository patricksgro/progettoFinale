import { useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import Login from "./Login"
import { useAuthContext } from "../../context/authContext"

function Signup() {
    const { login } = useAuthContext()
    const [signupLogin, setSignupLogin] = useState(false)
    const [step, setStep] = useState(1) // Step 1 = email, Step 2 = resto dati + OTP

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        dateOfBirth: '',
        bio: '',
        email: '',
        password: '',
        otp: ''
    })

    const [otpSent, setOtpSent] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // Step 1: invio OTP
    const sendOtp = async () => {
        if (!formData.email) return alert("Inserisci l'email")
        try {
            const res = await fetch(import.meta.env.VITE_BASEURL + '/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email })
            })
            const data = await res.json()
            if (!res.ok) return alert(data.message)
            setOtpSent(true)
            setStep(2)
        } catch (err) {
            console.log(err)
        }
    }

    // Step 2: registrazione completa con OTP
    const register = async () => {
        try {
            const res = await fetch(import.meta.env.VITE_BASEURL + '/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (!res.ok) return alert(data.message)
            login(data.jwt)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {!signupLogin ? (
                <Container className="d-flex justify-content-center align-items-center vh-100">
                    <Row className="w-100">
                        <Col className="d-none d-md-block">
                            <img
                                src="public/pexels-ann-h-45017-15368261.png"
                                alt="Idea"
                                className="img-fluid"
                            />
                        </Col>
                        <Col>
                            <div style={{ maxWidth: '108rem' }}>
                                <div className="card-body">
                                    <h5 className="card-title fs-1 my-4 fw-bold">Signup</h5>
                                    <p className="card-text text-body-secondary">
                                        Create your account by filling out all fields below.
                                    </p>

                                    {/* Step 1: solo email */}
                                    {step === 1 && (
                                        <div className="input-wrapper mb-3">
                                            <i className="bi bi-envelope input-icon"></i>
                                            <input
                                                className="fields"
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    )}

                                    {/* Step 2: dati completi + OTP */}
                                    {step === 2 && (
                                        <>
                                            <div className="input-wrapper mb-3">
                                                <i className="bi bi-person"></i>
                                                <input
                                                    className="fields"
                                                    type="text"
                                                    name="name"
                                                    placeholder="Name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="input-wrapper mb-3">
                                                <i className="bi bi-person"></i>
                                                <input
                                                    className="fields"
                                                    type="text"
                                                    name="surname"
                                                    placeholder="Surname"
                                                    value={formData.surname}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="input-wrapper mb-3">
                                                <i className="bi bi-calendar-date"></i>
                                                <input
                                                    className="fields"
                                                    type="date"
                                                    name="dateOfBirth"
                                                    value={formData.dateOfBirth}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="input-wrapper mb-3">
                                                <i className="bi bi-card-text"></i>
                                                <input
                                                    className="fields"
                                                    type="text"
                                                    name="bio"
                                                    placeholder="Short bio"
                                                    value={formData.bio}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="input-wrapper mb-3">
                                                <i className="bi bi-lock-fill"></i>
                                                <input
                                                    className="fields"
                                                    type="password"
                                                    name="password"
                                                    placeholder="Password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="input-wrapper mb-3">
                                                <i className="bi bi-key-fill"></i>
                                                <input
                                                    className="fields"
                                                    type="text"
                                                    name="otp"
                                                    placeholder="OTP"
                                                    value={formData.otp}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </>
                                    )}

                                    <Button
                                        className="color-btn text-color my-4"
                                        onClick={step === 1 ? sendOtp : register}
                                    >
                                        {step === 1 ? 'Send OTP' : 'Create Account'}
                                    </Button>

                                    <p className="card-text my-3">
                                        <small className="text-body-secondary">
                                            Or you can join with
                                        </small>
                                    </p>

                                    <button
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            padding: '8px 16px',
                                            border: 'none',
                                            borderRadius: '4px',
                                            background: '#fff',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => window.location.href = import.meta.env.VITE_BASEURL + '/auth/login-google'}
                                    >
                                        <img
                                            src="https://developers.google.com/identity/images/g-logo.png"
                                            alt="Google logo"
                                            style={{ width: '20px', height: '20px' }}
                                        />
                                        <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', color: '#757575' }}>
                                            Sign up with Google
                                        </span>
                                    </button>
                                </div>

                                <div className="my-4 text-center">
                                    <p>
                                        Do you already have an account?{" "}
                                        <span className="link" onClick={() => setSignupLogin(!signupLogin)}>
                                            Login
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <Login />
            )}
        </>
    )
}

export default Signup
