import Joi from 'joi'

export const tareaSchema = Joi.object({
  titulo: Joi.string().required(),
  descripcion: Joi.string().required(),
  prioridad: Joi.string().valid('alta', 'media', 'baja').default('media').required(),
  recordatorio: Joi.boolean().truthy('true').falsy('false').required(),
  fechaCierre: Joi.date().iso().required(),
  materia: Joi.string().required()
});

