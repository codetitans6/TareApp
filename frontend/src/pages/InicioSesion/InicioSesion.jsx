import { useState } from 'react';
import style from './InicioSesion.module.css';
import { useNavigate, Link } from 'react-router-dom';
import useInicioSesion from '../../hooks/useInicioSesion';
import { ToastContainer, toast, Bounce } from 'react-toastify';

function InicioSesion() {
    const navigate = useNavigate();
    const { submitInicioSesion, loading, error } = useInicioSesion();
    const notify = () => toast.success("Inicio de sesion correcto", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    })
    const [form, setForm] = useState({ correo: '', contrasena: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitInicioSesion(form, () => {
            notify()
            setTimeout(() => {
                navigate('/tareas');
            }, 1500);
        });
    };

    return (
        <>
            <div className={style.inicio_container}>
                <button className={style.goback__button}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24">
                        <path fill="currentColor" d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z" />
                    </svg>
                    <Link to="/" className={style.goback__link}>Volver a la home</Link>
                </button>
                <h3>Inicio sesión</h3>

                <form className={style.inicio_form} onSubmit={handleSubmit}>
                    {loading && <p>Cargando...</p>}
                    {error && <p className={style.error_message}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17q.425 0 .713-.288T13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
                        {error}
                    </p>}
                    <label htmlFor="correo">Correo electronico</label>
                    <input className={style.inicio_input} type="email" name="correo" id="correo" placeholder='example@gmail.com' autoComplete='email' value={form.correo} onChange={handleChange} />

                    <label htmlFor="contrasena">Contraseña</label>
                    <input className={style.inicio_input} type="password" name="contrasena" id="contrasena" placeholder='Ingresa tu contraseña' autoComplete='current-password' value={form.contrasena} onChange={handleChange} />

                    <input className={style.inicio_input_submit} type="submit" value="Iniciar sesión" disabled={loading} />
                </form>
            </div>
        </>
    );
}

export default InicioSesion;
