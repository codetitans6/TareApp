import { useState } from 'react';
import { marcarNotificacionComoLeida } from '../services/tareaService'

export const useNotificaciones = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const marcarComoLeida = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const data = await marcarNotificacionComoLeida(id);
            return data;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        marcarComoLeida,
        loading,
        error,
    };
};
