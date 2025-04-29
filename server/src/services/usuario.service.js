import Usuario from '../models/usuario.model.js'
import { generateToken } from '../utils/jwt.js';

const crearUsuario = async (usuarioData) => {
    const usuario = new Usuario(usuarioData)
    const guardarUsuario = await usuario.save()

    const token = generateToken({ idUsuario: usuario._id, nombreUsuario: usuario.nombre })

    return {
        token,
        usuario: { idUsuario: usuario._id, nombreUsuario: usuario._id, emailUsuario: usuario.email }
    }
}

export default {
    crearUsuario
}