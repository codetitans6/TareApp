import Tarea from '../models/tarea.model.js';
import Usuario from '../models/usuario.model.js'
const crearTarea = async (data) => {
  const nuevaTarea = new Tarea(data);
  return await nuevaTarea.save();
};

const getUserTareas = async (userId) => {
  try {
    const tareas = await Tarea.find({
      $or: [
        { creador: userId },
        { usuarios: userId }
      ]
    });
    return tareas;
  } catch (error) {
    console.error('Error obteniendo tareas:', error);
    return [];
  }
};

const getTareaById = async (id) => {
  return Tarea.findById(id)
}

const updateTarea = async (id, data) => {
  const updatedTarea = await Tarea.findByIdAndUpdate(id, data, { new: true });
  return updatedTarea;
};


const getUserId = async (correo) => {
  const user = await Usuario.findOne({ correo });
  if (!user) {
    return { error: 'usuario no existe' };
  }
  return user._id
};

const getUsuariosInTarea = async (tareaId) => {
  const tarea = await Tarea.findById(tareaId).populate({
    path: 'usuarios',
    select: 'nombre correo'
  });
  return tarea?.usuarios || [];
}

const marcarComoCompletada = async (id) => {
  return await Tarea.findByIdAndUpdate(id, { completada: true }, { new: true });

};

export default {
  crearTarea,
  getUserTareas,
  getTareaById,
  updateTarea,
  getUserId,
  getUsuariosInTarea,
  marcarComoCompletada

};
