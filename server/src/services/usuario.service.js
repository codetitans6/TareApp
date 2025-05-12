import Usuario from '../models/usuario.model.js'
import Tarea from '../models/tarea.model.js'
import { generateToken } from '../utils/jwt.js';
import bcrypt from 'bcryptjs';

const crearUsuario = async (usuarioData) => {
    const usuario = new Usuario(usuarioData)
    const guardarUsuario = await usuario.save()

    const token = generateToken({ id: usuario._id, nombre: usuario.nombre })

    return {
        token,
        usuario: { id: usuario._id, nombre: usuario.nombre, correo: usuario.correo }
    }
}

const inicioSesion = async (correo, contrasena) => {
    try {
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return { error: 'Usuario no existe' };
        }
        const verifyPassword = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!verifyPassword) {
            return { error: 'Contraseña errónea' };
        }

        const token = generateToken({ id: usuario._id, nombre: usuario.nombre });
        return {
            token,
            usuario: { id: usuario._id, nombre: usuario.nombre, correo: usuario.correo }
        };
    } catch (error) {
        return { error: 'Error en el inicio de sesión', detalles: error.message };
    }
};
const eliminarCuenta = async (userId) => {
    try {
        const usuario = await Usuario.findById(userId);
        if (!usuario) {
            return { error: 'Usuario no existe' };
        }
        await Usuario.findByIdAndDelete(userId);
        await Tarea.deleteMany({ creador: userId });
        await Tarea.updateMany(
            { usuarios: userId },
            { $pull: { usuarios: userId } }
        );
        return { message: 'Usuario y sus relaciones eliminadas correctamente' };
    } catch (error) {
        return {
            error: 'Error al eliminar la cuenta de usuario',
            detalles: error.message
        };
    }
};


export default {
    crearUsuario,
    inicioSesion,
    eliminarCuenta
}