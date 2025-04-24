const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  prioridad: { type: String, enum: ['alta', 'media', 'baja'], default: 'media' },
  completada: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Tarea', tareaSchema);
