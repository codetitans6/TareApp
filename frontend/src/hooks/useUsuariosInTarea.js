import { useState, useEffect } from 'react';
import { getUsuariosInTarea } from '../services/tareaService';

const useUsuariosInTarea = (tareaId) => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsuarios = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getUsuariosInTarea(tareaId);

      if (data?.error) {
        setError({ error: data.error });
      } else {
        setUsuarios(data);
      }
    } catch (err) {
      setError({ error: 'Error al obtener los usuarios de la tarea' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tareaId) fetchUsuarios();
  }, [tareaId]);

  return { usuarios, loading, error };
};

export default useUsuariosInTarea;

