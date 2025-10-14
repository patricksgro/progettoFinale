import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import Login from "./Login"
import {  useSearchParams } from "react-router-dom"
import { useAuthContext } from "../../context/authContext"

function Signup() {

    const {login} = useAuthContext()

    const [showOTP, setShowOTP] = useState(false)

    const [signupLogin, setSignupLogin] = useState(false)

    const [datiForm, setDatiForm] = useState({
        name: '',
        surname: '',
        dateOfBirth: '',
        bio: '',
        email: '',
        password: '',
        otp: ''
    })

    const googleLogin = () => {
        window.location.href = import.meta.env.VITE_BASEURL + import.meta.env.VITE_GOOGLE_PATH
    }


    const [searchParams] = useSearchParams()


    useEffect(() => {
        const token = searchParams.get('jwt')
        if (token) {
            login(token)
        }
    }, [searchParams])

    const sendOTP = async () => {
        try {
            const res = await fetch(import.meta.env.VITE_BASEURL + '/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: datiForm.email
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

    const handleChange = (e) => {
        console.log(e.target.name, e.target.value)
        setDatiForm({
            ...datiForm,
            [e.target.name]: e.target.value
        })
    }

    const register = async () => {
        try {
            const res = await fetch(import.meta.env.VITE_BASEURL + '/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datiForm)
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
                    <Container className="d-flex justify-content-center align-items-center vh-100">
                        <Row>
                            <Col >
                                <img src="public\pexels-ann-h-45017-15368261.png" alt="Idea" className="img-fluid" />
                            </Col>

                            <Col >
                                <div style={{ maxWidth: '108rem' }}>
                                    <div className="card-body">
                                        <h5 className="card-title fs-1 my-4">Signup</h5>
                                        <p className="card-text text-body-secondary ">Enter your email to receive the OTP to complete the registration</p>
                                        {
                                            !showOTP ?
                                                <div>
                                                    <i className="bi bi-envelope-at"></i>
                                                    <input
                                                        className='fields'
                                                        type="email"
                                                        name="email"
                                                        value={datiForm.email}
                                                        onChange={handleChange} />
                                                </div>
                                                :
                                                <>
                                                    <div>
                                                        <i className="bi bi-envelope-at"></i>
                                                        <input
                                                            className='fields'
                                                            type="text"
                                                            name="name"
                                                            value={datiForm.name}
                                                            onChange={handleChange} />
                                                    </div>

                                                    <div>
                                                        <i className="bi bi-envelope-at"></i>
                                                        <input
                                                            className='fields'
                                                            type="text"
                                                            name="surname"
                                                            value={datiForm.surname}
                                                            onChange={handleChange} />
                                                    </div>

                                                    <div>
                                                        <i className="bi bi-envelope-at"></i>
                                                        <input
                                                            className='fields'
                                                            type="date"
                                                            name="dateOfBirth"
                                                            value={datiForm.dateOfBirth}
                                                            onChange={handleChange} />
                                                    </div>

                                                    <div>
                                                        <i className="bi bi-envelope-at"></i>
                                                        <input
                                                            className='fields'
                                                            type="text"
                                                            name="bio"
                                                            value={datiForm.bio}
                                                            onChange={handleChange} />
                                                    </div>

                                                    <div>
                                                        <i className="bi bi-envelope-at"></i>
                                                        <input
                                                            className='fields'
                                                            type="email"
                                                            name="email"
                                                            value={datiForm.email}
                                                            onChange={handleChange} />
                                                    </div>

                                                    <div>
                                                        <i className="bi bi-envelope-at"></i>
                                                        <input
                                                            className='fields'
                                                            type="password"
                                                            name="password"
                                                            value={datiForm.password}
                                                            onChange={handleChange} />
                                                    </div>

                                                    <div>
                                                        <i className="bi bi-envelope-at"></i>
                                                        <input
                                                            className='fields'
                                                            type="number"
                                                            name="otp"
                                                            value={datiForm.otp}
                                                            onChange={handleChange} />
                                                    </div>
                                                </>
                                        }




                                        {
                                            !showOTP ? <Button className='color-btn text-color my-4'
                                                onClick={() => {
                                                    setShowOTP(!showOTP);
                                                    sendOTP()
                                                }
                                                }>Send OTP</Button> :
                                                <Button className='color-btn text-color my-4' onClick={register}>Create account</Button>
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
                                        <p>Do you alredy have an account? <span className='link' onClick={() => setSignupLogin(!signupLogin)}>Login</span></p>
                                    </div>

                                </div>
                            </Col>
                        </Row>
                    </Container>
                    :
                    <Login />
            }
        </>
    )
}

export default Signup