import mongoose from 'mongoose';

const notificacionSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  mensaje: {
    type: String,
    required: true
  },
  leida: {
    type: Boolean,
    default: false
  },
  tarea: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tarea',
    required: false
  }
}, { timestamps: true });

const Notificacion = mongoose.model('Notificacion', notificacionSchema, 'notificacion');
export default Notificacion;
