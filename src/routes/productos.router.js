import { Router } from "express";
import {getProductos, getProductosxid, postProductos, putProductos, pathProductos, deleteProductos} from '../controladores/productosCtrl.js'

const router=Router()

//Armar nuestras rutas
router.get('/productos', getProductos) //SELECT
router.get('/productos/:id', getProductosxid) //SELECT x ID
router.post('/productos', postProductos) //INSERT
router.put('/productos/:id', putProductos) //UPDATE
router.patch('/productos/:id', pathProductos) //UPDATE
router.delete('/productos/:id', deleteProductos) //DELETE

export default router