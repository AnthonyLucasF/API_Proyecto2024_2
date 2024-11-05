import { conmysql } from "../db.js"

export const getProductos =
    async (req, res) => {
        try {
            const [result] = await conmysql.query(' SELECT * FROM productos')
            res.json(result)
        } catch (error) {
            return res.status(500).json({ message: "Error al consultar productos" })
        }
    }

export const getProductosxid =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM productos WHERE prod_id=?', [req.params.id])
            if (result.length <= 0) return res.status(404).json({
                cli_id: 0,
                message: "Producto no encontrado"
            })
            res.json(result[0])
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" })
        }
    }

export const postProductos =
    async (req, res) => {
        try {
            //console.log(req.body)
            const { prod_codigo, prod_nombre, prod_precio, prod_stock, prod_activo, prod_imagen } = req.body
            //console.log(cli_nombre)
            const [rows] = await conmysql.query('INSERT INTO productos (prod_codigo, prod_nombre, prod_precio, prod_stock, prod_activo, prod_imagen) VALUES(?,?,?,?,?,?)',
                [prod_codigo, prod_nombre, prod_precio, prod_stock, prod_activo, prod_imagen])
            res.send({
                id: rows.insertId
            })
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" })
        }
    }

export const putProductos =
    async (req, res) => {
        try {
            const {id}= req.params
            //console.log(req.body)
            const { prod_codigo, prod_nombre, prod_precio, prod_stock, prod_activo, prod_imagen }=req.body
            console.log(prod_nombre)
            const[result]= await conmysql.query('UPDATE productos SET prod_codigo=?, prod_nombre=?, prod_precio=?, prod_stock=?, prod_activo=?, prod_imagen=? WHERE prod_id=?', 
                                            [prod_codigo, prod_nombre, prod_precio, prod_stock, prod_activo, prod_imagen, id])
            if(result.affectedRows<=0) return res.status(404).json({message: "Producto no encontrado"})

            const[rows]= await conmysql.query('SELECT * FROM productos WHERE prod_id=?', [id])
            res.json(rows[0])
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" })
        }
    }

export const pathProductos =
    async (req, res) => {
        try {
            const {id}= req.params
            //console.log(req.body)
            const { prod_codigo, prod_nombre, prod_precio, prod_stock, prod_activo, prod_imagen }=req.body
            console.log(prod_nombre)
            const[result]= await conmysql.query('UPDATE productos SET prod_codigo=IFNULL(?, prod_codigo), prod_nombre=IFNULL(?, prod_nombre), prod_precio=IFNULL(?, prod_precio), prod_stock=IFNULL(?, prod_stock), prod_activo=IFNULL(?, prod_activo), prod_imagen=IFNULL(?, prod_imagen) WHERE prod_id=?', 
                                            [prod_codigo, prod_nombre, prod_precio, prod_stock, prod_activo, prod_imagen, id])
            if(result.affectedRows<=0) return res.status(404).json({message: "Producto no encontrado"})

            const[rows]= await conmysql.query('SELECT * FROM productos WHERE prod_id=?', [id])
            res.json(rows[0])
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" })
        }
    }

export const deleteProductos =
    async (req, res) => {
        try {
            const[rows]= await conmysql.query('DELETE FROM productos WHERE prod_id=?', [req.params.id])
            if(rows.affectedRows<=0) return res.status(404).json({
                id:0,
                message: "No se pudo eliminar al producto"
            })
            res.sendStatus(202)
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" })
        }
    }
