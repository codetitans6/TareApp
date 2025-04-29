import { useState } from 'react'
import { crearUsuario } from '../services/usuarioService'


const useRegistroUsuario = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const submitUsuarioNuevo = async (usuarioData, callback) => {
        setLoading(true)
        setError(null)
        setSuccess(false)
        try {
            await crearUsuario(usuarioData)
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