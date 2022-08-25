import React, { useContext } from 'react'
import { UserTypeContext } from "../../context/userTypeContext"
import { useNavigate } from "react-router-dom"
export default function AuthenticatedIssuer({ children }) {
    const navigate = useNavigate()
    const { isStudent } = useContext(UserTypeContext);
    const user = localStorage.getItem('jwt-token')
    if (user) {
        if (isStudent) {
            navigate('/dashboard')
        } else {
            navigate('/scholarships')
        }
    } else {
        navigate('/login')
    }
    return (
        { children }
    )
}
