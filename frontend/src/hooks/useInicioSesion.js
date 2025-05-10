import { useState } from 'react'
import { inicioSesion } from '../services/usuarioService'
import { useAuth } from '../context/AuthContext';

const useInicioSesion = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { setToken } = useAuth();

   const submitInicioSesion = async ({ correo, contrasena }, callback) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
        const data = await inicioSesion(correo, contrasena);
        if (data.error) {
            throw new Error(data.error);
        }
        if (data.token) setToken(data.token);
        if (data.usuario) localStorage.setItem('id', data.usuario.id);

        setSuccess(true);
        if (callback) callback();
    } catch (error) {
        setError(error.message || 'Error inesperado');
    } finally {
        setLoading(false);
    }
};

    return { submitInicioSesion, loading, error, success };
}
export default useInicioSesion;