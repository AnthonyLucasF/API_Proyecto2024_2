import { Router } from "express";
import {getClientes, getClientesxid, postCliente, putClientes, pathClientes, deleteCliente} from '../controladores/clientesCtrl.js'

const router=Router()

//Armar nuestras rutas
router.get('/clientes', getClientes) //SELECT
router.get('/clientes/:id', getClientesxid) //SELECT x ID
router.post('/clientes', postCliente) //INSERT
router.put('/clientes/:id', putClientes) //UPDATE
router.patch('/clientes/:id', pathClientes) //UPDATE
router.delete('/clientes/:id', deleteCliente) //DELETE

export default router