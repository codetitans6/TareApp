const Joi = require('joi');

exports.tareaSchema = Joi.object({
  titulo: Joi.string().required(),
  prioridad: Joi.string().valid('alta', 'media', 'baja').default('media')
});
