import axios from './axios.js'

export async function sendMessage(id, messagesBody) {
    try {
        const response = await axios.post(`/messages/${id}/send`, messagesBody)
        return response.data
    } catch (err) {
        console.log(err)
    }
}