import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('id')
        }
    }, [token]);
    const cerrarSesion = () => {
        setToken(null);
        localStorage.removeItem('token')
        localStorage.removeItem('id')
    };
    return (
        <AuthContext.Provider value={{ token, setToken, cerrarSesion }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
