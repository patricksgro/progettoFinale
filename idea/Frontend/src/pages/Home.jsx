import { Col, Container, Row } from "react-bootstrap"
import Sidebar from "../components/Sidebar"
import Feed from "../components/Feed"
import PeopleNearYou from "../components/PeopleNearYou"
import FooterPages from '../components/FooterPages'
import ChatSidebar from "../components/ChatSidebar"

function Home() {

    return (
        <>
            <Container fluid className="p-0" >
                <Row style={{ paddingTop: '80px' }}>
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
                        <ChatSidebar />
                    </Col>
                </Row>
            </Container>
            <FooterPages />
        </>
    )
}

export default Home