import React from "react";

const UserTypeContext = React.createContext();

const UserTypeProvider = ({ children }) => {
    const [isStudent, setIsStudent] = React.useState(localStorage.getItem('isStudent') || true);
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