import { useState } from 'react';
import { getUsuarioId } from '../services/tareaService';

const useUsuarioId = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');

  const submitUsuarioEmail = async () => {
    if (!email) {
      const errMsg = 'El email no puede estar vacío';
      setError({ error: errMsg });
      return { error: errMsg };
    }

    setLoading(true);
    setError(null);

    try {
      const id = await getUsuarioId(email);

      if (id?.error) {
        setError({ error: id.error });
        return { error: id.error };
      }

      return id;
    } catch (err) {
      const fallbackMsg = 'Error al obtener el ID del usuario';
      setError({ error: fallbackMsg });
      return { error: fallbackMsg };
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail, submitUsuarioEmail, loading, error };
};

export default useUsuarioId;


