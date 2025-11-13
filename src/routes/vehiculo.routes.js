import { Router } from "express";
import { getVehiculo, getVehiculoxid, postVehiculo, putVehiculo, pathVehiculo, deleteVehiculo } from '../controladores/vehiculoCtrl.js'

const router = Router()

//Armar nuestras rutas
router.get('/vehiculo', getVehiculo) //SELECT
router.get('/vehiculo/:id', getVehiculoxid) //SELECT x ID
router.post('/vehiculo', postVehiculo) //INSERT
router.put('/vehiculo/:id', putVehiculo) //UPDATE
router.patch('/vehiculo/:id', pathVehiculo) //UPDATE
router.delete('/vehiculo/:id', deleteVehiculo) //DELETE

export default router