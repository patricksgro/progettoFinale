
import { motion } from "framer-motion"
import { Heart, Users, FileText } from "lucide-react"

function InfoUser({isOwner, currentUser, loggeedUser}) {

    return (
        <>
            {loggeedUser && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-0"
                    style={{
                        position: "relative",
                        marginTop: "-40px",
                        maxWidth: "800px",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}
                >
                    {/* Avatar rimane identico */}
                    <div className="text-center">
                        <img
                            src={isOwner ? loggeedUser.avatar : currentUser.avatar}
                            alt="avatar"
                            style={{
                                borderRadius: "50%",
                                marginTop: "-100px",
                                border: "solid 3px #fff",
                                boxShadow: "0 6px 20px rgba(0,0,0,0.15)"
                            }}
                            width={"175px"}
                        />
                    </div>

                    {/* Nome e email */}
                    <div className="text-center mt-4">
                        <h1 className="fw-bold mb-1" style={{ color: "#1e293b", fontSize: "2rem" }}>
                            {isOwner ? loggeedUser.name : currentUser.name} {isOwner ? loggeedUser.surname : currentUser.surname}
                        </h1>
                        <h5 className="text-muted" style={{ fontWeight: 400 }}>{isOwner ? loggeedUser.email : currentUser.email}</h5>
                    </div>

                    {/* Stats principali */}
                    <div
                        className="d-flex justify-content-around align-items-center my-5"
                        style={{
                            background: "linear-gradient(90deg, rgba(99,102,241,0.05), rgba(147,197,253,0.05))",
                            padding: "20px 0",
                            borderRadius: "20px"
                        }}
                    >
                        <motion.div whileHover={{ scale: 1.1 }} className="text-center">
                            <Users size={22} className="text-indigo-500 mb-1" />
                            {/* <p style={{ margin: 0, fontWeight: 600 }}>{loggeedUser.friendsCount || 215}</p> */}
                            <small className="text-muted">Friends</small>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.1 }} className="text-center">
                            <FileText size={22} className="text-indigo-500 mb-1" />
                            <p style={{ margin: 0, fontWeight: 600 }}>{ isOwner ? loggeedUser.posts.length: currentUser.posts.length}</p>
                            <small className="text-muted">Posts</small>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.1 }} className="text-center">
                            <Heart size={22} className="text-indigo-500 mb-1" />
                            {/* <p style={{ margin: 0, fontWeight: 600 }}>{loggeedUser.likesCount || 25155}</p> */}
                            <small className="text-muted">Likes</small>
                        </motion.div>
                    </div>

                    {/* Bio */}
                    <div className="text-center px-4 mb-5" style={{ maxWidth: "700px", margin: "0 auto", lineHeight: "1.6" }}>
                        {loggeedUser.bio === "" ? (
                            <motion.h5
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="fst-italic text-secondary"
                            >
                                Scrivi qualcosa su di te...
                            </motion.h5>
                        ) : (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                style={{ color: "#334155", fontSize: "1.1rem" }}
                            >
                                {isOwner ? loggeedUser.bio: currentUser.bio}
                            </motion.p>
                        )}
                    </div>

                    {/* Divider leggero */}
                    <hr style={{ borderColor: "#e2e8f0", margin: "2rem 0" }} />
                </motion.div>
            )}
        </>
    )
}

export default InfoUser
