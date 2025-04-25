import style from './Tareas.module.css'
import { Link } from 'react-router-dom'
function Tareas() {
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
                                <th>Descripcion</th>
                                <th>Fecha de cierre</th>
                                <th>Prioridad</th>
                                <th>Materia</th>
                                <th>Recordatorio</th>
                                <th>Acciones</th>
                            </tr>

                        </thead>
                        <tbody>
                            <tr>
                                <td>Taller de matematicas 1</td>
                                <td>Terminar puntos 1 y 2 del taller</td>
                                <td>12/03/2024</td>
                                <td>Prioridad</td>
                                <td>Matematicas</td>
                                <td><button>Desactivado</button></td>
                                <td>Eliminar / Ver / Editar</td>
                            </tr>
                        </tbody>
                    </table>
                </article>
            </section>

        </>
    )
}
export default Tareas