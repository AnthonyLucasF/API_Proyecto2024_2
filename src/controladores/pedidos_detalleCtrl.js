import { conmysql } from "../db.js"

export const getPedidos_detalle =
    async (req, res) => {
        try {
            const [result] = await conmysql.query(' select * from pedidos_detalle')
            res.json(result)
        } catch (error) {
            return res.status(500).json({ message: "Error al consultar pedidos" })
        }
    }

export const getPedidos_detallexid =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM pedidos_detalle WHERE det_id=?', [req.params.id])
            if (result.length <= 0) return res.status(404).json({
                cli_id: 0,
                message: "Pedido no encontrado"
            })
            res.json(result[0])
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" })
        }
    }

//Me di cuenta de que salía un error cuando Insertábamos un producto_detalle cuyo prod_id no existía

/* export const postPedidos_detalle =
    async (req, res) => {
        try {
            //console.log(req.body)
            const { prod_id, ped_id, det_cantidad, det_precio } = req.body
            //console.log(cli_nombre)
            const [rows] = await conmysql.query('INSERT INTO pedidos_detalle (prod_id, ped_id, det_cantidad, det_precio) VALUES(?,?,?,?)',
                [prod_id, ped_id, det_cantidad, det_precio])
            res.send({
                id: rows.insertId
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error del Servidor" })
        }
    }
 */

export const postPedidos_detalle =
    async (req, res) => {
        try {
            const { prod_id, ped_id, det_cantidad, det_precio } = req.body;

            // Verificar que el ped_id exista
            const [pedido] = await conmysql.query('SELECT * FROM pedidos WHERE ped_id = ?', [ped_id]);
            if (pedido.length === 0) {
                return res.status(400).json({ message: "El ped_id especificado no existe." });
            }

            // Verificar que el prod_id exista
            const [producto] = await conmysql.query('SELECT * FROM productos WHERE prod_id = ?', [prod_id]);
            if (producto.length === 0) {
                return res.status(400).json({ message: "El prod_id especificado no existe." });
            }

            const [rows] = await conmysql.query('INSERT INTO pedidos_detalle (prod_id, ped_id, det_cantidad, det_precio) VALUES(?,?,?,?)',
                [prod_id, ped_id, det_cantidad, det_precio]);
            res.send({ id: rows.insertId });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error del Servidor" });
        }
    };

//Me di cuenta de que salía un error cuando Actualizar un producto_detalle cuyo prod_id no existía

/* export const putPedidos_detalle =
    async (req, res) => {
        try {
            const { id } = req.params
            //console.log(req.body)
            const { prod_id, ped_id, det_cantidad, det_precio } = req.body
            //console.log(cli_nombre)
            const [result] = await conmysql.query('UPDATE pedidos_detalle SET prod_id=?, ped_id=?, det_cantidad=?, det_precio=? WHERE det_id=?',
                [prod_id, ped_id, det_cantidad, det_precio, id])
            if (result.affectedRows <= 0) return res.status(404).json({ message: "Pedido no encontrado" })

            const [rows] = await conmysql.query('SELECT * FROM pedidos_detalle WHERE det_id=?', [id])
            res.json(rows[0])
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error del Servidor" })
        }
    } */

export const putPedidos_detalle =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { prod_id, ped_id, det_cantidad, det_precio } = req.body;

            // Verificar que el ped_id exista
            const [pedido] = await conmysql.query('SELECT * FROM pedidos WHERE ped_id = ?', [ped_id]);
            if (pedido.length === 0) {
                return res.status(400).json({ message: "El ped_id especificado no existe." });
            }

            // Verificar que el prod_id exista
            const [producto] = await conmysql.query('SELECT * FROM productos WHERE prod_id = ?', [prod_id]);
            if (producto.length === 0) {
                return res.status(400).json({ message: "El prod_id especificado no existe." });
            }

            const [result] = await conmysql.query('UPDATE pedidos_detalle SET prod_id=?, ped_id=?, det_cantidad=?, det_precio=? WHERE det_id=?',
                [prod_id, ped_id, det_cantidad, det_precio, id]);
            if (result.affectedRows <= 0) return res.status(404).json({ message: "Pedido no encontrado" });

            const [rows] = await conmysql.query('SELECT * FROM pedidos_detalle WHERE det_id=?', [id]);
            res.json(rows[0]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error del Servidor" });
        }
    };

//Me di cuenta de que salía un error cuando Parchar un producto_detalle cuyo prod_id no existía

/* export const pathPedidos_detalle =
    async (req, res) => {
        try {
            const { id } = req.params
            //console.log(req.body)
            const { prod_id, ped_id, det_cantidad, det_precio } = req.body
            //console.log(cli_nombre)
            const [result] = await conmysql.query('UPDATE pedidos_detalle SET prod_id=IFNULL(?, prod_id), ped_id=IFNULL(?, ped_id), det_cantidad=IFNULL(?, det_cantidad), det_precio=IFNULL(?, det_precio) WHERE det_id=?',
                [prod_id, ped_id, det_cantidad, det_precio, id])
            if (result.affectedRows <= 0) return res.status(404).json({ message: "Pedido no encontrado" })

            const [rows] = await conmysql.query('SELECT * FROM pedidos_detalle WHERE det_id=?', [id])
            res.json(rows[0])
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error del Servidor" })
        }
    } */

export const pathPedidos_detalle =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { prod_id, ped_id, det_cantidad, det_precio } = req.body;

            // Verificar que el ped_id exista
            if (ped_id) {
                const [pedido] = await conmysql.query('SELECT * FROM pedidos WHERE ped_id = ?', [ped_id]);
                if (pedido.length === 0) {
                    return res.status(400).json({ message: "El ped_id especificado no existe." });
                }
            }

            // Verificar que el prod_id exista
            if (prod_id) {
                const [producto] = await conmysql.query('SELECT * FROM productos WHERE prod_id = ?', [prod_id]);
                if (producto.length === 0) {
                    return res.status(400).json({ message: "El prod_id especificado no existe." });
                }
            }

            const [result] = await conmysql.query('UPDATE pedidos_detalle SET prod_id=IFNULL(?, prod_id), ped_id=IFNULL(?, ped_id), det_cantidad=IFNULL(?, det_cantidad), det_precio=IFNULL(?, det_precio) WHERE det_id=?',
                [prod_id, ped_id, det_cantidad, det_precio, id]);
            if (result.affectedRows <= 0) return res.status(404).json({ message: "Pedido no encontrado" });

            const [rows] = await conmysql.query('SELECT * FROM pedidos_detalle WHERE det_id=?', [id]);
            res.json(rows[0]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error del Servidor" });
        }
    };


export const deletePedidos_detalle =
    async (req, res) => {
        try {
            const [rows] = await conmysql.query('DELETE FROM pedidos_detalle WHERE det_id=?', [req.params.id])
            if (rows.affectedRows <= 0) return res.status(404).json({
                id: 0,
                message: "No se pudo eliminar al Pedido"
            })
            res.sendStatus(202)
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" })
        }
    }
