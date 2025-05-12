import style from './ModalConfig.module.css'

const ModalConfirmacion = ({ isOpen, onClose, onConfirm, mensaje }) => {
  if (!isOpen) return null;

  return (
    <div className={style.modal_backdrop}>
      <div className={style.modal_content}>
        <h2>¿Estás seguro?</h2>
        <p>{mensaje || 'Esta acción no se puede deshacer.'}</p>
        <div className={style.modal_buttons}>
          <button onClick={onClose} className={style.btn_cancelar}>Cancelar</button>
          <button onClick={onConfirm} className={style.btn_confirmar}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacion;