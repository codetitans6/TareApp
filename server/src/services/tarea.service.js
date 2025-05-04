import Tarea from '../models/tarea.model.js';

const crearTarea = async (data) => {
  const nuevaTarea = new Tarea(data);
  return await nuevaTarea.save();
};

const getAllTareas = async () => {
  return await Tarea.find()
}
const getTareaById = async (id) => {
  return Tarea.findById(id)
}

const updateTarea = async (id, data) => {
  const updatedTarea = await Tarea.findByIdAndUpdate(id, data, { new: true });
  return updatedTarea;
};

export default {
  crearTarea,
  getAllTareas,
  getTareaById,
  updateTarea
};
