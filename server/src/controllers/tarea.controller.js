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
const getAllTareas = async (req, res) => {
  try {
    const tareas = await tareaService.getAllTareas()
    res.status(200).json(tareas)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
}
export default {
  crearTarea,
  getAllTareas
}