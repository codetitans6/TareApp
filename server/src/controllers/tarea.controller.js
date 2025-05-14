import tareaService from '../services/tarea.service.js'
import Tarea from '../models/tarea.model.js';
import Notificacion from '../models/notificacion.model.js';
import Usuario from '../models/usuario.model.js'
const crearTarea = async (req, res) => {
  try {
    const tarea = await tareaService.crearTarea(req.body);
    res.status(201).json(tarea);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al crear tarea' });
  }
};
const getAllUserTareas = async (req, res) => {
  const { id } = req.params
  try {
    const tareas = await tareaService.getUserTareas(id)
    res.status(200).json(tareas)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
}
const getTareaById = async (req, res) => {
  const { id } = req.params;
  try {
    const tarea = await tareaService.getTareaById(id);
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.status(200).json(tarea);
  } catch (error) {
    console.error('Error en getTareaById:', error);
    res.status(500).json({ error: 'Error al obtener la tarea por el ID' });
  }
};



const updateTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const nuevaData = req.body;

    const tareaActual = await Tarea.findById(id);
    if (!tareaActual) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    const anteriores = new Set(tareaActual.usuarios.map(u => u.toString()));
    const nuevos = (nuevaData.usuarios || []).filter(u => !anteriores.has(u));
    const creador = await Usuario.findById(tareaActual.creador).select("nombre");
    const tareaActualizada = await tareaService.updateTarea(id, nuevaData);

    if (nuevos.length > 0) {
      const notificaciones = nuevos.map(userId => ({
        usuario: userId,
        mensaje: `${creador.nombre} te ha asignado la tarea: ${tareaActualizada.titulo}`,
        tarea: tareaActualizada._id,
      }));
      await Notificacion.insertMany(notificaciones);
    }

    res.status(200).json(tareaActualizada);
  } catch (error) {
    console.error('Error en updateTarea:', error);
    res.status(500).json({ error: 'Error al actualizar la tarea' });
  }
};


const getUsuarioId = async (req, res) => {
  const { correo } = req.params
  try {
    const id = await tareaService.getUserId(correo)
    res.status(200).json(id)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener id de usuario' })
  }
}
const getUsuariosInTarea = async (req, res) => {
  const { tareaId } = req.params
  try {
    const usuarios = await tareaService.getUsuariosInTarea(tareaId)
    res.status(200).json(usuarios)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener usuarios de la tarea' })
  }
}

const completarTarea = async (req, res) => {
  const { id } = req.params;
  try {
    const tareaCompletada = await tareaService.marcarComoCompletada(id);
    if (!tareaCompletada) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.status(200).json(tareaCompletada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al marcar la tarea como completada' });
  }
};

export default {
  crearTarea,
  getAllUserTareas,
  getTareaById,
  updateTarea,
  getUsuarioId,
  getUsuariosInTarea,
  completarTarea
}