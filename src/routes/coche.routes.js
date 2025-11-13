import { Router } from "express";
import { getCoche, getCochexid, postCoche, putCoche, pathCoche, deleteCoche } from '../controladores/cocheCtrl.js'

const router = Router()

//Armar nuestras rutas
router.get('/coche', getCoche) //SELECT
router.get('/coche/:id', getCochexid) //SELECT x ID
router.post('/coche', postCoche) //INSERT
router.put('/coche/:id', putCoche) //UPDATE
router.patch('/coche/:id', pathCoche) //UPDATE
router.delete('/coche/:id', deleteCoche) //DELETE

export default router