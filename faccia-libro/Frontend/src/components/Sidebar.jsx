import { useState } from "react";
import { useAuthContext } from "../../context/authContext"
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";



function Sidebar() {
    const {logout} = useAuthContext()

    const [collapsed, setCollapsed] = useState(false)

    return (
        <div
            className="d-flex flex-column border-end bg-body-tertiary text-dark"
            style={{
                width: collapsed ? "80px" : "240px",
                height: "100vh",
                transition: "width 0.3s ease",
                position: "fixed",
            }}
        >
            {/* HEADER */}
            <div className="d-flex align-items-center justify-content-between mb-4">
                {!collapsed && <h4 className="m-0 fw-bold"></h4>}
                <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setCollapsed(!collapsed)}
                    style={{ border: "none" }}
                >
                    <i
                        className={`bi ${collapsed ? "bi-chevron-double-right" : "bi-chevron-double-left"
                            }`}
                    ></i>
                </button>
            </div>

            {/* MENU ITEMS */}
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item mb-2">
                    <button className="nav-link text-dark d-flex align-items-center gap-3">
                        <i className="bi bi-house-door fs-5"></i>
                        {!collapsed && <span>Home</span>}
                    </button>
                </li>

                <li className="nav-item mb-2">
                    <Card.Link to='/userProfile' as={Link} className="nav-link text-dark d-flex align-items-center gap-3">
                        <i className="bi bi-person fs-5"></i>
                        {!collapsed && <span>Profile</span>}
                    </Card.Link>
                </li>

                <hr />

                <li className="nav-item mb-2">
                    <button className="nav-link text-dark d-flex align-items-center gap-3">
                        <i className="bi bi-speedometer2 fs-5"></i>
                        {!collapsed && <span>Dashboard</span>}
                    </button>
                </li>

                <li className="nav-item mb-2">
                    <button className="nav-link text-dark d-flex align-items-center gap-3">
                        <i className="bi bi-chat-dots fs-5"></i>
                        {!collapsed && <span>Messages</span>}
                    </button>
                </li>

                <li className="nav-item mb-2">
                    <button className="nav-link text-dark d-flex align-items-center gap-3">
                        <i className="bi bi-bell fs-5"></i>
                        {!collapsed && <span>Notifications</span>}
                    </button>
                </li>

                <li className="nav-item mb-2">
                    <button className="nav-link text-dark d-flex align-items-center gap-3">
                        <i className="bi bi-gear fs-5"></i>
                        {!collapsed && <span>Settings</span>}
                    </button>
                </li>

                <li className="nav-item mt-3 border-top pt-3">
                    <button onClick={logout} className="nav-link text-dark d-flex align-items-center gap-3">
                        <i className="bi bi-box-arrow-right fs-5"></i>
                        {!collapsed && <span>Logout</span>}
                    </button>
                </li>
            </ul>

            {/* FOOTER / USER INFO */}
            <div className="mt-auto pt-3 border-top">
                <div className="d-flex align-items-center">
                    <img
                        src="https://via.placeholder.com/40"
                        alt="User"
                        className="rounded-circle me-2"
                        style={{ width: "40px", height: "40px" }}
                    />
                    {!collapsed && (
                        <div>
                            <strong>Mario Rossi</strong>
                            <br />
                            <small className="text-secondary">Developer</small>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Sidebar