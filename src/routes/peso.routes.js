import { Router } from "express";
import { getPeso, getPesoxid, postPeso, putPeso, pathPeso, deletePeso } from '../controladores/pesoCtrl.js'

const router = Router()

//Armar nuestras rutas
router.get('/peso', getPeso) //SELECT
router.get('/peso/:id', getPesoxid) //SELECT x ID
router.post('/peso', postPeso) //INSERT
router.put('/peso/:id', putPeso) //UPDATE
router.patch('/peso/:id', pathPeso) //UPDATE
router.delete('/peso/:id', deletePeso) //DELETE

export default router