import { Router } from "express";
import { getTipo } from '../controladores/tipoCtrl.js'

const router = Router()

//Armar nuestras rutas
router.get('/tipo', getTipo) //SELECT

export default router