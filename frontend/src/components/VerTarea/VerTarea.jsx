import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function VerTarea() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tarea, setTarea] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Puedes reemplazar la URL por tu API real
    fetch(`http://localhost:3000/api/tareas/${id}`)
      .then(res => res.json())
      .then(data => {
        setTarea(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar la tarea:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando tarea...</p>;
  if (!tarea) return <p>No se encontró la tarea</p>;

  return (
    <section>
      <h2>Detalles de la tarea</h2>
      <p><strong>Título:</strong> {tarea.titulo}</p>
      <p><strong>Descripción:</strong> {tarea.descripcion}</p>
      <p><strong>Fecha de cierre:</strong> {new Date(tarea.fechaCierre).toLocaleString()}</p>
      <p><strong>Prioridad:</strong> {tarea.prioridad}</p>
      <p><strong>Materia:</strong> {tarea.materia}</p>
      <button onClick={() => navigate(-1)}>Volver</button>
    </section>
  );
}

export default VerTarea;
