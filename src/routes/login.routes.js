import { Router } from "express";
import { validarsesion, getUsuario, getUsuarioxid, postUsuario, putUsuario, pathUsuario, deleteUsuario } from '../controladores/loginCtrl.js'

const router = Router()

//Armar nuestras rutas
router.post('/loginvalidate', validarsesion); //Iniciar Sesion
router.get('/login', getUsuario) //SELECT
router.get('/usuario/:id', getUsuarioxid) //SELECT x ID
router.post('/usuario', postUsuario) //INSERT
router.put('/usuario/:id', putUsuario) //UPDATE
router.patch('/usuario/:id', pathUsuario) //UPDATE
router.delete('/usuario/:id', deleteUsuario) //DELETE

export default router