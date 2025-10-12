import { Col, Container, Row } from "react-bootstrap"
import Sidebar from "../components/Sidebar"

function Home () {
    return(
        <Container fluid className="p-0 ">
            <Row>
                {/* LEFT COL - SIDEBAR */}
                <Col>
                <Sidebar/>
                </Col>
            </Row>
        </Container>
    )
}

export default Home