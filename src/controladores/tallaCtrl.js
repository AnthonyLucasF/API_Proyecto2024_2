import { conmysql } from "../db.js";

// SELECT: Obtener todos los registros
export const getTalla =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM talla');
            res.json(result);
        } catch (error) {
            return res.status(500).json({ message: "Error al consultar Talla" });
        }
    };

// SELECT por ID
export const getTallaxid =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM talla WHERE id_talla = ?', [req.params.id]);
            if (result.length <= 0) {
                return res.status(404).json({
                    id_talla: 0,
                    message: "Talla no encontrada"
                });
            }
            res.json(result[0]);
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" });
        }
    };

// INSERT: Crear un nuevo registro
export const postTalla =
    async (req, res) => {
        try {
            const { descripcion_talla, estado } = req.body;

            const [rows] = await conmysql.query(
                'INSERT INTO talla (descripcion_talla, estado) VALUES (?, ?)',
                [descripcion_talla, estado]
            );

            res.json({
                id: rows.insertId,
                message: "Talla registrada con éxito"
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE: Actualizar un registro completo
export const putTalla =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { descripcion_talla, estado } = req.body;

            const [result] = await conmysql.query(
                'UPDATE talla SET descripcion_talla = ?, estado = ? WHERE id_talla = ?',
                [descripcion_talla, estado, id]
            );

            if (result.affectedRows <= 0) {
                return res.status(404).json({ message: "Talla no encontrada" });
            }

            const [rows] = await conmysql.query('SELECT * FROM talla WHERE id_talla = ?', [id]);
            res.json(rows[0]);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE parcial: Actualizar algunos campos
export const pathTalla =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { descripcion_talla, estado } = req.body;

            const [result] = await conmysql.query(
                `UPDATE talla 
             SET descripcion_talla = IFNULL(?, descripcion_talla), 
                 estado = IFNULL(?, estado) 
             WHERE id_talla = ?`,
                [descripcion_talla, estado, id]
            );

            if (result.affectedRows <= 0) {
                return res.status(404).json({ message: "Talla no encontrada" });
            }

            const [rows] = await conmysql.query('SELECT * FROM talla WHERE id_talla = ?', [id]);
            res.json(rows[0]);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// DELETE: Eliminar un registro
export const deleteTalla =
    async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await conmysql.query('DELETE FROM talla WHERE id_talla = ?', [id]);

            if (rows.affectedRows <= 0) {
                return res.status(404).json({
                    id: 0,
                    message: "Talla no encontrada"
                });
            }

            res.sendStatus(202); // Código HTTP 202 (Accepted)
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
