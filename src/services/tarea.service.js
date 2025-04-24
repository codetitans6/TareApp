const Tarea = require('../models/tarea.model');

exports.crearTarea = async (data) => {
  const nuevaTarea = new Tarea(data);
  return await nuevaTarea.save();
};
