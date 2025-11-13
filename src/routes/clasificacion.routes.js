import { Router } from "express";
import { getClasificacion, getClasificacionxid, postClasificacion, putClasificacion, pathClasificacion, deleteClasificacion } from '../controladores/clasificacionCtrl.js'

const router = Router()

//Armar nuestras rutas
router.get('/clasificacion', getClasificacion) //SELECT
router.get('/clasificacion/:id', getClasificacionxid) //SELECT x ID
router.post('/clasificacion', postClasificacion) //INSERT
router.put('/clasificacion/:id', putClasificacion) //UPDATE
router.patch('/clasificacion/:id', pathClasificacion) //UPDATE
router.delete('/clasificacion/:id', deleteClasificacion) //DELETE

router.get('/clasificacion/libras/:lote_id');

export default router