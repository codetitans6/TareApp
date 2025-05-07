import express, { Router } from 'express'
const router = express.Router();
import tareaController from '../controllers/tarea.controller.js'
import { tareaSchema } from '../dtos/tarea.dto.js'
import { validate } from '../middlewares/validate.middleware.js'

router.post('/', validate(tareaSchema), tareaController.crearTarea)
router.get('/', validate(tareaSchema), tareaController.getAllTareas)
router.get('/:id', validate(tareaSchema), tareaController.getTareaById)
router.put('/:id', validate(tareaSchema), tareaController.updateTarea)

router.patch('/:id/completar', tareaController.completarTarea);

export default router