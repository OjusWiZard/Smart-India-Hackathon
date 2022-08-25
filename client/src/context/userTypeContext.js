import React from "react";
import { getUserInfo } from '../api'

const UserTypeContext = React.createContext();

const UserTypeProvider = ({ children }) => {
    const [isStudent, setIsStudent] = React.useState(localStorage.getItem('isStudent') || true);
    // (async () => {
    //     let nfo = await getUserInfo()
    // })()
    const toggleUserType = (isStudent) => {
        setIsStudent(!isStudent);
        localStorage.setItem('isStudent', isStudent);
    }

    return (
        <UserTypeContext.Provider value={{ isStudent, toggleUserType }}>
            {children}
        </UserTypeContext.Provider>
    );
};
export { UserTypeContext, UserTypeProvider };