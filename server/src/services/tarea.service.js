import Tarea from '../models/tarea.model.js';

const crearTarea = async (data) => {
  const nuevaTarea = new Tarea(data);
  return await nuevaTarea.save();
};

const getAllTareas = async () => {
  const tareas = Tarea.find()
  return await tareas
}
export default {
  crearTarea,
  getAllTareas
};
