import { Router } from "express";
import { getMaquina, getMaquinaxid, postMaquina, putMaquina, pathMaquina, deleteMaquina } from '../controladores/maquinaCtrl.js'

const router = Router()

//Armar nuestras rutas
router.get('/maquina', getMaquina) //SELECT
router.get('/maquina/:id', getMaquinaxid) //SELECT x ID
router.post('/maquina', postMaquina) //INSERT
router.put('/maquina/:id', putMaquina) //UPDATE
router.patch('/maquina/:id', pathMaquina) //UPDATE
router.delete('/maquina/:id', deleteMaquina) //DELETE

export default router