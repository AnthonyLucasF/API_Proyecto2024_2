import { Router } from "express";
import {getPedidos_detalle, getPedidos_detallexid, postPedidos_detalle, putPedidos_detalle, pathPedidos_detalle, deletePedidos_detalle} from '../controladores/pedidos_detalleCtrl.js'

const router=Router()

//Armar nuestras rutas
router.get('/pedidos_detalle', getPedidos_detalle) //SELECT
router.get('/pedidos_detalle/:id', getPedidos_detallexid) //SELECT x ID
router.post('/pedidos_detalle', postPedidos_detalle) //INSERT
router.put('/pedidos_detalle/:id', putPedidos_detalle) //UPDATE
router.patch('/pedidos_detalle/:id', pathPedidos_detalle) //UPDATE
router.delete('/pedidos_detalle/:id', deletePedidos_detalle) //DELETE

export default router