import tareaService from '../services/tarea.service.js'

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
  const { id } = req.params
  const data = req.body
  try {
    const updatedTarea = await tareaService.updateTarea(id, data)
    res.status(200).json(updatedTarea)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al actualizar la tarea' })
  }
}
const addUsuariosTarea = async (req, res) => {
  const { tareaId, creadorId, usuarioId } = req.body;
  try {
    const result = await tareaService.addUsuariosTarea(tareaId, creadorId, usuarioId);
    if (result.error) {
      return res.status(400).json({ error: result.error.error });
    }
    return res.status(200).json(result)
  } catch (error) {
    console.error('Error en controller addUsuariosTarea:', error);
    res.status(500).json({ error: 'Error al asignar la tarea' });
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
const getUsuariosInTarea = async(req, res) => {
  const {tareaId} = req.params
  try {
    const usuarios = await tareaService.getUsuariosInTarea(tareaId)
    res.status(200).json(usuarios)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener usuarios de la tarea' })
  }
}
export default {
  crearTarea,
  getAllUserTareas,
  getTareaById,
  updateTarea,
  addUsuariosTarea,
  getUsuarioId,
  getUsuariosInTarea
}