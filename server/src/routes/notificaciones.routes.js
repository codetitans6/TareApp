import express, { Router } from 'express'
import notificacionController from '../controllers/notificacion.controller.js'
const router = express.Router();

router.get('/:usuarioId', notificacionController.obtenerNotificaciones);
router.patch('/:id/leida', notificacionController.marcarComoLeida);
export default router;
