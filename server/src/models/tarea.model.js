
import mongoose from 'mongoose'

const tareaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  prioridad: {
    type: String,
    enum: ['alta', 'media', 'baja'],
    default: 'media',
    required: true
  },
  recordatorio: {
    type: Boolean,
    default: true,
    required: true
  },
  fechaCierre: {
    type: Date,
    required: true
  },
  materia: {
    type: String,
    required: true
  },
  completada: {
    type: Boolean,
    default: false
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  usuarios: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: false
  }]
}, { timestamps: true });

const tarea = mongoose.model('Tarea', tareaSchema, 'tarea');
export default tarea
