import { Router } from "express";
import { getDefectos, getDefectosxid, postDefectos, putDefectos, pathDefectos, deleteDefectos } from '../controladores/defectosCtrl.js'

const router = Router()

//Armar nuestras rutas
router.get('/defectos', getDefectos) //SELECT
router.get('/defectos/:id', getDefectosxid) //SELECT x ID
router.post('/defectos', postDefectos) //INSERT
router.put('/defectos/:id', putDefectos) //UPDATE
router.patch('/defectos/:id', pathDefectos) //UPDATE
router.delete('/defectos/:id', deleteDefectos) //DELETE

export default router