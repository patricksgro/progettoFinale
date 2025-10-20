import { Container, Form, FormControl, Navbar } from "react-bootstrap"
import { useAuthContext } from "../../context/authContext"
import { useEffect, useState } from "react"
import { getUsers } from "../../data/auth"
import { Link } from "react-router-dom"
import ViewFriendRequest from "./ViewFriendRequest"

function Navigation() {

    const { loggeedUser } = useAuthContext()

    const [search, setSearch] = useState('')
    const [user, setUser] = useState()


    useEffect(() => {
        if (!search) {
            setUser([])
            return
        }

        const delayDebounce = setTimeout(() => {
            getUser()
        }, 1000)

        return () => clearTimeout(delayDebounce)
    }, [search])

    const getUser = async () => {
        const results = await getUsers(search)
        setUser(results)
    }

    const showFullNav = location.pathname === '/login'

    return (
        <Navbar expand="lg" className="py-3 shadow-sm" style={{
            ...(!showFullNav && {
                backgroundColor: '#fefefe',
                backdropFilter: 'blur(4px)',
            })
        }
        }>
            <Container className="d-flex align-items-center justify-content-between">

                <Navbar.Brand href="#" className="fs-2 fw-bold me-4 text-white">
                    IDEA
                </Navbar.Brand>

                {
                    !showFullNav &&
                    <Form className="flex-grow-1 mx-5 position-relative" style={{ maxWidth: "600px" }}>
                        <FormControl
                            type="search"
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="me-2"
                            aria-label="Search"
                        />

                        {/* Dropdown risultati */}
                        {user && user.length > 0 && search && (
                            <div
                                className="position-absolute w-100 bg-body-tertiary border rounded shadow-sm mt-1"
                                style={{ zIndex: 1000, maxHeight: '250px', overflowY: 'auto' }}
                            >
                                {user.map((u) => (
                                    <Link
                                        to={`/user/${u._id}`}
                                        key={u._id}
                                        className="px-3 py-2 d-flex align-items-center gap-2 dropdown-item"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <img
                                            src={u.avatar}
                                            alt={u.name}
                                            className="rounded-circle"
                                            style={{ width: "35px", height: "35px", objectFit: "cover" }}
                                        />
                                        <span>{u.name} {u.surname}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </Form>
                }

                {
                    !showFullNav &&
                    <div className="d-flex align-items-center gap-4">
                        <div>
                            <img src="public/icons8-messages-50.png" alt="messages" width={'32px'} />
                        </div>
                        <div>
                            {
                                <ViewFriendRequest />
                            }
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <span className="fw-semibold">{
                                loggeedUser && `${loggeedUser.name} ${loggeedUser.surname}`
                            }</span>
                            <img
                                src={loggeedUser && `${loggeedUser.avatar}`}
                                alt="user"
                                className="rounded-circle"
                                style={{ width: "35px", height: "35px", objectFit: "cover", border: '2px solid #dee2e6' }}
                            />
                        </div>
                    </div>
                }
            </Container>
        </Navbar >
    )
}

export default Navigation