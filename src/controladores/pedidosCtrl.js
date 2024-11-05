import { conmysql } from "../db.js"

export const getPedidos =
    async (req, res) => {
        try {
            const [result] = await conmysql.query(' select * from pedidos')
            res.json(result)
        } catch (error) {
            return res.status(500).json({ message: "Error al consultar pedidos" })
        }
    }

export const getPedidosxid =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM pedidos WHERE ped_id=?', [req.params.id])
            if (result.length <= 0) return res.status(404).json({
                cli_id: 0,
                message: "Pedido no encontrado"
            })
            res.json(result[0])
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" })
        }
    }

export const postPedidos =
    async (req, res) => {
        try {
            //console.log(req.body)
            const { usr_id, cli_id, ped_fecha, ped_estado } = req.body
            //console.log(cli_nombre)
            const [rows] = await conmysql.query('INSERT INTO pedidos (usr_id, cli_id, ped_fecha, ped_estado) VALUES(?,?,?,?)',
                [usr_id, cli_id, ped_fecha, ped_estado])
            res.send({
                id: rows.insertId
            })
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" })
        }
    }

export const putPedidos =
    async (req, res) => {
        try {
            const { id } = req.params
            //console.log(req.body)
            const { usr_id, cli_id, ped_fecha, ped_estado } = req.body
            //console.log(cli_nombre)
            const [result] = await conmysql.query('UPDATE pedidos SET usr_id=?, cli_id=?, ped_fecha=?, ped_estado=? WHERE ped_id=?',
                [usr_id, cli_id, ped_fecha, ped_estado, id])
            if (result.affectedRows <= 0) return res.status(404).json({ message: "Pedido no encontrado" })

            const [rows] = await conmysql.query('SELECT * FROM pedidos WHERE ped_id=?', [id])
            res.json(rows[0])
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" })
        }
    }

export const pathPedidos =
    async (req, res) => {
        try {
            const { id } = req.params
            //console.log(req.body)
            const { usr_id, cli_id, ped_fecha, ped_estado } = req.body
            //console.log(cli_nombre)
            const [result] = await conmysql.query('UPDATE pedidos SET usr_id=IFNULL(?, usr_id), cli_id=IFNULL(?, cli_id), ped_fecha=IFNULL(?, ped_fecha), ped_estado=IFNULL(?, ped_estado) WHERE ped_id=?',
                [usr_id, cli_id, ped_fecha, ped_estado, id])
            if (result.affectedRows <= 0) return res.status(404).json({ message: "Pedido no encontrado" })

            const [rows] = await conmysql.query('SELECT * FROM pedidos WHERE ped_id=?', [id])
            res.json(rows[0])
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" })
        }
    }

export const deletePedidos =
    async (req, res) => {
        try {
            const [rows] = await conmysql.query('DELETE FROM pedidos WHERE ped_id=?', [req.params.id])
            if (rows.affectedRows <= 0) return res.status(404).json({
                id: 0,
                message: "No se pudo eliminar al Pedido"
            })
            res.sendStatus(202)
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" })
        }
    }



    //Iba a implementar esto, pero no sé si era necesario

/* export const postPedidos = async (req, res) => {
    try {
        const { usr_id, cli_id, ped_fecha, ped_estado } = req.body;

        // Obtener todos los cli_id existentes (si es necesario)
        const [clientes] = await conmysql.query('SELECT cli_id FROM clientes');
        const validCliIds = clientes.map(c => c.cli_id);

        // Verificar que el cli_id exista
        if (!validCliIds.includes(cli_id)) {
            return res.status(400).json({ message: "El cli_id especificado no existe." });
        }

        const [rows] = await conmysql.query('INSERT INTO pedidos (usr_id, cli_id, ped_fecha, ped_estado) VALUES(?,?,?,?)',
            [usr_id, cli_id, ped_fecha, ped_estado]);
        res.send({ id: rows.insertId });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error del Servidor" });
    }
}; */
