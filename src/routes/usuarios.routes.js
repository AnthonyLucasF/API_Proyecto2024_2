import express from 'express';
import { getUsuarios, getUsuariosxid, postUsuarios, putUsuarios } from '../controladores/usuariosCtrl.js';
import { loginUsuarios } from '../controladores/loginUsuarios.js'; // Asegúrate de tener esta importación
import { verifyToken } from '../controladores/authMiddleware.js';

const router = express.Router();

// Ruta de login
router.post('/login', loginUsuarios); // Ruta de login

// Rutas protegidas
router.get('/usuarios', verifyToken, getUsuarios); //SELECT
router.get('/usuarios/:id', verifyToken, getUsuariosxid); //SELECT x ID
router.post('/usuarios', postUsuarios); //INSERT
router.put('/usuarios/:id', verifyToken, putUsuarios); //UPDATE

export default router;
