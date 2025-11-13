import { Router } from "express";
import { getIngresoTunel, getIngresoTunelxid, postIngresoTunel, putIngresoTunel, pathIngresoTunel, deleteIngresoTunel, getRendimientoLote } from '../controladores/ingresotunelCtrl.js'

const router = Router()

//Armar nuestras rutas
router.get('/ingresotunel', getIngresoTunel) //SELECT
router.get('/ingresotunel/:id', getIngresoTunelxid) //SELECT x ID
router.post('/ingresotunel', postIngresoTunel) //INSERT
router.put('/ingresotunel/:id', putIngresoTunel) //UPDATE
router.patch('/ingresotunel/:id', pathIngresoTunel) //UPDATE
router.delete('/ingresotunel/:id', deleteIngresoTunel) //DELETE

router.get('/ingresotunel/:id', getRendimientoLote) //

export default router