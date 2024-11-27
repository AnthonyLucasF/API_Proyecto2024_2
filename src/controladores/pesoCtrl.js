import { conmysql } from "../db.js";

// SELECT: Obtener todos los registros
export const getPeso =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM peso');
            res.json(result);
        } catch (error) {
            return res.status(500).json({ message: "Error al consultar Peso" });
        }
    };

// SELECT por ID
export const getPesoxid =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM peso WHERE id_peso = ?', [req.params.id]);
            if (result.length <= 0) {
                return res.status(404).json({
                    id_peso: 0,
                    message: "Peso no encontrado"
                });
            }
            res.json(result[0]);
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" });
        }
    };

// INSERT: Crear un nuevo registro
export const postPeso =
    async (req, res) => {
        try {
            const { descripcion_peso, estado } = req.body;

            const [rows] = await conmysql.query(
                'INSERT INTO peso (descripcion_peso, estado) VALUES (?, ?)',
                [descripcion_peso, estado]
            );

            res.json({
                id: rows.insertId,
                message: "Peso registrado con éxito"
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE: Actualizar un registro completo
export const putPeso =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { descripcion_peso, estado } = req.body;

            const [result] = await conmysql.query(
                'UPDATE peso SET descripcion_peso = ?, estado = ? WHERE id_peso = ?',
                [descripcion_peso, estado, id]
            );

            if (result.affectedRows <= 0) {
                return res.status(404).json({ message: "Peso no encontrado" });
            }

            const [rows] = await conmysql.query('SELECT * FROM peso WHERE id_peso = ?', [id]);
            res.json(rows[0]);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE parcial: Actualizar algunos campos
export const pathPeso =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { descripcion_peso, estado } = req.body;

            const [result] = await conmysql.query(
                `UPDATE peso 
             SET descripcion_peso = IFNULL(?, descripcion_peso), 
                 estado = IFNULL(?, estado) 
             WHERE id_peso = ?`,
                [descripcion_peso, estado, id]
            );

            if (result.affectedRows <= 0) {
                return res.status(404).json({ message: "Peso no encontrado" });
            }

            const [rows] = await conmysql.query('SELECT * FROM peso WHERE id_peso = ?', [id]);
            res.json(rows[0]);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// DELETE: Eliminar un registro
export const deletePeso =
    async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await conmysql.query('DELETE FROM peso WHERE id_peso = ?', [id]);

            if (rows.affectedRows <= 0) {
                return res.status(404).json({
                    id: 0,
                    message: "Peso no encontrado"
                });
            }

            res.sendStatus(202); // Código HTTP 202 (Accepted)
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
