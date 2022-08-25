import React, { useNavigation, useContext } from 'react'
import { UserTypeContext } from "../../context/userTypeContext"

export default function AuthenticatedIssuer({ children }) {
    const navigate = useNavigation()
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
