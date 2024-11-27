import { Router } from "express";
import { getMateriaPrima, getMateriaPrimaxid, postMateriaPrima, putMateriaPrima, pathMateriaPrima, deleteMateriaPrima } from '../controladores/materiaprimaCtrl.js'

const router = Router()

//Armar nuestras rutas
router.get('/materiaprima', getMateriaPrima) //SELECT
router.get('/materiaprima/:id', getMateriaPrimaxid) //SELECT x ID
router.post('/materiaprima', postMateriaPrima) //INSERT
router.put('/materiaprima/:id', putMateriaPrima) //UPDATE
router.patch('/materiaprima/:id', pathMateriaPrima) //UPDATE
router.delete('/materiaprima/:id', deleteMateriaPrima) //DELETE

export default router