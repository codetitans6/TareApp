import style from './CrearTarea.module.css'
import { Link } from 'react-router-dom'
import { use, useState } from 'react'
import useCrearTarea from '../../hooks/useCrearTarea';

function CrearTarea() {
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaCierre, setFechaCierre] = useState('')
    const [recordatorio, setRecordatorio] = useState('')
    const [materia, setMateria] = useState('')
    const [prioridad, setPrioridad] = useState('media')
    const { submitTarea, loading, error, success } = useCrearTarea();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validación del campo recordatorio
        if (recordatorio !== 'true' && recordatorio !== 'false') {
            alert('Por favor selecciona una opción de recordatorio.');
            return;
        }
        submitTarea({
            titulo,
            descripcion,
            fechaCierre,
            recordatorio: recordatorio === 'true',
            materia,
            prioridad
        }, () => {
            setTitulo('');
            setDescripcion('')
            setFechaCierre('')
            setRecordatorio('')
            setMateria('')
        })
    }
    return (
        <section className={style.container}>
            <button className={style.goback__button}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                    <path fill="#000000" d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z" />
                </svg>
                <Link to="/tareas" className={style.goback__link}>Volver a las tareas</Link>
            </button>

            <div className={style.tarea}>
                <h3 className={style.tarea__title}>Crear Tarea</h3>
                <form className={style.tarea__form} onSubmit={handleSubmit}>
                    <label htmlFor="titulo">Titulo de la tarea</label>
                    <input className={style.tarea__input} type="text" maxLength={40} name="titulo" id="titulo" value={titulo} onChange={(e) => {
                        const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]*$/; // Solo letras y espacios
                        if (regex.test(e.target.value) || e.target.value === "") {
                        setTitulo(e.target.value);
                        }
                        }}
                    required />

                    <label htmlFor="descripcion">Descripcion</label>
                    <textarea className={style.tarea__input__textarea} maxLength={300} name="descripcion" id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />

                    <label htmlFor="fecha-cierre">Fecha de cierre</label>
                    <input className={style.tarea__input} type="date" name="fecha-cierre" id="fecha-cierre" min={new Date().toISOString().split('T')[0]} value={fechaCierre} onChange={(e) => {
                            const selectedDate = new Date(e.target.value);
                            const today = new Date();
                            today.setHours(0, 0, 0, 0); // Quitar horas para comparar solo fecha

                            if (selectedDate > today) {
                            setFechaCierre(e.target.value);
                            } else {
                            alert('La fecha debe ser posterior a hoy.');
                            setFechaCierre(""); // Borra la fecha inválida
                            }
                        }} 
                    required />

                    <fieldset>
                        <legend>Activar recordatorios:</legend>
                        <div>
                            <input type="radio" id="activo" name="recordatorio" value='true' checked={recordatorio === 'true'} onChange={(e) => setRecordatorio(e.target.value)} />
                            <label htmlFor="activo">Sí</label>
                        </div>
                        <div>
                            <input type="radio" id="desactivado" name="recordatorio" value='false' checked={recordatorio === 'false'} onChange={(e) => setRecordatorio(e.target.value)} />
                            <label htmlFor="desactivado">No</label>
                        </div>
                    </fieldset>
                    <label htmlFor="prioridad">Prioridad de la tarea</label>
                    <select className={style.tarea__input} name="prioridad" id="prioridad" value={prioridad} onChange={(e) => setPrioridad(e.target.value)} required>
                        <option value="alta">Alta</option>
                        <option value="media">Media</option>
                        <option value="baja">Baja</option>
                    </select>
                    <label htmlFor="materia">Materia</label>
                    <input className={style.tarea__input} type="text" name="materia" id="materia" value={materia} onChange={(e) => setMateria(e.target.value)} required />

                    <input className={style.tarea__input_submit} type="submit" value={loading ? 'Creando...' : 'Crear'} disabled={loading} />

                    {success && <p className={style.success}>Tarea creada correctamente</p>}
                    {error && <p className={style.error}>{error}</p>}
                </form>
            </div>
        </section>
    )
}

export default CrearTarea