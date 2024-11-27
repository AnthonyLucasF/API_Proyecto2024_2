import { Router } from "express";
import { getProveedor, getProveedorxid, postProveedor, putProveedor, pathProveedor, deleteProveedor } from '../controladores/proveedorCtrl.js'

const router = Router()

//Armar nuestras rutas
router.get('/proveedor', getProveedor) //SELECT
router.get('/proveedor/:id', getProveedorxid) //SELECT x ID
router.post('/proveedor', postProveedor) //INSERT
router.put('/proveedor/:id', putProveedor) //UPDATE
router.patch('/proveedor/:id', pathProveedor) //UPDATE
router.delete('/proveedor/:id', deleteProveedor) //DELETE

export default router