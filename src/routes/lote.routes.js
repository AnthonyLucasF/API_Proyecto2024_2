import { Router } from "express";
import { getLote, getLotexid, postLote, putLote, pathLote, deleteLote } from '../controladores/loteCtrl.js'

const router = Router()

//Armar nuestras rutas
router.get('/lote', getLote) //SELECT
router.get('/lote/:id', getLotexid) //SELECT x ID
router.post('/lote', postLote) //INSERT
router.put('/lote/:id', putLote) //UPDATE
router.patch('/lote/:id', pathLote) //UPDATE
router.delete('/lote/:id', deleteLote) //DELETE

export default router