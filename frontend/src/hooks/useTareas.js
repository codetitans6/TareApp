import { useState, useEffect } from 'react';
import { getAllTareas } from '../services/tareaService';

const useTareas = () => {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTareas = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllTareas();
      setTareas(data);
    } catch (err) {
      setError('Error al obtener tareas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTareas();
  }, []);

  return { tareas, loading, error };
};
export default useTareas;
