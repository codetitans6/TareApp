import style from './Configuraciones.module.css'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import useEliminarCuenta from '../../hooks/useEliminarCuenta';
import ModalConfirmacion from '../../components/ModalConfirmacion/ModalConfirmacion';
import { toast, Bounce } from 'react-toastify';
import { useState } from 'react';

function Configuraciones() {
    const { usuario } = useAuth();
    const navigate = useNavigate();
    const { submitEliminarCuenta, loading, error } = useEliminarCuenta();
    const notify = () => toast.success("Cuenta eliminada correctamente", {
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
    const userId = localStorage.getItem('id');

    const [modalOpen, setModalOpen] = useState(false);

    const handleConfirmDelete = () => {
        submitEliminarCuenta(userId, () => {
            setModalOpen(false);
            notify()
            navigate('/')
        });
    };

    return (
        <>
            <article className={style.user_data_container}>
                <h4>Datos del usuario</h4>
                {loading && <p>Cargando...</p>}
                {error && <p className={style.error_message}>{error}</p>}
                <form className={style.user_data_form}>
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" name="nombre" id="nombre" readOnly value={usuario?.nombre} />
                    <label htmlFor="correo">Correo</label>
                    <input type="email" name="correo" id="correo" readOnly value={usuario?.correo} />
                </form>

                <h4>Eliminar cuenta</h4>
                <button className={style.delete_button} onClick={() => setModalOpen(true)}>Eliminar</button>
                <ModalConfirmacion
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                    mensaje="¿Estás segura de que quieres eliminar tu cuenta? Esta acción no se puede deshacer."
                />
            </article>


        </>
    );
}

export default Configuraciones;
