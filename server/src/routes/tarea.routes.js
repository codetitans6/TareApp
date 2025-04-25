import express from 'express'
const router = express.Router();
import tareaController from '../controllers/tarea.controller.js'
import { tareaSchema } from '../dtos/tarea.dto.js'
import { validate } from '../middlewares/validate.middleware.js'

router.post('/', validate(tareaSchema), tareaController.crearTarea);

export default router