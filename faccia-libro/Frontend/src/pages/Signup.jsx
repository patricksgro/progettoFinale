import { useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import Login from "./Login"
import { useAuthContext } from "../../context/authContext"

function Signup() {
    const { login } = useAuthContext()
    const [signupLogin, setSignupLogin] = useState(false)
    const [step, setStep] = useState(1)

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
                <Container
                    fluid
                    className="d-flex justify-content-center align-items-center min-vh-100 bg-gradient"
                    style={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    }}
                >
                    <Row className="w-100 justify-content-center align-items-center">
                        {/* SEZIONE SINISTRA - LOGIN PANEL */}
                        <Col
                            md={5}
                            className="d-flex flex-column justify-content-center align-items-center text-white p-5 rounded-start-5 shadow-lg"
                            style={{
                                background: "rgba(3, 117, 211, 0.66)",
                                backdropFilter: "blur(12px)",
                                minHeight: "80vh",
                            }}
                        >
                            <h2 className="fw-bold mb-3 text-center">Welcome Back!</h2>
                            <p className="text-center mb-4" style={{ maxWidth: "80%" }}>
                                To keep connected with us please login with your personal info
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
                                SIGN IN
                            </Button>
                        </Col>

                        {/* SEZIONE DESTRA - SIGNUP PANEL */}
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
                                Create Account
                            </h1>
                            <p className="text-center mb-4" style={{ color: "#333" }}>
                                Start your journey with us today.
                            </p>

                            {/* Step 1 */}
                            {step === 1 && (
                                <div className="input-wrapper mb-4">
                                    <div className="position-relative">
                                        <i className="bi bi-envelope input-icon text-secondary position-absolute top-50 translate-middle-y ms-3"></i>
                                        <input
                                            className="form-control ps-5 py-3 rounded-pill bg-transparent border-dark text-dark"
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            style={{
                                                backdropFilter: "blur(4px)",
                                                transition: "0.3s",
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Step 2 */}
                            {step === 2 && (
                                <>
                                    {[
                                        { name: "name", placeholder: "Name", icon: "bi-person" },
                                        { name: "surname", placeholder: "Surname", icon: "bi-person" },
                                        {
                                            name: "dateOfBirth",
                                            placeholder: "",
                                            icon: "bi-calendar-date",
                                            type: "date",
                                        },
                                        { name: "bio", placeholder: "Short bio", icon: "bi-card-text" },
                                        {
                                            name: "password",
                                            placeholder: "Password",
                                            icon: "bi-lock-fill",
                                            type: "password",
                                        },
                                        { name: "otp", placeholder: "OTP", icon: "bi-key-fill" },
                                    ].map(({ name, placeholder, icon, type = "text" }) => (
                                        <div className="input-wrapper mb-3" key={name}>
                                            <div className="position-relative">
                                                <i
                                                    className={`bi ${icon} text-secondary position-absolute top-50 translate-middle-y ms-3`}
                                                ></i>
                                                <input
                                                    className="form-control ps-5 py-3 rounded-pill bg-transparent border-dark text-dark"
                                                    type={type}
                                                    name={name}
                                                    placeholder={placeholder}
                                                    value={formData[name]}
                                                    onChange={handleChange}
                                                    style={{
                                                        backdropFilter: "blur(4px)",
                                                        transition: "0.3s",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}

                            <Button
                                className="w-100 py-3 rounded-pill fw-semibold mt-3"
                                onClick={step === 1 ? sendOtp : register}
                                style={{
                                    background: "linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)",
                                    border: "none",
                                    boxShadow: "0 4px 20px rgba(0, 114, 255, 0.4)",
                                    transition: "transform 0.2s",
                                }}
                                onMouseOver={(e) =>
                                    (e.currentTarget.style.transform = "scale(1.03)")
                                }
                                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                            >
                                {step === 1 ? "Send OTP" : "Create Account"}
                            </Button>

                            <div className="my-5 text-center">
                                <p className="text-danger">
                                    If you signed in for the first time with Google, continue to sign in with Google
                                </p>
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
