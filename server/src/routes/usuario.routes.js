import express from 'express'
const router = express.Router();
import usuarioController from '../controllers/usuario.controller.js';
import {usuarioSchema} from '../dtos/usuario.dto.js'
import { validate } from '../middlewares/validate.middleware.js'


router.post('/', validate(usuarioSchema), usuarioController.registro)

export default router