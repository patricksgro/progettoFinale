import { useEffect, useState } from "react"
import { getAllUsers } from "../../data/auth"
import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

function PeopleNearYou() {

    const [users, setUsers] = useState(null)

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const users = await getAllUsers()
        setUsers(users)
    }

    return (
        <Card
            className="p-3 my-4"
            style={{
                borderRadius: "20px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                maxWidth: "300px",
                zIndex: 1
            }}
        >
            <h5 className="fw-bold mb-3">Persone che potresti conoscere</h5>
            {users && users.slice(0, 8).map(user => (
                <div
                    key={user._id}
                    className="d-flex align-items-center justify-content-between p-2 mb-2"
                    style={{
                        borderRadius: "12px",
                        transition: "all 0.2s ease",
                        cursor: "pointer",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#f8f9fa"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                    <div className="d-flex align-items-center">
                        <img
                            src={user.avatar}
                            alt="profile"
                            style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                marginRight: "10px",
                                border: "2px solid #fff",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                            }}
                        />
                        <Link to={`/user/${user._id}`} className="fw-medium" style={{textDecoration: 'none', color: 'black'}}>{user.name} {user.surname}</Link>
                    </div>
                </div>
            ))}
        </Card>
    )
}

export default PeopleNearYou
