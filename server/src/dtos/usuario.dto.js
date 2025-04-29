import Joi from 'joi';

export const usuarioSchema = Joi.object({
  nombre: Joi.string()
    .trim()
    .max(50)
    .required()
    .messages({
      'string.empty': 'El nombre es obligatorio',
      'string.max': 'Debe tener menos de 50 caracteres'
    }),
  correo: Joi.string()
    .trim()
    .lowercase()
    .pattern(new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'))
    .required()
    .messages({
      'string.empty': 'El correo es obligatorio',
      'string.pattern.base': 'El correo no es válido'
    }),
  contrasena: Joi.string()
    .min(8)
    .required()
    .messages({
      'string.empty': 'La contraseña es obligatoria',
      'string.min': 'La contraseña debe tener mínimo 8 caracteres'
    }),
});
