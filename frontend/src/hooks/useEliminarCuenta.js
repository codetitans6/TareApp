import { useState } from 'react'
import { eliminarCuenta } from '../services/usuarioService'
import { useAuth } from '../context/AuthContext';

const useEliminarCuenta = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { cerrarSesion } = useAuth();

    const submitEliminarCuenta = async (userId, callback) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const data = await eliminarCuenta(userId)
            if (data.error) {
                throw new Error(data.error);
            }
            setSuccess(true);
            cerrarSesion()
            if (callback) callback();
        } catch (error) {
            setError(error.message || 'Error inesperado');
        } finally {
            setLoading(false);
        }
    };

    return { submitEliminarCuenta, loading, error, success };
}
export default useEliminarCuenta;