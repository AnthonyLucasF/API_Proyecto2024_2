import { Router } from "express";
import { getUsuario, getUsuarioxid, postUsuario, putUsuario, pathUsuario, deleteUsuario } from '../controladores/usuariosCtrl.js'

const router = Router()

//Armar nuestras rutas
router.get('/usuario', getUsuario) //SELECT
router.get('/usuario/:id', getUsuarioxid) //SELECT x ID
router.post('/usuario', postUsuario) //INSERT
router.put('/usuario/:id', putUsuario) //UPDATE
router.patch('/usuario/:id', pathUsuario) //UPDATE
router.delete('/usuario/:id', deleteUsuario) //DELETE

export default router