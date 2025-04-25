import Tarea from '../models/tarea.model.js';

const crearTarea = async (data) => {
  const nuevaTarea = new Tarea(data);
  return await nuevaTarea.save();
};

export default {
  crearTarea
};
