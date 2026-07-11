import axios from 'axios'

const api = axios.create({
    baseURL: 'https://resume-gen-ai-vfv5.onrender.com',
    withCredentials: true
})

export const register = async ({ username, email, password }) => {
    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        })

        return response.data
    } catch (err) {
        console.log(err)
    }
}

export const login = async ({ username, email, password }) => {
    try {

        const response = await api.post('/api/auth/login', {
            username, email, password
        })

        return response.data

    } catch (err) {
        console.log(err)
    }
}

export const logout = async () => {
    try {
        const response = await api.get('/api/auth/logout')

        return response.data
    } catch (err) {
        console.log(err)
    }
}

export const getMe = async () => {
    try {
        const response = await api.get('/api/auth/get-me')
        // console.log('resposnse', response.data)
        return response.data
    } catch (err) {
        console.log(err)
    }
}