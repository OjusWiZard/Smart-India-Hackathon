import React, { useContext, useNavigation } from 'react'
import { UserTypeContext } from "./context/userTypeContext"

export default function UnAuthenticatedUser({ children }) {
    const navigate = useNavigation()
    // const { isStudent } = useContext(UserTypeContext);
    const user = localStorage.getItem('jwt-token')
    if (!user) {
        navigate('/login')
    }
    return (
        children
    )
}
