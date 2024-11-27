import { Router } from "express";
import { getTalla, getTallaxid, postTalla, putTalla, pathTalla, deleteTalla } from '../controladores/tallaCtrl.js'

const router = Router()

//Armar nuestras rutas
router.get('/talla', getTalla) //SELECT
router.get('/talla/:id', getTallaxid) //SELECT x ID
router.post('/talla', postTalla) //INSERT
router.put('/talla/:id', putTalla) //UPDATE
router.patch('/talla/:id', pathTalla) //UPDATE
router.delete('/talla/:id', deleteTalla) //DELETE

export default router