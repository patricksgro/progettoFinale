import { Col, Container, Row } from "react-bootstrap"
import Banner from "../components/Banner"
import InfoUser from "../components/InfoUser"
import { NavLink, Outlet, useParams } from "react-router-dom"
import { useAuthContext } from "../../context/authContext"
import ProfileOptionsSimple from "../components/ProfileOptionsSimple"
import { getSingleUser } from "../../data/auth"
import { useEffect, useState } from "react"

function UserProfile() {

    const [currentUser, setCurrentUser] = useState(null)
    const { id } = useParams()
    const { loggeedUser } = useAuthContext()

    const isOwner = loggeedUser && loggeedUser._id === id

    useEffect(() => {
        if (isOwner) {
            setCurrentUser(loggeedUser)
        } else {
            getSingleUser(id).then(user => setCurrentUser(user))
        }
    }, [id, loggeedUser, isOwner])

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
                                <InfoUser isOwner={isOwner} currentUser={currentUser} loggeedUser={loggeedUser} />
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
                                        {
                                            loggeedUser &&
                                            <ProfileOptionsSimple
                                            />
                                        }
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