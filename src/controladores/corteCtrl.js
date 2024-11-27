import { conmysql } from "../db.js";

// SELECT: Obtener todos los registros
export const getCorte =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM corte');
            res.json(result);
        } catch (error) {
            return res.status(500).json({ message: "Error al consultar Corte" });
        }
    };

// SELECT por ID
export const getCortexid =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM corte WHERE id_corte = ?', [req.params.id]);
            if (result.length <= 0) {
                return res.status(404).json({
                    id_corte: 0,
                    message: "Corte no encontrado"
                });
            }
            res.json(result[0]);
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" });
        }
    };

// INSERT: Crear un nuevo registro
export const postCorte =
    async (req, res) => {
        try {
            const { descripcion_corte, estado } = req.body;

            const [rows] = await conmysql.query(
                'INSERT INTO corte (descripcion_corte, estado) VALUES (?, ?)',
                [descripcion_corte, estado]
            );

            res.json({
                id: rows.insertId,
                message: "Corte registrado con éxito"
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE: Actualizar un registro completo
export const putCorte =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { descripcion_corte, estado } = req.body;

            const [result] = await conmysql.query(
                'UPDATE corte SET descripcion_corte=?, estado=? WHERE id_corte = ?',
                [descripcion_corte, estado, id]
            );

            if (result.affectedRows <= 0) {
                return res.status(404).json({ message: "Corte no encontrado" });
            }

            const [rows] = await conmysql.query('SELECT * FROM corte WHERE id_corte = ?', [id]);
            res.json(rows[0]);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE parcial: Actualizar algunos campos
export const pathCorte =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { descripcion_corte, estado } = req.body;

            const [result] = await conmysql.query(
                `UPDATE corte 
             SET descripcion_corte = IFNULL(?, descripcion_corte), 
                 estado = IFNULL(?, estado) 
             WHERE id_corte=?`,
                [descripcion_corte, estado, id]
            );

            if (result.affectedRows <= 0) {
                return res.status(404).json({ message: "Corte no encontrado" });
            }

            const [rows] = await conmysql.query('SELECT * FROM corte WHERE id_corte=?', [id]);
            res.json(rows[0]);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// DELETE: Eliminar un registro
export const deleteCorte =
    async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await conmysql.query('DELETE FROM corte WHERE id_corte=?', [id]);

            if (rows.affectedRows <= 0) {
                return res.status(404).json({
                    id: 0,
                    message: "Corte no encontrado"
                });
            }

            res.sendStatus(202); // Código HTTP 202 (Accepted)
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
