import UsuarioService from '../services/usuario.service.js'


const registro = async (req, res) => {
    try {
        const resultado = await UsuarioService.crearUsuario(req.body)
        res.status(200).json({
            token: resultado.token,
            usuario: { id: resultado.usuario.id, nombre: resultado.usuario.nombre }
        })
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Error de validación', errors });
        }

        if (error.code === 11000) {
            return res.status(400).json({ message: 'Este correo ya está registrado' });
        }

        console.error('Error en el registro:', error);
        res.status(500).json({ message: 'Error interno del servidor al crear el usuario' });
    }
}
const inicioSesion = async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        const resultado = await UsuarioService.inicioSesion(correo, contrasena);
        if (resultado.error) {
            return res.status(400).json({ message: resultado.error });
        }
        res.status(200).json({
            token: resultado.token,
            usuario: { id: resultado.usuario.id, nombre: resultado.usuario.nombre }
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: `Error al iniciar sesión: ${error.message}` });

    }
};

export default {
    registro,
    inicioSesion
}