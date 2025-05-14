import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [usuario, setUsuario] = useState(() => {
        const storedUser = localStorage.getItem('usuario');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('id')
        }
    }, [token]);
    useEffect(() => {
        if (usuario) {
            localStorage.setItem('usuario', JSON.stringify(usuario));
        } else {
            localStorage.removeItem('usuario');
        }
    }, [usuario]);

    const cerrarSesion = () => {
        setToken(null);
        setUsuario(null);
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('usuario')
    };
    return (
         <AuthContext.Provider value={{ token, setToken, usuario, setUsuario, cerrarSesion }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
