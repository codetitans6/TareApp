import { useState, useEffect } from 'react'
import { crearTarea } from '../services/tareaService'


const useCrearTarea = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const submitTarea = async (tareaData, callback) => {
        setLoading(true)
        setError(null)
        setSuccess(false)
        try {
            await crearTarea(tareaData)
            setSuccess(true)
            if (callback) callback()
        } catch (error) {
            setError(error.message || 'Error inesperado')
        } finally {
            setLoading(false)
        }
    }
    return { submitTarea, loading, error, success };
}
export default useCrearTarea;