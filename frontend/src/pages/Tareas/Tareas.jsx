import style from './Tareas.module.css'
import { Link } from 'react-router-dom'
import useTareas from '../../hooks/useTareas';
import { Tooltip } from 'react-tooltip'
function Tareas() {
    const completarTarea = async (id) => {
        try {
          const response = await fetch(`http://localhost:3001/api/tareas/${id}/completar`, {
            method: 'PATCH'
          });
      
          if (!response.ok) {
            throw new Error('No se pudo completar la tarea');
          }
      
          // recarga tareas después de completar
          window.location.reload(); // o puedes implementar una mejor forma con estado si prefieres
        } catch (error) {
          console.error('Error al completar tarea:', error);
        }
    };
    const [verCompletadas, setVerCompletadas] = useState(false);
    const tareasFiltradas = tareas?.filter(t => t.completada === verCompletadas);
    const { tareas, loading, error } = useTareas();
    if (loading) return <p>Cargando tareas...</p>;
    if (error) return <p>{error}</p>;
    let content;

    if (tareasFiltradas && tareasFiltradas.length > 0) {
        content = tareasFiltradas.map((tarea) => (
            <tr key={tarea._id}>
                <td>{tarea.titulo}</td>
                <td>{new Date(tarea.fechaCierre).toLocaleString('es-ES', {
                    timeZone: 'UTC',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                })}</td>
                <td>{tarea.prioridad}</td>
                <td>{tarea.materia}</td>
                <td>{tarea.recordatorio ? 'Activado' : 'Desactivado'}</td>
                <td>
                    <div>
                        {!tarea.completada && (
                            <button
                                className={style.accion_boton}
                                data-tooltip-id="completar"
                                data-tooltip-content="Marcar como completada"
                                data-tooltip-place="top"
                                onClick={() => completarTarea(tarea._id)}
                            >
                                ✅
                            </button>
                        )}
                        <button className={style.accion_boton} data-tooltip-id="eliminar" data-tooltip-content="Eliminar tarea" data-tooltip-place="top">🗑️</button>
                        <Link to={`/editar/${tarea._id}`}>
                            <button className={style.accion_boton} data-tooltip-id="editar" data-tooltip-content="Editar tarea" data-tooltip-place="top">✏️</button>
                        </Link>
                        <button className={style.accion_boton} data-tooltip-id="ver" data-tooltip-content="Ver tarea" data-tooltip-place="top">👁️</button>
                    </div>
                </td>
            </tr>
        ));
    } else {
        content = (
            <tr>
                <td colSpan={7}>
                    {verCompletadas ? 'No hay tareas completadas' : 'No hay tareas pendientes'}
                </td>
            </tr>
        );
    }
    

    return (
        <>
            <section className={style.container}>
                <article className={style.gestion}>
                    <h3 className={style.gestion__titulo} >Gestion de tareas</h3>
                    <Link to='/crear-tarea' className={style.link}> <button className={style.gestion__boton_add}>Crear Tarea</button></Link>
                    <button 
                        className={style.gestion__boton_add}
                        onClick={() => setVerCompletadas(!verCompletadas)}
                        >
                        {verCompletadas ? 'Ver tareas pendientes' : 'Ver tareas completadas'}
                    </button>
                    <table>
                        <thead>
                            <tr>
                                <th>Titulo</th>
                                <th>Fecha de cierre</th>
                                <th>Prioridad</th>
                                <th>Materia</th>
                                <th>Recordatorio</th>
                                <th>Acciones</th>
                            </tr>

                        </thead>
                        <tbody>
                            {content}
                            <Tooltip id="eliminar" />
                            <Tooltip id="editar" />
                            <Tooltip id="ver" />
                            <Tooltip id="completar" />
                        </tbody>
                    </table>
                </article>
            </section>

        </>
    )
}
export default Tareas