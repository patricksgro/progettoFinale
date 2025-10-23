import { Container, Form, FormControl, Navbar } from "react-bootstrap";
import { useAuthContext } from "../../context/authContext";
import { useEffect, useState } from "react";
import { getUsers } from "../../data/auth";
import { Link } from "react-router-dom";
import ViewFriendRequest from "./ViewFriendRequest";

function Navigation() {
    const { loggeedUser } = useAuthContext();
    const [search, setSearch] = useState('');
    const [user, setUser] = useState();

    useEffect(() => {
        if (!search) {
            setUser([]);
            return;
        }
        const delayDebounce = setTimeout(() => {
            getUser();
        }, 1000);

        return () => clearTimeout(delayDebounce);
    }, [search]);

    const getUser = async () => {
        const results = await getUsers(search);
        setUser(results);
    };

    const showFullNav = location.pathname === '/login';

    return (
        <Navbar
            expand="lg"
            className="py-3 shadow-sm"
            style={{
                ...(!showFullNav && {
                    backgroundColor: '#ffffffcc', 
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    borderRadius: '0 0 25px 25px',
                    transition: 'all 0.3s ease',
                }),
                position: 'fixed', 
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1050
            }}
        >
            <Container className="d-flex align-items-center justify-content-between" >

                <Navbar.Brand
                
                    as={Link}
                    to={'/home'}
                    className="fs-2 fw-bold text-primary"
                    style={{ letterSpacing: '1px' }}
                >
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
                            className="me-2 shadow-sm"
                            aria-label="Search"
                            style={{
                                borderRadius: "25px",
                                padding: "10px 20px",
                                border: "1px solid #e2e8f0",
                                transition: "all 0.2s ease",
                            }}
                            onFocus={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"}
                            onBlur={(e) => e.currentTarget.style.boxShadow = "none"}
                        />

                        {/* Dropdown risultati */}
                        {user && user.length > 0 && search && (
                            <div
                                className="position-absolute w-100 bg-white border rounded shadow-sm mt-1"
                                style={{ zIndex: 1000, maxHeight: '250px', overflowY: 'auto' }}
                            >
                                {user.map((u) => (
                                    <Link
                                        to={`/user/${u._id}`}
                                        key={u._id}
                                        className="px-3 py-2 d-flex align-items-center gap-2 dropdown-item"
                                        style={{
                                            cursor: 'pointer',
                                            borderRadius: '15px',
                                            transition: 'all 0.2s ease',
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <img
                                            src={u.avatar}
                                            alt={u.name}
                                            className="rounded-circle"
                                            style={{ width: "35px", height: "35px", objectFit: "cover", border: '1px solid #dee2e6' }}
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
                        <img
                            src="/public/icons8-messages-50.png"
                            alt="messages"
                            width={'30px'}
                            style={{ cursor: 'pointer', transition: 'transform 0.2s ease' }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        />

                        <ViewFriendRequest />

                        <div className="d-flex align-items-center gap-2">
                            <span className="fw-semibold">{loggeedUser && `${loggeedUser.name} ${loggeedUser.surname}`}</span>
                            <img
                                src={loggeedUser && `${loggeedUser.avatar}`}
                                alt="user"
                                className="rounded-circle"
                                style={{
                                    width: "35px",
                                    height: "35px",
                                    objectFit: "cover",
                                    border: '2px solid #dee2e6',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'scale(1.1)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            />
                        </div>
                    </div>
                }
            </Container>
        </Navbar>
    )
}

export default Navigation;
