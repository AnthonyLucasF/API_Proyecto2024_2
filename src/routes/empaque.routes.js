import { Router } from "express";
import { getEmpaque, getEmpaquexid, postEmpaque, putEmpaque, pathEmpaque, deleteEmpaque } from '../controladores/empaqueCtrl.js'

const router = Router()

//Armar nuestras rutas
router.get('/empaque', getEmpaque) //SELECT
router.get('/empaque/:id', getEmpaquexid) //SELECT x ID
router.post('/empaque', postEmpaque) //INSERT
router.put('/empaque/:id', putEmpaque) //UPDATE
router.patch('/empaque/:id', pathEmpaque) //UPDATE
router.delete('/empaque/:id', deleteEmpaque) //DELETE

export default router