import { useState } from "react"
import { deleteUSer } from "../../data/auth"
import { useAuthContext } from "../../context/authContext"
import { useNavigate } from "react-router-dom"

function ProfileOptionsSimple() {

    const {loggeedUser, logout} = useAuthContext()
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)

    const removeUser = async () => {
        await deleteUSer(loggeedUser._id)
        navigate('/login')
        logout()
    }

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <img
                src="/public/icons8-menu-48.png"
                alt="options"
                width={25}
                style={{ cursor: "pointer" }}
                onClick={() => setOpen(!open)}
            />

            {open && (
                <div
                    style={{
                        position: "absolute",
                        top: "30px",
                        right: 0,
                        background: "#fff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                        width: "120px",
                    }}
                >
                    <div
                        style={{ padding: "8px 12px", cursor: "pointer" }}
                        onClick={removeUser}
                    >
                        Delete Profile
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileOptionsSimple