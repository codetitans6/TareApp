import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'], 
        trim: true,
        maxlength: [50, 'Debe tener menos de 50 caracteres']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'El correo no es valido']
    },
    contrasena: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [8, 'La contraseña debe tener minimo 8 caracteres']
    }
})

usuarioSchema.pre('save', async function (next) {
    if (!this.isModified('contrasena')) return next();
    this.contrasena = await bcrypt.hash(this.contrasena, 10);
    next();
});

const usuario = mongoose.model('Usuario', usuarioSchema, 'usuarios')
export default usuario