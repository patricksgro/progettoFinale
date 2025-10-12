import { createContext, useContext, useState, useEffect } from "react";
import {  useNavigate } from 'react-router-dom'
import { getMe } from "../data/auth";
//da importare la chiamata axios per endpoint me

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [loggeedUser, setLoggedUser] = useState(null)

    const navigate = useNavigate()

    const login = (jwt) => {
        localStorage.setItem('token', jwt)
        setToken(jwt)
        navigate('/home', { replace: true })
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        setLoggedUser(null)
        navigate('/login', { replace: true })
    }

    const fetchLoggedUser = async () => {
        if (!token) return
        const results = await getMe()
        setLoggedUser(results)
    }

    console.log(loggeedUser)

    useEffect(() => {
        if (token) {
            fetchLoggedUser()
        }
    }, [token])

    return (
        <AuthContext.Provider value={{ token, loggeedUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

};


export function useAuthContext() {
    return useContext(AuthContext)
}


