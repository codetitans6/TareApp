import style from './Registro.module.css'
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './schema.js';
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import useRegistroUsuario from '../../hooks/useRegistroUsuario'
function Registro() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const { submitUsuarioNuevo, loading, error, success } = useRegistroUsuario();

    const onSubmit = (data) => {
        const { confirmarContrasena, ...usuarioData } = data;
        submitUsuarioNuevo(usuarioData, () => reset());
    };

    return (
        <>
            <div className={style.registro_container}>
                <button className={style.goback__button}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24"><path fill="currentColor" d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z"/></svg>
                    <Link to="/" className={style.goback__link}>Volver a la home</Link>
                </button>
                <h3>Registro</h3>
                {success && <p className={style.success}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 512 512"><path fill="currentColor" fillRule="evenodd" d="M256 42.667C138.18 42.667 42.667 138.18 42.667 256S138.18 469.334 256 469.334S469.334 373.82 469.334 256S373.821 42.667 256 42.667m0 384c-94.105 0-170.666-76.561-170.666-170.667S161.894 85.334 256 85.334S426.667 161.894 426.667 256S350.106 426.667 256 426.667m80.336-246.886l30.167 30.167l-131.836 132.388l-79.083-79.083l30.166-30.167l48.917 48.917z" /></svg>
                    Usuario creado correctamente
                </p>}
                {error && <p className={style.error_form}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24"><path fill="currentColor" d="M11.001 10h2v5h-2zM11 16h2v2h-2z" /><path fill="currentColor" d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.99 1.99 0 0 0 .054 1.968A1.98 1.98 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.99 1.99 0 0 0 .054-1.968zM4.661 19L12 5.137L19.344 19z" /></svg>
                    {error}
                </p>}
                <form className={style.registro_form} onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="nombre">Nombre</label>
                    <input className={style.registro_input} type="text" name="nombre" id="nombre" autoComplete='name'   {...register('nombre')} />
                    {errors.nombre && <p className={style.error}>{errors.nombre.message}</p>}

                    <label htmlFor="correo">Correo electronico</label>
                    <input className={style.registro_input} type="email" name="correo" id="correo" autoComplete='email'   {...register('correo')} />
                    {errors.correo && <p className={style.error}>{errors.correo.message}</p>}

                    <label htmlFor="contrasena">Contraseña</label>
                    <input className={style.registro_input} type="password" name="contrasena" id="contrasena" autoComplete='new-password'  {...register('contrasena')} />
                    {errors.contrasena && <p className={style.error}>{errors.contrasena.message}</p>}

                    <label htmlFor="confirmar-contrasena">Confirmar contraseña</label>
                    <input className={style.registro_input} type="password" name="confirmar-contrasena" id="confirmar-contrasena" autoComplete='new-password'  {...register('confirmarContrasena')} />
                    {errors.confirmarContrasena && <p className={style.error}>{errors.confirmarContrasena.message}</p>}

                    <input className={style.registro_input_submit} type="submit" value={loading ? 'Creando...' : 'Registrate'} disabled={loading} />
                </form>
            </div>
        </>
    )
}
export default Registro