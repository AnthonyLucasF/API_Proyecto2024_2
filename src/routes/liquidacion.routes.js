import { Router } from "express";
import { getLiquidacion, getLiquidacionxid, postLiquidacion, putLiquidacion, pathLiquidacion, deleteLiquidacion } from '../controladores/liquidacionCtrl.js'

const router = Router()

//Armar nuestras rutas
router.get('/liquidacion', getLiquidacion) //SELECT // Revisar ?tipo=entero or cola
router.get('/liquidacion/:id', getLiquidacionxid) //SELECT x ID
router.post('/liquidacion', postLiquidacion) //INSERT
router.put('/liquidacion/:id', putLiquidacion) //UPDATE
router.patch('/liquidacion/:id', pathLiquidacion) //UPDATE
router.delete('/liquidacion/:id', deleteLiquidacion) //DELETE

export default router