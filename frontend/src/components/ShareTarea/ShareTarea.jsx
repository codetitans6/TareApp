import style from './ShareTarea.module.css';
import useUsuarioId from '../../hooks/useUsuarioId';
import useAsignarUsuarios from '../../hooks/useAsignarTarea';
import useUsuariosInTarea from '../../hooks/useUsuariosInTarea';
import { useState } from 'react';

function ShareTarea({ isOpen, onClose, tareaId }) {
  const { email, setEmail, submitUsuarioEmail, loading: loadingUsuario, error: userError } = useUsuarioId();
  const { asignar, loading, error: asignarError, data } = useAsignarUsuarios();
  const { usuarios, loading: loadingUsuarios, error: errorUsuarios } = useUsuariosInTarea(tareaId);

  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    const userIdResult = await submitUsuarioEmail();

    if (userIdResult?.error) {
      console.log('Error al obtener usuario:', userIdResult.error);
      return;
    }

    const creadorId = localStorage.getItem('id');
    if (!userIdResult || !creadorId) return;

    const asignacionResult = await asignar(tareaId, creadorId, userIdResult);

    if (asignacionResult?.error) {
      console.log('Error al asignar:', asignacionResult.error);
      return;
    }

    setSuccessMessage('Tarea compartida correctamente.');
    setEmail('');
  };

  if (!isOpen) return null;

  return (
    <article className={style.modal_overlay} onClick={onClose}>
      <div className={style.modal_content} onClick={(e) => e.stopPropagation()}>
        <button className={style.close_button} onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24">
            <path fill="#059669" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z" />
          </svg>
        </button>

        <h3 className={style.share_title}>Compartir tarea</h3>

        <form className={style.share_form} onSubmit={onSubmit}>
          <input
            className={style.share_form_input}
            type="email"
            name="email"
            id="email"
            placeholder="ejemplo@gmail.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input className={style.share_form_input_btn} type="submit" value="Compartir" disabled={loading || loadingUsuario} />
        </form>

        {userError && <p className={style.error}>{userError}</p>}
        {asignarError && <p className={style.error}>{asignarError}</p>}
        {errorUsuarios && <p className={style.error}>{errorUsuarios}</p>}
        {(loading || loadingUsuario) && <p>Cargando...</p>}
        {successMessage && <p className={style.success}>{successMessage}</p>}
        {data?.message && <p className={style.success}>{data.message}</p>}

        <h4 className={style.share_subtitle}>Personas con las que compartiste esta tarea</h4>
        <ul className={style.share_list}>
          {usuarios.map((usuario) => (
            <li className={style.share_list_item} key={usuario._id}>
              <p>{usuario.nombre}</p>
              <p>{usuario.correo}</p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default ShareTarea;

