const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tarea.controller');
const { tareaSchema } = require('../dtos/tarea.dto');
const { validate } = require('../middlewares/validate.middleware');

router.post('/', validate(tareaSchema), tareaController.crearTarea);

module.exports = router;
