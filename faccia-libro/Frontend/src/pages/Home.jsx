import { Col, Container, Row } from "react-bootstrap"
import Sidebar from "../components/Sidebar"
import Feed from "../components/Feed"
import PeopleNearYou from "../components/PeopleNearYou"
import Chat from "../components/Chat"

function Home() {
    return (
        <Container fluid className="p-0 ">
            <Row>
                {/* LEFT COL - SIDEBAR */}
                <Col>
                    <Sidebar />
                </Col>
                {/* FEED - MAIN CONTENT */}
                <Col>
                    <Feed />
                </Col>
                {/* INTERESSI SIMILI */}
                <Col>
                    <PeopleNearYou />
                </Col>
                {/* CHAT */}
                <Col>
                    <Chat />
                </Col>
            </Row>
        </Container>
    )
}

export default Home