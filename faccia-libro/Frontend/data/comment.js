import axios from './axios.js'

export async function createComment(id, newComment) {
    try {
        const response = await axios.post(`/posts/${id}/comments`, newComment)
        return response.data
    } catch (err) {
        console.log(err)
    }
}


export async function editComment(id, commentID, newComment) {
    try {
        const response = await axios.put(`/posts/${id}/comments/${commentID}`, newComment)
        return response.data
    } catch (err) {
        console.log(err)
    }
}


export async function removeComment(id, commentID, newComment) {
    try {
        const response = await axios.delete(`/posts/${id}/comments/${commentID}`, newComment)
        return response.data
    } catch (err) {
        console.log(err)
    }
}