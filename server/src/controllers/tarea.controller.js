import tareaService from '../services/tarea.service.js'

const crearTarea = async (req, res) => {
  try {
    const tarea = await tareaService.crearTarea(req.body);
    res.status(201).json(tarea);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear tarea' });
  }
};

export default {
  crearTarea
}