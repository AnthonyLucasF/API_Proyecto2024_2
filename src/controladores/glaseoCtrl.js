import { conmysql } from "../db.js";

// SELECT: Obtener todos los registros
export const getGlaseo =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM glaseo');
            res.json(result);
        } catch (error) {
            return res.status(500).json({ message: "Error al consultar Glaseos" });
        }
    };

// SELECT por ID
export const getGlaseoxid =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM glaseo WHERE glaseo_id = ?', [req.params.id]);
            if (result.length <= 0) {
                return res.status(404).json({
                    glaseo_id: 0,
                    message: "Glaseo no encontrado"
                });
            }
            res.json(result[0]);
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" });
        }
    };

// INSERT: Crear un nuevo registro
export const postGlaseo =
    async (req, res) => {
        try {
            const { glaseo_cantidad } = req.body;

            const [rows] = await conmysql.query(
                'INSERT INTO glaseo (glaseo_cantidad) VALUES (?)',
                [glaseo_cantidad]
            );

            res.json({
                id: rows.insertId,
                message: "Glaseo registrado con éxito"
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE: Actualizar un registro completo
export const putGlaseo =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { glaseo_cantidad } = req.body;

            const [result] = await conmysql.query(
                'UPDATE glaseo SET glaseo_cantidad = ? WHERE glaseo_id = ?',
                [glaseo_cantidad, id]
            );

            if (result.affectedRows <= 0) {
                return res.status(404).json({ message: "Glaseo no encontrado" });
            }

            const [rows] = await conmysql.query('SELECT * FROM glaseo WHERE glaseo_id = ?', [id]);
            res.json(rows[0]);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE parcial: Actualizar algunos campos
export const pathGlaseo =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { glaseo_cantidad } = req.body;

            const [result] = await conmysql.query(
                `UPDATE glaseo 
             SET glaseo_cantidad = IFNULL(?, glaseo_cantidad)
             WHERE glaseo_id = ?`,
                [glaseo_cantidad, id]
            );

            if (result.affectedRows <= 0) {
                return res.status(404).json({ message: "Glaseo no encontrado" });
            }

            const [rows] = await conmysql.query('SELECT * FROM glaseo WHERE glaseo_id = ?', [id]);
            res.json(rows[0]);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// DELETE: Eliminar un registro
export const deleteGlaseo =
    async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await conmysql.query('DELETE FROM glaseo WHERE glaseo_id = ?', [id]);

            if (rows.affectedRows <= 0) {
                return res.status(404).json({
                    glaseo_id: 0,
                    message: "Glaseo no encontrado"
                });
            }

            res.sendStatus(202); // Código HTTP 202 (Accepted)
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
