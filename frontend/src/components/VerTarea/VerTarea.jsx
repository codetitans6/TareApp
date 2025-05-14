import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function VerTarea() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tarea, setTarea] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  if (loading) return <p style={styles.loading}>Cargando tarea...</p>;
  if (!tarea) return <p style={styles.error}>No se encontró la tarea</p>;

  return (
    <section style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📋 Detalles de la tarea</h2>
        <p><strong>Título:</strong> {tarea.titulo}</p>
        <p><strong>Descripción:</strong> {tarea.descripcion}</p>
        <p><strong>Fecha de cierre:</strong> {new Date(tarea.fechaCierre).toLocaleString('es-ES')}</p>
        <p><strong>Prioridad:</strong> {tarea.prioridad}</p>
        <p><strong>Materia:</strong> {tarea.materia}</p>
        <p><strong>Proyecto:</strong> {tarea.proyecto || 'No asignado'}</p>
        <p><strong>Completada:</strong> {tarea.completada ? '✅ Sí' : '❌ No'}</p>

        <button style={styles.button} onClick={() => navigate(-1)}>⬅️ Volver</button>
      </div>
    </section>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem',
    backgroundColor: '#f9fafb',
    minHeight: '100vh',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    width: '100%',
    lineHeight: '1.6',
  },
  title: {
    marginBottom: '1rem',
    color: '#059669',
  },
  button: {
    marginTop: '2rem',
    padding: '0.6rem 1.2rem',
    backgroundColor: '#059669',
    color: '#fff',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  loading: {
    textAlign: 'center',
    padding: '2rem',
  },
  error: {
    textAlign: 'center',
    padding: '2rem',
    color: 'red',
  },
};

export default VerTarea;

