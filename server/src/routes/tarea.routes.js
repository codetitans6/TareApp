import express from 'express'
const router = express.Router();
import tareaController from '../controllers/tarea.controller.js'
import { tareaSchema } from '../dtos/tarea.dto.js'
import { validate } from '../middlewares/validate.middleware.js'
import tarea from '../models/tarea.model.js';

router.post('/', validate(tareaSchema), tareaController.crearTarea)
router.get('/', validate(tareaSchema), tareaController.getAllTareas)

export default router