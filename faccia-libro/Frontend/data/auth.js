import axios from './axios.js'

export async function getMe() {
    try {
        const response = await axios.get('/users/me')
        return response.data
    } catch (err) {
        console.log(err)
    }
}


export async function ediUserProfile(userID, data) {
    try {
        const response = await axios.put(`/users/${userID}`, data)
        return response.data
    } catch (err) {
        console.log(err)
    }
}


export async function editAvatar(avatar) {
    try {
        const formData = new FormData()
        formData.append("avatar", avatar)

        const response = await axios.patch(`/users/updateAvatar`, formData)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

//DELETE USER


export async function getUsers(search) {
    try {
        const response = await axios.get('/users', {
            params: { search }
        })
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export async function getSingleUser(userID) {
    try {
        const response = await axios.get(`/users/${userID}`)
        return response.data
    } catch (err) {
        console.log(err)
    }
}