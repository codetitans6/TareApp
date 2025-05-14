import style from './Tareas.module.css'
import { Link } from 'react-router-dom'
import useTareas from '../../hooks/useTareas';
import { Tooltip } from 'react-tooltip'
import { useState } from 'react';
import ShareTarea from '../../components/ShareTarea/ShareTarea';

function Tareas() {
    const completarTarea = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/tareas/${id}/completar`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' }
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
    const eliminarTarea = async (id) => {
        const confirmar = window.confirm('¿Estás seguro de que deseas eliminar esta tarea?');

        if (!confirmar) return;

        try {
            const response = await fetch(`http://localhost:3000/api/tareas/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('No se pudo eliminar la tarea');
            }

            // recargar las tareas (opcionalmente usa estado para evitar recarga total)
            window.location.reload();
        } catch (error) {
            console.error('Error al eliminar tarea:', error);
        }
    };
    const [verCompletadas, setVerCompletadas] = useState(false);
    const [filtroMateria, setFiltroMateria] = useState('');
    const [filtroProyecto, setFiltroProyecto] = useState('');
    const [filtroFechaInicio, setFiltroFechaInicio] = useState('');
    const [filtroFechaFin, setFiltroFechaFin] = useState('');
    const { tareas, loading, error } = useTareas();
    const tareasFiltradas = tareas?.filter(t => {
    const coincideEstado = t.completada === verCompletadas;
    const coincideMateria = filtroMateria === '' || t.materia.toLowerCase().includes(filtroMateria.toLowerCase());
    const coincideProyecto = filtroProyecto === '' || t.proyecto?.toLowerCase().includes(filtroProyecto.toLowerCase());

    const fechaCierre = new Date(t.fechaCierre);
    const dentroDeRango =
        (!filtroFechaInicio || fechaCierre >= new Date(filtroFechaInicio)) &&
        (!filtroFechaFin || fechaCierre <= new Date(filtroFechaFin));

    return coincideEstado && coincideMateria && coincideProyecto && dentroDeRango;
    });

    const [tareaId, setTareaId] = useState()
    const [isShareOpen, setShareOpen] = useState(false)

    if (loading) return <p>Cargando tareas...</p>;
    if (error) return <p className={style.error}>{error}</p>;
    const abrirShare = () => setShareOpen(true)
    const cerrarShare = () => setShareOpen(false)
    let content
    if (tareasFiltradas && tareasFiltradas.length > 0) {
        content = tareasFiltradas.map((tarea) => (
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
                        <button
                            className={style.accion_boton}
                            data-tooltip-id="eliminar"
                            data-tooltip-content="Eliminar tarea"
                            data-tooltip-place="top"
                            onClick={() => eliminarTarea(tarea._id)}
                        >
                            🗑️
                        </button>
                        <Link to={`/editar/${tarea._id}`}>
                            <button className={style.accion_boton} data-tooltip-id="editar" data-tooltip-content="Editar tarea" data-tooltip-place="top">✏️</button>
                        </Link>
                        <Link to={`/ver-tarea/${tarea._id}`}>
                            <button className={style.accion_boton} data-tooltip-id="ver" data-tooltip-content="Ver tarea" data-tooltip-place="top">👁️</button>
                        </Link>
                    </div>
                </td>
                <td><button onClick={() => {abrirShare(); setTareaId(tarea._id)}} className={style.accion_boton}><svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24"><path fill="none" stroke="#059669" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0 7a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0-14a1 1 0 1 0 2 0a1 1 0 1 0-2 0"/></svg></button></td>
            </tr >
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
                <ShareTarea isOpen={isShareOpen} onClose={cerrarShare} tareaId={tareaId}></ShareTarea>
                <article className={style.gestion}>
                    <h3 className={style.gestion__titulo} >Gestion de tareas</h3>
                    <div className={style.filtros}>
                        <input
                            type="text"
                            placeholder="Filtrar por materia"
                            value={filtroMateria}
                            onChange={(e) => setFiltroMateria(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Filtrar por proyecto"
                            value={filtroProyecto}
                            onChange={(e) => setFiltroProyecto(e.target.value)}
                        />
                        De:
                        <input
                            type="date"
                            value={filtroFechaInicio}
                            onChange={(e) => setFiltroFechaInicio(e.target.value)}
                        />
                        Hasta:
                        <input
                            type="date"
                            value={filtroFechaFin}
                            onChange={(e) => setFiltroFechaFin(e.target.value)}
                        />
                    </div>
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
                                <td><svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="#059669" d="M16.61 21q-.994 0-1.687-.695q-.692-.696-.692-1.69q0-.15.132-.757l-7.197-4.273q-.324.374-.793.587t-1.007.213q-.986 0-1.676-.702T3 12t.69-1.683t1.676-.702q.537 0 1.007.213t.793.588l7.198-4.255q-.07-.194-.101-.385q-.032-.192-.032-.392q0-.993.697-1.689Q15.625 3 16.62 3t1.688.697T19 5.389t-.695 1.688t-1.69.692q-.542 0-1-.222t-.78-.597l-7.199 4.273q.07.194.101.386q.032.191.032.391t-.032.391t-.1.386l7.198 4.273q.323-.375.78-.597q.458-.222 1-.222q.994 0 1.69.696q.695.698.695 1.693t-.697 1.688t-1.692.692" /></svg></td>
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