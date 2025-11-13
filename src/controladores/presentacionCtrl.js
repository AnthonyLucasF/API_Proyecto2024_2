import { conmysql } from "../db.js";

// SELECT: Obtener todos los registros
export const getPresentacion =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM presentacion');
            res.json(result);
        } catch (error) {
            return res.status(500).json({ message: "Error al consultar Presentaciones" });
        }
    };

// SELECT por ID
export const getPresentacionxid =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM presentacion WHERE presentacion_id = ?', [req.params.id]);
            if (result.length <= 0) {
                return res.status(404).json({
                    presentacion_id: 0,
                    message: "Presentación no encontrada"
                });
            }
            res.json(result[0]);
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" });
        }
    };

// INSERT: Crear un nuevo registro
export const postPresentacion =
    async (req, res) => {
        try {
            const { presentacion_descripcion } = req.body;

            const [rows] = await conmysql.query(
                'INSERT INTO presentacion (presentacion_descripcion) VALUES (?)',
                [presentacion_descripcion]
            );

            res.json({
                id: rows.insertId,
                message: "Presentación registrada con éxito"
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE: Actualizar un registro completo
export const putPresentacion =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { presentacion_descripcion } = req.body;

            const [result] = await conmysql.query(
                'UPDATE presentacion SET presentacion_descripcion = ? WHERE presentacion_id = ?',
                [presentacion_descripcion, id]
            );

            if (result.affectedRows <= 0) {
                return res.status(404).json({ message: "Presentación no encontrada" });
            }

            const [rows] = await conmysql.query('SELECT * FROM presentacion WHERE presentacion_id = ?', [id]);
            res.json(rows[0]);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE parcial: Actualizar algunos campos
export const pathPresentacion =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { presentacion_descripcion } = req.body;

            const [result] = await conmysql.query(
                `UPDATE presentacion 
             SET presentacion_descripcion = IFNULL(?, presentacion_descripcion)
             WHERE presentacion_id = ?`,
                [presentacion_descripcion, id]
            );

            if (result.affectedRows <= 0) {
                return res.status(404).json({ message: "Presentación no encontrada" });
            }

            const [rows] = await conmysql.query('SELECT * FROM presentacion WHERE presentacion_id = ?', [id]);
            res.json(rows[0]);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// DELETE: Eliminar un registro
export const deletePresentacion =
    async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await conmysql.query('DELETE FROM presentacion WHERE presentacion_id = ?', [id]);

            if (rows.affectedRows <= 0) {
                return res.status(404).json({
                    presentacion_id: 0,
                    message: "Presentación no encontrada"
                });
            }

            res.status(202).json({ message: "Presentación eliminada con éxito" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
