import { Button, Col, Container, Row } from "react-bootstrap"
import Banner from "../components/Banner"
import InfoUser from "../components/InfoUser"
import { NavLink, Outlet, useParams } from "react-router-dom"
import { useAuthContext } from "../../context/authContext"
import ProfileOptionsSimple from "../components/ProfileOptionsSimple"
import { getSingleUser } from "../../data/auth"
import { useEffect, useState } from "react"
import { cancelFriendRequest, sendRequest } from "../../data/friendship"

function UserProfile() {

    const [currentUser, setCurrentUser] = useState(null)
    const { id } = useParams()
    const { loggeedUser } = useAuthContext()
    const [requestSent, setRequestSent] = useState(() => {
        // Recupera lo stato salvato al caricamento
        const saved = localStorage.getItem(`friend_request_${id}`)
        return saved === "true"
    })

    useEffect(() => {
        localStorage.setItem(`friend_request_${id}`, requestSent)
    }, [requestSent, id])

    const isOwner = loggeedUser && loggeedUser._id === id


    useEffect(() => {
        if (isOwner) {
            setCurrentUser(loggeedUser)
        } else {
            getSingleUser(id).then(user => setCurrentUser(user))
        }
    }, [id, loggeedUser, isOwner])

    //RICHIESTE DI AMICIZIA

    const handleFriendRequest = async () => {
        if (!requestSent) {
            await sendRequest(id)
            setRequestSent(true)
        } else {
            await cancelFriendRequest(id)
            setRequestSent(false)
        }
    }

    return (
        <>
            {
                loggeedUser &&
                currentUser &&
                id &&
                <Container fluid>
                    {/* da includere da backend per passare poi dati */}
                    <Banner />
                    <div style={{ marginLeft: '8%', marginRight: '8%' }}>
                        <Row className="justify-content-center">
                            <Col lg={4} className="text-center">
                                <InfoUser isOwner={isOwner} currentUser={currentUser} loggeedUser={loggeedUser} id={id} />
                            </Col>
                            <Col lg={8} >
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <nav className="tabs my-5">
                                            <NavLink to="posts" className='fs-4' >Posts</NavLink>
                                            <NavLink to="friends" className='fs-4' style={{ marginRight: '18%', marginLeft: '18%' }} >Friends</NavLink>
                                            <NavLink to="galleries" className='fs-4' style={{ marginRight: '18%' }} >Galleries</NavLink>
                                            <NavLink to="about" className='fs-4' style={{ marginRight: '18%' }}>About</NavLink>
                                        </nav>
                                    </div>
                                    <div className=" d-flex align-items-center">
                                        <div>
                                            {
                                                loggeedUser &&
                                                isOwner &&
                                                <ProfileOptionsSimple
                                                />
                                            }
                                        </div>
                                        <div>
                                            {!isOwner && (
                                                <Button
                                                    onClick={handleFriendRequest}
                                                    variant={requestSent ? "secondary" : "primary"} // colore diverso
                                                >
                                                    {requestSent
                                                        ? "Richiesta di amicizia inviata"
                                                        : "Invia richiesta di amicizia"}
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <Outlet context={{ currentUser, isOwner }} />
                            </Col>
                        </Row>
                    </div>
                </Container >
            }
        </>
    )
}

export default UserProfile