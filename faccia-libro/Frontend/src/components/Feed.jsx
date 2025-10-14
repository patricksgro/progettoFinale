import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { getAllPosts } from '../../data/post';

function Feed() {

    const [usersPost, setUsersPost] = useState(null)

    const getAllUsersPost = async () => {
        const results = await getAllPosts()
        setUsersPost(results)
    }

    useEffect(() => {
        getAllUsersPost()
    }, [])

    console.log(usersPost)

    return (
        <>
            {usersPost &&
                usersPost.map((post) => (
                    <Card
                        key={post._id}
                        style={{ maxWidth: '50rem', minWidth: '45rem' }}
                        className="my-5 bg-body-tertiary"
                    >
                        <Card.Body className='pb-0'>
                            <div className="d-flex align-items-center mb-2 ">
                                <img
                                    src={post.author.avatar}
                                    alt={`${post.author.name} ${post.author.surname}`}
                                    className="rounded-circle me-3"
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        objectFit: 'cover',
                                        border: '2px solid #dee2e6',
                                    }}
                                />

                                <div>
                                    <Card.Title className="my-0">
                                        {post.author.name} {post.author.surname}
                                    </Card.Title>
                                    <Card.Text className="text-muted my-0" style={{ fontSize: '0.9rem' }}>
                                        {new Date(post.createdAt).toLocaleDateString('it-IT', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </Card.Text>
                                </div>
                            </div>

                            <Card.Text>{post.description}</Card.Text>
                        </Card.Body>

                        <Card.Img
                            variant="top"
                            src={post.cover}
                            className="p-4"
                            style={{ borderRadius: '30px' }}
                        />

                        <Card.Body>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <img src="public/icons8-like.gif" alt="like" width={'32px'} />
                                </div>

                                <div>
                                    <img src="public/icons8-comment.gif" alt="comment" width={'30px'}/>
                                </div>
                            </div>

                        </Card.Body>
                    </Card>
                ))}
        </>
    )
}

export default Feed