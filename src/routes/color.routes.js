import { Router } from "express";
import { getColor, getColorxid } from '../controladores/colorCtrl.js'

const router = Router()

//Armar nuestras rutas
router.get('/color', getColor) //SELECT
router.get('/color/:id', getColorxid) //SELECT x ID

export default router