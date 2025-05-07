import { useState } from 'react'
import { crearUsuario } from '../services/usuarioService'
import { useAuth } from '../context/AuthContext';

const useRegistroUsuario = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { setToken } = useAuth();

    const submitUsuarioNuevo = async (usuarioData, callback) => {
        setLoading(true)
        setError(null)
        setSuccess(false)
        try {
            const data = await crearUsuario(usuarioData);
            if (data.token) setToken(data.token);
            if (data.usuario) localStorage.setItem('id', data.usuario.id)
            setSuccess(true)
            if (callback) callback()
        } catch (error) {
            setError(error.message || 'Error inesperado')
        } finally {
            setLoading(false)
        }
    }
    return { submitUsuarioNuevo, loading, error, success };
}
export default useRegistroUsuario;