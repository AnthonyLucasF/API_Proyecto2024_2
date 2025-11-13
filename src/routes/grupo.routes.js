import { Router } from "express";
import { getGrupo, getGrupoxid, postGrupo, putGrupo, pathGrupo, deleteGrupo } from '../controladores/grupoCtrl.js'

const router = Router()

//Armar nuestras rutas
router.get('/grupo', getGrupo) //SELECT
router.get('/grupo/:id', getGrupoxid) //SELECT x ID
router.post('/grupo', postGrupo) //INSERT
router.put('/grupo/:id', putGrupo) //UPDATE
router.patch('/grupo/:id', pathGrupo) //UPDATE
router.delete('/grupo/:id', deleteGrupo) //DELETE

export default router