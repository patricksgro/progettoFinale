import axios from './axios.js'

export async function getMe() {
    try {
        const response = await axios.get('/users/me')
        return response.data
    } catch (err) {
        console.log(err)
    }
}