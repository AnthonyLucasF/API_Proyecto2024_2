import { Router } from "express";
import { getPresentacion, getPresentacionxid, postPresentacion, putPresentacion, pathPresentacion, deletePresentacion } from '../controladores/presentacionCtrl.js'

const router = Router()

//Armar nuestras rutas
router.get('/presentacion', getPresentacion) //SELECT
router.get('/presentacion/:id', getPresentacionxid) //SELECT x ID
router.post('/presentacion', postPresentacion) //INSERT
router.put('/presentacion/:id', putPresentacion) //UPDATE
router.patch('/presentacion/:id', pathPresentacion) //UPDATE
router.delete('/presentacion/:id', deletePresentacion) //DELETE

export default router