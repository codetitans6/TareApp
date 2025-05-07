import express, { Router } from 'express'
const router = express.Router();
import tareaController from '../controllers/tarea.controller.js'
import { tareaSchema } from '../dtos/tarea.dto.js'
import { validate } from '../middlewares/validate.middleware.js'

router.post('/', validate(tareaSchema), tareaController.crearTarea);
router.get('/tareas/:id', tareaController.getAllUserTareas);
router.get('/:id', tareaController.getTareaById); 
router.put('/:id', validate(tareaSchema), tareaController.updateTarea);
router.put('/asignar', tareaController.addUsuariosTarea);
router.get('/usuario/:correo', tareaController.getUsuarioId); 
router.get('/usuarios/:tareaId', tareaController.getUsuariosInTarea)
export default router