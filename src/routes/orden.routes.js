import { Router } from "express";
import { getOrden, getOrdenxid, getOrdenesPendientes, postOrden, putOrden, deleteOrden } from '../controladores/ordenCtrl.js'

const router = Router()

//Armar nuestras rutas
router.get('/orden', getOrden) //SELECT
//router.get('/orden/pendientes', getEmpacadas)
router.get('/orden/:id', getOrdenxid) //SELECT x ID
router.get('/orden/pendientes', getOrdenesPendientes)  // Nuevo para libras pendientes por talla
router.post('/orden', postOrden) //INSERT
router.put('/orden/:id', putOrden) //UPDATE
//router.patch('/orden/:id', pathOrden) //UPDATE
router.delete('/orden/:id', deleteOrden) //DELETE

export default router