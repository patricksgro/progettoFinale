import axios from './axios.js'

export async function getFriends(id) {
    try {
        const response = await axios.get(`/friends/${id}`)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export async function sendRequest(recipientId) {
    try {
        const response = await axios.post(`/friends/send`, { recipientId })
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export async function cancelFriendRequest(recipientId) {
    try {
        const response = await axios.patch(`/friends/cancel/${recipientId}`,)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export async function getPendingRequests() {
    try {
        const response = await axios.get(`/friends/pendingRequests`,)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export async function acceptRequest(requesterId) {
    try {
        const response = await axios.patch(`/friends/accept/${requesterId}`,)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export async function declineRequest(requesterId) {
    try {
        const response = await axios.patch(`/friends/decline/${requesterId}`,)
        return response.data
    } catch (err) {
        console.log(err)
    }
}