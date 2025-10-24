import axios from "./axios.js"

export async function getAllPosts() {
    try {
        const response = await axios.get('/posts')
        return response.data
    } catch (err) {
        console.log(err)
    }
}


export async function createPost(newPost) {
    try {
        const response = await axios.post('/posts', newPost)
        return response.data
    } catch (err) {
        console.log(err)
    }
}


export async function editPost(postID, newPost) {
    try {
        const response = await axios.put(`/posts/${postID}`, newPost)
        return response.data
    } catch (err) {
        console.log(err)
    }
}


export async function editCover(postID, coverFile) {
    try {
        const formData = new FormData()
        formData.append("cover", coverFile)

        const response = await axios.patch(`/posts/${postID}/updateCover`, formData)
        return response.data

    } catch (err) {
        console.log(err)
    }
}


export async function deletePost(postID) {
    try {
        const response = await axios.delete(`/posts/${postID}`)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

