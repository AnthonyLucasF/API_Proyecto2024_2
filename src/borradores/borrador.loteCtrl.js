import { conmysql } from "../db.js";

// SELECT: Obtener todos los registros
export const getLote =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM lote');
            res.json(result);
        } catch (error) {
            return res.status(500).json({ message: "Error al consultar Lote (Materia Prima)" });
        }
    };

// SELECT por ID
export const getLotexid =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM lote WHERE lote_id=?', [req.params.id]);
            if (result.length <= 0) return res.status(404).json({ 
                lote_id: 0,
                message: "Lote (Materia Prima) no encontrado" 
            });
            res.json(result[0]);
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" });
        }
    };

// INSERT: Crear un nuevo registro
export const postLote =
    async (req, res) => {
        try {
            const { tipo_id, vehiculo_id, chofer_id, lote_codigo, lote_fecha_ingreso, lote_hora_ingreso, proveedor_id, lote_libras_remitidas, lote_peso_promedio,
                    lote_n_piscina, lote_n_bines, lote_n_gavetas_conicas, lote_n_gavetas_caladas, lote_n_sacos_hielo, lote_n_sacos_metasulfito, lote_n_sacos_sal,
                    lote_observaciones, usuario_id } = req.body;

            const [rows] = await conmysql.query(
                `INSERT INTO lote 
                    (tipo_id, vehiculo_id, chofer_id, lote_codigo, lote_fecha_ingreso, lote_hora_ingreso, proveedor_id, lote_libras_remitidas, lote_peso_promedio,
                    lote_n_piscina, lote_n_bines, lote_n_gavetas_conicas, lote_n_gavetas_caladas, lote_n_sacos_hielo, lote_n_sacos_metasulfito, lote_n_sacos_sal,
                    lote_observaciones, usuario_id) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [tipo_id, vehiculo_id, chofer_id, lote_codigo, lote_fecha_ingreso, lote_hora_ingreso, proveedor_id, lote_libras_remitidas, lote_peso_promedio,
                    lote_n_piscina, lote_n_bines, lote_n_gavetas_conicas, lote_n_gavetas_caladas, lote_n_sacos_hielo, lote_n_sacos_metasulfito, lote_n_sacos_sal,
                    lote_observaciones, usuario_id]
            );

            res.json({
                id: rows.insertId,
                message: "Lote (Materia Prima) registrado con éxito"
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE: Actualizar un registro completo
export const putLote =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { tipo_id, vehiculo_id, chofer_id, lote_codigo, lote_fecha_ingreso, lote_hora_ingreso, proveedor_id, lote_libras_remitidas, lote_peso_promedio,
                    lote_n_piscina, lote_n_bines, lote_n_gavetas_conicas, lote_n_gavetas_caladas, lote_n_sacos_hielo, lote_n_sacos_metasulfito, lote_n_sacos_sal,
                    lote_observaciones, usuario_id } = req.body;

            const [result] = await conmysql.query(
                `UPDATE materiaprima SET 
                    tipo_id=?, vehiculo_id=?, chofer_id=?, lote_codigo=?, lote_fecha_ingreso=?, lote_hora_ingreso=?, proveedor_id=?, lote_libras_remitidas=?, lote_peso_promedio=?, lote_n_piscina=?, lote_n_bines=?, lote_n_gavetas_conicas=?, lote_n_gavetas_caladas=?, lote_n_sacos_hielo=?, lote_n_sacos_metasulfito=?, lote_n_sacos_sal=?, lote_observaciones=?, usuario_id=?
                WHERE lote_id = ?`,
                [tipo_id, vehiculo_id, chofer_id, lote_codigo, lote_fecha_ingreso, lote_hora_ingreso, proveedor_id, lote_libras_remitidas, lote_peso_promedio,
                    lote_n_piscina, lote_n_bines, lote_n_gavetas_conicas, lote_n_gavetas_caladas, lote_n_sacos_hielo, lote_n_sacos_metasulfito, lote_n_sacos_sal,
                    lote_observaciones, usuario_id, id]
            );

            if (result.affectedRows <= 0) return res.status(404).json({ message: "Lote (Materia Prima) no encontrado" });

            const [rows] = await conmysql.query('SELECT * FROM lote WHERE lote_id=?', [id])
            res.json(rows[0])

            //res.json({ message: "Materia Prima actualizada con éxito" });
            res.json({
                success: true,
                message: "Lote (Materia Prima) registrado con éxito",
                data: { id: rows.insertId }
              });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE parcial: Actualizar algunos campos
export const pathLote =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { tipo_id, vehiculo_id, chofer_id, lote_codigo, lote_fecha_ingreso, lote_hora_ingreso, proveedor_id, lote_libras_remitidas, lote_peso_promedio,
                    lote_n_piscina, lote_n_bines, lote_n_gavetas_conicas, lote_n_gavetas_caladas, lote_n_sacos_hielo, lote_n_sacos_metasulfito, lote_n_sacos_sal,
                    lote_observaciones, usuario_id } = req.body;

            const [result] = await conmysql.query(
                `UPDATE materiaprima 
                    SET tipo_id = IFNULL(?, tipo_id), vehiculo_id = IFNULL(?, vehiculo_id), chofer_id = IFNULL(?, chofer_id), lote_codigo = IFNULL(?, lote_codigo), lote_fecha_ingreso = IFNULL(?, lote_fecha_ingreso), lote_hora_ingreso=?, proveedor_id=?, lote_libras_remitidas=?, lote_peso_promedio=?, lote_n_piscina=?, lote_n_bines=?, lote_n_gavetas_conicas=?, lote_n_gavetas_caladas=?, lote_n_sacos_hielo=?, lote_n_sacos_metasulfito=?, lote_n_sacos_sal=?, lote_observaciones=?, usuario_id=?
                WHERE lote_id=?`,
                [tipo_id, vehiculo_id, chofer_id, lote_codigo, lote_fecha_ingreso, lote_hora_ingreso, proveedor_id, lote_libras_remitidas, lote_peso_promedio,
                    lote_n_piscina, lote_n_bines, lote_n_gavetas_conicas, lote_n_gavetas_caladas, lote_n_sacos_hielo, lote_n_sacos_metasulfito, lote_n_sacos_sal,
                    lote_observaciones, usuario_id, id]
            );

            if (result.affectedRows <= 0) return res.status(404).json({ message: "Lote (Materia Prima) no encontrado" });

            const [rows] = await conmysql.query('SELECT * FROM lote WHERE lote_id=?', [id])
            res.json(rows[0])

            res.json({ message: "Lote (Materia Prima) actualizada parcialmente" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// DELETE: Eliminar un registro
export const deleteLote =
    async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await conmysql.query('DELETE FROM lote WHERE lote_id=?', [id]);

            if (rows.affectedRows <= 0) return res.status(404).json({ 
                id: 0,
                message: "Lote (Materia Prima) no encontrado" 
            });

            res.sendStatus(202); // Código HTTP 202 (Accepted)
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
