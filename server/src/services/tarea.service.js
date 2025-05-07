import Tarea from '../models/tarea.model.js';
import Usuario from '../models/usuario.model.js'
const crearTarea = async (data) => {
  const nuevaTarea = new Tarea(data);
  return await nuevaTarea.save();
};

const getUserTareas = async (userId) => {
  return await Tarea.find({ creador: userId })
}
const getTareaById = async (id) => {
  return Tarea.findById(id)
}

const updateTarea = async (id, data) => {
  const updatedTarea = await Tarea.findByIdAndUpdate(id, data, { new: true });
  return updatedTarea;
};


const addUsuariosTarea = async (tareaId, creadorId, usuarioId) => {
  try {
    const tarea = await Tarea.findById(tareaId);
    if (!tarea) {
      return { error: 'Tarea no encontrada' };
    }
    if (usuarioId.toString() === creadorId.toString()) {
      return { error: 'El creador no puede asignarse a sí mismo a la tarea' };
    }
    if (tarea.creador.toString() !== creadorId.toString()) {
      return { error: 'No tienes permisos para esta acción' };
    }
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return { error: 'Usuario no encontrado' };
    }
    const usuariosActualizados = new Set(tarea.usuarios.map(id => id.toString()));
    if (usuariosActualizados.has(usuarioId.toString())) {
      return { error: 'El usuario ya está asignado a esta tarea' };
    }
    usuariosActualizados.add(usuarioId.toString());

    const tareaFinal = await Tarea.findByIdAndUpdate(
      tareaId,
      { usuarios: Array.from(usuariosActualizados) },
      { new: true, runValidators: true }
    );
    return { success: true, tarea: tareaFinal };
  } catch (error) {
    console.error('Error en addUsuariosTarea:', error);
    return { error: 'Error interno del servidor', detalle: error.message };
  }
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
};

export default {
  crearTarea,
  getUserTareas,
  getTareaById,
  updateTarea,
  addUsuariosTarea,
  getUserId,
  getUsuariosInTarea
};
