import Notificacion from '../models/notificacion.model.js';

const obtenerNotificaciones = async (req, res) => {
  const { usuarioId } = req.params
  const notificaciones = await Notificacion.find({ usuario: usuarioId })
    .sort({ createdAt: -1 })
    .limit(10)
  res.json(notificaciones);
};
const marcarComoLeida = async (req, res) => {
  const { id } = req.params;
  try {
    const notificacion = await Notificacion.findByIdAndUpdate(
      id,
      { leida: true },
      { new: true }
    );

    if (!notificacion) {
      return res.status(404).json({ error: 'Notificación no encontrada' });
    }

    res.json(notificacion);
  } catch (error) {
    console.error('Error al marcar notificación como leída:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default {
  obtenerNotificaciones,
  marcarComoLeida
}