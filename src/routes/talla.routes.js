import { Router } from "express";
import { getTalla, getTallaxid } from '../controladores/tallaCtrl.js'

const router = Router()

//Armar nuestras rutas
router.get('/talla', getTalla) //SELECT
router.get('/talla/:id', getTallaxid) //SELECT x ID

export default router