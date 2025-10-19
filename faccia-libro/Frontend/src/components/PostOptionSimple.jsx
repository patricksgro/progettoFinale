import { useState } from "react";
import { deletePost } from "../../data/post";
import ModalEditPost from "./ModalEditPost";

function PostOptionsSimple({ post }) {
    const [open, setOpen] = useState(false)
    const [showModalEditPost, setShowModalEditPost] = useState(false)
    const [selectedPost, setSelectedPost] = useState(null)

    const remove = async () =>{
        const results = await deletePost(post._id)
    }

    const handleOpenModalEditPost = (post) => {
        setSelectedPost(post)
        setShowModalEditPost(true)
    }

    const handleCloseModalEditPost = () => {
        setShowModalEditPost(false)
    }

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <img
                src="public/icons8-menu-48.png"
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
                        onClick={() => handleOpenModalEditPost(post)}
                    >
                        Edit
                    </div>
                    <div
                        style={{ padding: "8px 12px", cursor: "pointer" }}
                        onClick={remove}
                    >
                        Delete
                    </div>
                </div>
            )}

            {
                showModalEditPost && (
                    <ModalEditPost
                    closeModal={handleCloseModalEditPost}
                    post={selectedPost}
                    show={showModalEditPost} />
                )
            }
        </div>
    );
}

export default PostOptionsSimple;
