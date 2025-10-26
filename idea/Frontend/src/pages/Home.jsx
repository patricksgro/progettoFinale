import { Col, Container, Row } from "react-bootstrap"
import Sidebar from "../components/Sidebar"
import Feed from "../components/Feed"
import PeopleNearYou from "../components/PeopleNearYou"
import FooterPages from '../components/FooterPages'
import ChatSidebar from "../components/ChatSidebar"
import '../style/style.css'

function Home() {

    return (
        <>
            <Container fluid className="p-0" >
                <Row style={{ paddingTop: '80px' }}>
                    {/* LEFT COL - SIDEBAR */}
                    <Col className="display-none-sidebar-979">
                        <Sidebar />
                    </Col>
                    {/* FEED - MAIN CONTENT */}
                    <Col className="marginTop-767">
                        <Feed />
                    </Col>
                    {/* INTERESSI SIMILI */}
                    <Col className="display-none-peopleNearYou-1600">
                        <PeopleNearYou />
                    </Col>
                    {/* CHAT */}
                    <Col className="display-none-chatSidebar-1300">
                        <ChatSidebar />
                    </Col>
                </Row>
            </Container>
            <FooterPages />
        </>
    )
}

export default Home