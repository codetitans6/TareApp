import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import style from './EditarTarea.module.css';
import { updateTarea } from '../../services/tareaService';
import useEditarTarea from '../../hooks/useEditarTarea';

function EditarTarea() {
    const navigate = useNavigate();
    const id = localStorage.getItem('id')
    const { tarea, loading, error: fetchError } = useEditarTarea();
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaCierre, setFechaCierre] = useState('');
    const [recordatorio, setRecordatorio] = useState('false');
    const [prioridad, setPrioridad] = useState('media');
    const [materia, setMateria] = useState('');

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (tarea && tarea._id) {
            setTitulo(tarea.titulo || '');
            setDescripcion(tarea.descripcion || '');
            setFechaCierre(tarea.fechaCierre?.split('T')[0] || '');
            setRecordatorio(String(tarea.recordatorio));
            setPrioridad(tarea.prioridad || 'media');
            setMateria(tarea.materia || '');
        }
    }, [tarea]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        const updatedTarea = {
            titulo,
            descripcion,
            fechaCierre,
            recordatorio: recordatorio === 'true',
            prioridad,
            materia,
            creador: id
        };

        try {
            await updateTarea(tarea._id, updatedTarea);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                navigate('/tareas');
            }, 2000);
        } catch (err) {
            setError('Error al actualizar la tarea');
            setTimeout(() => setError(''), 3000);
        }
    };

    if (loading) return <p>Cargando tarea...</p>;
    if (fetchError) return <p>{fetchError}</p>;

    return (
        <section className={style.container}>
            <button className={style.goback__button}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                    <path fill="#000000" d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z" />
                </svg>
                <Link to="/tareas" className={style.goback__link}>Volver a las tareas</Link>
            </button>

            <div className={style.tarea}>
                <h3 className={style.tarea__title}>Editar Tarea</h3>
                {success && (
                    <p className={style.success}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 512 512">
                            <path fill="currentColor" fillRule="evenodd" d="M256 42.667C138.18 42.667 42.667 138.18 42.667 256S138.18 469.334 256 469.334S469.334 373.82 469.334 256S373.821 42.667 256 42.667m0 384c-94.105 0-170.666-76.561-170.666-170.667S161.894 85.334 256 85.334S426.667 161.894 426.667 256S350.106 426.667 256 426.667m80.336-246.886l30.167 30.167l-131.836 132.388l-79.083-79.083l30.166-30.167l48.917 48.917z" />
                        </svg>
                        Tarea actualizada correctamente
                    </p>
                )}
                {error && (
                    <p className={style.error_form}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M11.001 10h2v5h-2zM11 16h2v2h-2z" />
                            <path fill="currentColor" d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.99 1.99 0 0 0 .054 1.968A1.98 1.98 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.99 1.99 0 0 0 .054-1.968zM4.661 19L12 5.137L19.344 19z" />
                        </svg>
                        {error}
                    </p>
                )}
                <form className={style.tarea__form} onSubmit={handleSubmit}>
                    
                    <label htmlFor="titulo">Titulo de la tarea</label>
                    <input
                        className={style.tarea__input}
                        type="text"
                        maxLength={40}
                        name="titulo"
                        id="titulo"
                        value={titulo}
                        onChange={(e) => {
                            const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]*$/;
                            if (regex.test(e.target.value) || e.target.value === "") {
                                setTitulo(e.target.value);
                            }
                        }}
                        required
                    />

                    <label htmlFor="descripcion">Descripcion</label>
                    <textarea
                        className={style.tarea__input__textarea}
                        maxLength={300}
                        name="descripcion"
                        id="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />

                    <label htmlFor="fecha-cierre">Fecha de cierre</label>
                    <input
                        className={style.tarea__input}
                        type="date"
                        name="fecha-cierre"
                        id="fecha-cierre"
                        min={new Date().toISOString().split('T')[0]}
                        value={fechaCierre}
                        onChange={(e) => {
                            const selectedDate = new Date(e.target.value);
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            if (selectedDate > today) {
                                setFechaCierre(e.target.value);
                            } else {
                                alert('La fecha debe ser posterior a hoy.');
                                setFechaCierre('');
                            }
                        }}
                        required
                    />

                    <fieldset>
                        <legend>Activar recordatorios:</legend>
                        <div>
                            <input
                                type="radio"
                                id="activo"
                                name="recordatorio"
                                value="true"
                                checked={recordatorio === 'true'}
                                onChange={(e) => setRecordatorio(e.target.value)}
                            />
                            <label htmlFor="activo">Sí</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="desactivado"
                                name="recordatorio"
                                value="false"
                                checked={recordatorio === 'false'}
                                onChange={(e) => setRecordatorio(e.target.value)}
                            />
                            <label htmlFor="desactivado">No</label>
                        </div>
                    </fieldset>

                    <label htmlFor="prioridad">Prioridad</label>
                    <select
                        className={style.tarea__input}
                        name="prioridad"
                        id="prioridad"
                        value={prioridad}
                        onChange={(e) => setPrioridad(e.target.value)}
                        required
                    >
                        <option value="alta">Alta</option>
                        <option value="media">Media</option>
                        <option value="baja">Baja</option>
                    </select>

                    <label htmlFor="materia">Materia</label>
                    <input
                        className={style.tarea__input}
                        type="text"
                        name="materia"
                        id="materia"
                        value={materia}
                        onChange={(e) => setMateria(e.target.value)}
                        required
                    />

                    <input
                        className={style.tarea__input_submit}
                        type="submit"
                        value={loading ? 'Actualizando...' : 'Actualizar'}
                        disabled={loading}
                    />
                </form>
            </div>
        </section>
    );
}

export default EditarTarea;
