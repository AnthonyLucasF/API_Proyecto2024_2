import { Router } from "express";
import {getPedidos, getPedidosxid, postPedidos, putPedidos, pathPedidos, deletePedidos} from '../controladores/pedidosCtrl.js'

const router=Router()

//Armar nuestras rutas
router.get('/pedidos', getPedidos) //SELECT
router.get('/pedidos/:id', getPedidosxid) //SELECT x ID
router.post('/pedidos', postPedidos) //INSERT
router.put('/pedidos/:id', putPedidos) //UPDATE
router.patch('/pedidos/:id', pathPedidos) //UPDATE
router.delete('/pedidos/:id', deletePedidos) //DELETE

export default router