import { Router } from "express";
import { getMasterizado, getMasterizadoxid, postMasterizado, putMasterizado, pathMasterizado, deleteMasterizado } from '../controladores/masterizadoCtrl.js'

const router = Router()

//Armar nuestras rutas
router.get('/masterizado', getMasterizado) //SELECT
router.get('/masterizado/:id', getMasterizadoxid) //SELECT x ID
router.post('/masterizado', postMasterizado) //INSERT
router.put('/masterizado/:id', putMasterizado) //UPDATE
router.patch('/masterizado/:id', pathMasterizado) //UPDATE
router.delete('/masterizado/:id', deleteMasterizado) //DELETE

export default router