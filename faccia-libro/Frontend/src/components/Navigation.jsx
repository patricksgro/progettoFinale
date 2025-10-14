import { Container, Form, FormControl, Navbar } from "react-bootstrap"
import { useAuthContext } from "../../context/authContext"

function Navigation() {

    const { loggeedUser } = useAuthContext()

    const showFullNav = location.pathname === '/login'

    return (
        <Navbar expand="lg" className="bg-body-tertiary py-3 shadow-sm">
            <Container className="d-flex align-items-center justify-content-between">

                <Navbar.Brand href="#" className="fs-2 fw-bold me-4">
                    IDEA
                </Navbar.Brand>

                {
                    !showFullNav &&
                    <Form className="flex-grow-1 mx-5" style={{ maxWidth: "600px" }}>
                        <FormControl
                            type="search"
                            placeholder="Search..."
                            className="me-2"
                            aria-label="Search"
                        />
                    </Form>
                }

                {
                    !showFullNav &&
                    <div className="d-flex align-items-center gap-4">
                        <div>
                            <img src="public/icons8-messages-50.png" alt="messages" width={'32px'} />
                        </div>
                        <div>
                            <img src="public/icons8-bell-50.png" alt="notifications" width={'32px'} />
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
        </Navbar>
    )
}

export default Navigation