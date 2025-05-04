import style from './Tareas.module.css'
import { Link } from 'react-router-dom'
import useTareas from '../../hooks/useTareas';
import { Tooltip } from 'react-tooltip'
function Tareas() {
    const { tareas, loading, error } = useTareas();
    if (loading) return <p>Cargando tareas...</p>;
    if (error) return <p>{error}</p>;
    let content;

    if (tareas && tareas.length > 0) {
        content = tareas.map((tarea) => (
            <tr key={tarea._id}>
                <td>{tarea.titulo}</td>
                <td>{new Date(tarea.fechaCierre).toLocaleString('es-ES', {
                    timeZone: 'UTC',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                })} </td>
                <td>{tarea.prioridad}</td>
                <td>{tarea.materia}</td>
                <td>{tarea.recordatorio ? 'Activado' : 'Desactivado'}</td>
                <td>
                    <div>
                        <button className={style.accion_boton} data-tooltip-id="eliminar" data-tooltip-content="Eliminar tarea" data-tooltip-place="top"><svg xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" viewBox="0 0 24 24"><path fill="#d06262" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z" /></svg></button>
                        <Link to={`/editar/${tarea._id}`}><button className={style.accion_boton} data-tooltip-id="editar" data-tooltip-content="Editar tarea" data-tooltip-place="top" ><svg xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" viewBox="0 0 24 24"><g fill="none" stroke="#059669" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" /></g></svg></button></Link>
                        <button className={style.accion_boton} data-tooltip-id="ver" data-tooltip-content="Ver tarea" data-tooltip-place="top" ><svg xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" viewBox="0 0 24 24"><path fill="#333333" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5" /></svg></button>
                    </div>
                </td>
            </tr>
        ));
    } else {
        content = (
            <tr>
                <td colSpan={7}>No hay tareas</td>
            </tr>
        );
    }

    return (
        <>
            <section className={style.container}>
                <article className={style.gestion}>
                    <h3 className={style.gestion__titulo} >Gestion de tareas</h3>
                    <Link to='/crear-tarea' className={style.link}> <button className={style.gestion__boton_add}>Crear Tarea</button></Link>
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
                        </tbody>
                    </table>
                </article>
            </section>

        </>
    )
}
export default Tareas