import { useState } from 'react';
import { asignarUsuarios } from '../services/tareaService';

const useAsignarUsuarios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const asignar = async (tareaId, creadorId, usuarioId) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await asignarUsuarios(tareaId, creadorId, usuarioId);

      if (result.error) {
        setError(result.error);
        return { success: false, error: result.error };
      }

      setData(result);
      return { success: true };
    } catch (err) {
      setError('Error al asignar usuario');
      return { success: false, error: 'Error al asignar usuario' };
    } finally {
      setLoading(false);
    }
  };

  return { asignar, loading, error, data };
};

export default useAsignarUsuarios;



