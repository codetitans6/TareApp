import style from './Tareas.module.css'
import { Link } from 'react-router-dom'
import useTareas from '../../hooks/useTareas';
import { Tooltip } from 'react-tooltip'
import { useState } from 'react';
import ShareTarea from '../../components/ShareTarea/ShareTarea';
import tarea from '../../../../server/src/models/tarea.model';
function Tareas() {
    const { tareas, loading, error } = useTareas();
    const [tareaId, setTareaId] = useState()
    const [isShareOpen, setShareOpen] = useState(false)
    if (loading) return <p>Cargando tareas...</p>;
    if (error) return <p>{error}</p>;
    const abrirShare = () => setShareOpen(true)
    const cerrarShare = () => setShareOpen(false)

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
                <td className={style.prioridad}>{tarea.prioridad}</td>
                <td>{tarea.materia}</td>
                <td>{tarea.recordatorio ? 'Activado' : 'Desactivado'}</td>
                <td>
                    <div>
                        <button className={style.accion_boton} data-tooltip-id="eliminar" data-tooltip-content="Eliminar tarea" data-tooltip-place="top"><svg xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" viewBox="0 0 24 24"><path fill="#d06262" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z" /></svg></button>
                        <Link to={`/editar/${tarea._id}`}><button className={style.accion_boton} data-tooltip-id="editar" data-tooltip-content="Editar tarea" data-tooltip-place="top" ><svg xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" viewBox="0 0 24 24"><g fill="none" stroke="#059669" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" /></g></svg></button></Link>
                        <button className={style.accion_boton} data-tooltip-id="ver" data-tooltip-content="Ver tarea" data-tooltip-place="top" ><svg xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" viewBox="0 0 24 24"><path fill="#333333" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5" /></svg></button>
                    </div>
                </td>
                <td><button onClick={() => {abrirShare(); setTareaId(tarea._id)}} className={style.accion_boton}><svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24"><path fill="none" stroke="#059669" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0 7a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0-14a1 1 0 1 0 2 0a1 1 0 1 0-2 0"/></svg></button></td>
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
                <ShareTarea isOpen={isShareOpen} onClose={cerrarShare} tareaId={tareaId}></ShareTarea>
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
                                <td><svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="#059669" d="M16.61 21q-.994 0-1.687-.695q-.692-.696-.692-1.69q0-.15.132-.757l-7.197-4.273q-.324.374-.793.587t-1.007.213q-.986 0-1.676-.702T3 12t.69-1.683t1.676-.702q.537 0 1.007.213t.793.588l7.198-4.255q-.07-.194-.101-.385q-.032-.192-.032-.392q0-.993.697-1.689Q15.625 3 16.62 3t1.688.697T19 5.389t-.695 1.688t-1.69.692q-.542 0-1-.222t-.78-.597l-7.199 4.273q.07.194.101.386q.032.191.032.391t-.032.391t-.1.386l7.198 4.273q.323-.375.78-.597q.458-.222 1-.222q.994 0 1.69.696q.695.698.695 1.693t-.697 1.688t-1.692.692"/></svg></td>
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