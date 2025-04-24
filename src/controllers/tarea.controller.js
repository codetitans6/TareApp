const tareaService = require('../services/tarea.service');

exports.crearTarea = async (req, res) => {
  try {
    const tarea = await tareaService.crearTarea(req.body);
    res.status(201).json(tarea);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear tarea' });
  }
};
