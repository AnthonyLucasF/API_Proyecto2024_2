import { Router } from "express";
import { getCorte, getCortexid, postCorte, putCorte, pathCorte, deleteCorte } from '../controladores/corteCtrl.js'

const router = Router()

//Armar nuestras rutas
router.get('/corte', getCorte) //SELECT
router.get('/corte/:id', getCortexid) //SELECT x ID
router.post('/corte', postCorte) //INSERT
router.put('/corte/:id', putCorte) //UPDATE
router.patch('/corte/:id', pathCorte) //UPDATE
router.delete('/corte/:id', deleteCorte) //DELETE

export default router