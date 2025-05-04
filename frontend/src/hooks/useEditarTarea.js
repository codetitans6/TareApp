import { useState, useEffect } from 'react';
import { getTareaById } from '../services/tareaService';
import { useParams } from 'react-router-dom';

const useEditarTarea = () => {
    const { id } = useParams();
    const [tarea, setTarea] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTareaById = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getTareaById(id);
                setTarea(data);
            } catch (err) {
                setError('Error al obtener la tarea por su ID');
            } finally {
                setLoading(false);
            }
        };

        fetchTareaById();
    }, [id]);

    return { tarea, setTarea, loading, error };
};

export default useEditarTarea;
