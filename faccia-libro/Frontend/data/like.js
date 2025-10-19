import axios from "./axios.js"

export async function likePost(postID) {
    try {
        const response = await axios.post(`/likes/${postID}/addLike`)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export async function dislikePost(postID) {
    try {
        const response = await axios.post(`/likes/${postID}/removelike`)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export async function getlikesPost(postID) {
    try {
        const response = await axios.get(`/likes/${postID}/getLikes`)
        return response.data
    } catch (err) {
        console.log(err)
    }
}