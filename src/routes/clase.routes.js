import { Router } from "express";
import { getClase, getClasexid } from '../controladores/claseCtrl.js'

const router = Router()

//Armar nuestras rutas
router.get('/clase', getClase) //SELECT
router.get('/clase/:id', getClasexid) //SELECT x ID

export default router