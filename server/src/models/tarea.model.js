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
    required:true
  },
  materia: {
    type: String,
    required: true
  },
  completada: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const tareas = mongoose.model('Tarea', tareaSchema, 'tarea');
export default tareas