import { Router } from "express";
import { getGlaseo, getGlaseoxid, postGlaseo, putGlaseo, pathGlaseo, deleteGlaseo } from '../controladores/glaseoCtrl.js'

const router = Router()

//Armar nuestras rutas
router.get('/glaseo', getGlaseo) //SELECT
router.get('/glaseo/:id', getGlaseoxid) //SELECT x ID
router.post('/glaseo', postGlaseo) //INSERT
router.put('/glaseo/:id', putGlaseo) //UPDATE
router.patch('/glaseo/:id', pathGlaseo) //UPDATE
router.delete('/glaseo/:id', deleteGlaseo) //DELETE

export default router