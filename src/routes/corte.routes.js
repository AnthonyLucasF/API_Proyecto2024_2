import { Router } from "express";
import { getCorte, getCortexid } from '../controladores/corteCtrl.js'

const router = Router()

//Armar nuestras rutas
router.get('/corte', getCorte) //SELECT
router.get('/corte/:id', getCortexid) //SELECT x ID

export default router