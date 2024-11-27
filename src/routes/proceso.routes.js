import { Router } from "express";
import { getProceso, getProcesoxid, postProceso, putProceso, pathProceso, deleteProceso } from '../controladores/procesoCtrl.js'

const router = Router()

//Armar nuestras rutas
router.get('/proceso', getProceso) //SELECT
router.get('/proceso/:id', getProcesoxid) //SELECT x ID
router.post('/proceso', postProceso) //INSERT
router.put('/proceso/:id', putProceso) //UPDATE
router.patch('/proceso/:id', pathProceso) //UPDATE
router.delete('/proceso/:id', deleteProceso) //DELETE

export default router