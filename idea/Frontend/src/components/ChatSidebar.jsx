import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { getAllUsers } from '../../data/auth';

function ChatSidebar() {
    const [collapsed, setCollapsed] = useState(false)
    const [users, setUsers] = useState(null)

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const results = await getAllUsers()
        setUsers(results)
    }

    return (
        <>
            {
                users &&
                <div
                    className="d-flex flex-column text-dark"
                    style={{
                        width: collapsed ? '80px' : '280px',
                        height: '100vh',
                        transition: 'width 0.3s ease',
                        position: 'fixed',
                        right: 0,
                        top: 0,
                        background: '#fff',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                        borderRadius: '25px 0 0 25px',
                        overflow: 'hidden',
                        padding: '20px 10px',
                        paddingTop: '110px'
                    }}
                >
                    {/* HEADER */}
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        {!collapsed && <h4 className="m-0 fw-bold" style={{ fontSize: '1.3rem' }}>Start chatting</h4>}
                        <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => setCollapsed(!collapsed)}
                            style={{ border: 'none', background: 'transparent', fontSize: '1.2rem' }}
                        >
                            <i className={`bi ${collapsed ? 'bi-chevron-double-left' : 'bi-chevron-double-right'}`}></i>
                        </button>
                    </div>

                    {/* USERS LIST */}
                    <ul className="nav nav-pills flex-column mb-auto">
                        {users.slice(0,5).map(user => (
                            <li key={user.id} className="nav-item mb-2">
                                <Card.Link
                                    as={Card}
                                    className="nav-link text-dark d-flex align-items-center gap-3"
                                    style={{ borderRadius: '15px', padding: '10px 15px', transition: 'all 0.2s ease', cursor: 'pointer' }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                                >
                                    <img src={user.avatar} alt="avatar" className="rounded-circle" width={40} height={40} />
                                    {!collapsed && <span>{user.name}</span>}
                                </Card.Link>
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </>
    );
}

export default ChatSidebar;
