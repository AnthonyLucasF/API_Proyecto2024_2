import { Router } from "express";
import { getChofer, getChoferxid, postChofer, putChofer, pathChofer, deleteChofer } from '../controladores/choferCtrl.js'

const router = Router()

//Armar nuestras rutas
router.get('/chofer', getChofer) //SELECT
router.get('/chofer/:id', getChoferxid) //SELECT x ID
router.post('/chofer', postChofer) //INSERT
router.put('/chofer/:id', putChofer) //UPDATE
router.patch('/chofer/:id', pathChofer) //UPDATE
router.delete('/chofer/:id', deleteChofer) //DELETE

export default router