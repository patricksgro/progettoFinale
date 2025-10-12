import { useState } from "react";
import { Collapse, Button } from "react-bootstrap";


function Sidebar() {

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
                    <a href="#" className="nav-link text-dark d-flex align-items-center gap-3">
                        <i className="bi bi-house-door fs-5"></i>
                        {!collapsed && <span>Home</span>}
                    </a>
                </li>

                <li className="nav-item mb-2">
                    <a href="#" className="nav-link text-dark d-flex align-items-center gap-3">
                        <i className="bi bi-person fs-5"></i>
                        {!collapsed && <span>Profile</span>}
                    </a>
                </li>

                <hr />

                {/* <h4 className="fw-bold text-center">
                    Favourites
                </h4> */}

                <li className="nav-item mb-2">
                    <a href="#" className="nav-link text-dark d-flex align-items-center gap-3">
                        <i className="bi bi-speedometer2 fs-5"></i>
                        {!collapsed && <span>Dashboard</span>}
                    </a>
                </li>

                <li className="nav-item mb-2">
                    <a href="#" className="nav-link text-dark d-flex align-items-center gap-3">
                        <i className="bi bi-chat-dots fs-5"></i>
                        {!collapsed && <span>Messages</span>}
                    </a>
                </li>

                <li className="nav-item mb-2">
                    <a href="#" className="nav-link text-dark d-flex align-items-center gap-3">
                        <i className="bi bi-bell fs-5"></i>
                        {!collapsed && <span>Notifications</span>}
                    </a>
                </li>

                <li className="nav-item mb-2">
                    <a href="#" className="nav-link text-dark d-flex align-items-center gap-3">
                        <i className="bi bi-gear fs-5"></i>
                        {!collapsed && <span>Settings</span>}
                    </a>
                </li>

                <li className="nav-item mt-3 border-top pt-3">
                    <a href="#" className="nav-link text-dark d-flex align-items-center gap-3">
                        <i className="bi bi-box-arrow-right fs-5"></i>
                        {!collapsed && <span>Logout</span>}
                    </a>
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