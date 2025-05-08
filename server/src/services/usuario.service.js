import Usuario from '../models/usuario.model.js'
import { generateToken } from '../utils/jwt.js';

const crearUsuario = async (usuarioData) => {
    const usuario = new Usuario(usuarioData)
    const guardarUsuario = await usuario.save()

    const token = generateToken({ id: usuario._id, nombre: usuario.nombre })

    return {
        token,
        usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email }
    }
}

export default {
    crearUsuario
}