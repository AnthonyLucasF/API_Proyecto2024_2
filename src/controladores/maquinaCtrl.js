import { conmysql } from "../db.js";

// SELECT: Obtener todos los registros
export const getMaquina =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM maquina');
            res.json(result);
        } catch (error) {
            return res.status(500).json({ message: "Error al consultar máquinas" });
        }
    };

// SELECT por ID
export const getMaquinaxid =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM maquina WHERE id_maquina = ?', [req.params.id]);
            if (result.length <= 0) {
                return res.status(404).json({
                    id_maquina: 0,
                    message: "Máquina no encontrada"
                });
            }
            res.json(result[0]);
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" });
        }
    };

// INSERT: Crear un nuevo registro
export const postMaquina =
    async (req, res) => {
        try {
            const { descripcion, nombre_maquina } = req.body;

            const [rows] = await conmysql.query(
                'INSERT INTO maquina (descripcion, nombre_maquina) VALUES (?, ?)',
                [descripcion, nombre_maquina]
            );

            res.json({
                id: rows.insertId,
                message: "Máquina registrada con éxito"
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE: Actualizar un registro completo
export const putMaquina =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { descripcion, nombre_maquina } = req.body;

            const [result] = await conmysql.query(
                'UPDATE maquina SET descripcion = ?, nombre_maquina = ? WHERE id_maquina = ?',
                [descripcion, nombre_maquina, id]
            );

            if (result.affectedRows <= 0) {
                return res.status(404).json({ message: "Máquina no encontrada" });
            }

            const [rows] = await conmysql.query('SELECT * FROM maquina WHERE id_maquina = ?', [id]);
            res.json(rows[0]);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE parcial: Actualizar algunos campos
export const pathMaquina =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { descripcion, nombre_maquina } = req.body;

            const [result] = await conmysql.query(
                `UPDATE maquina 
             SET descripcion = IFNULL(?, descripcion), 
                 nombre_maquina = IFNULL(?, nombre_maquina) 
             WHERE id_maquina = ?`,
                [descripcion, nombre_maquina, id]
            );

            if (result.affectedRows <= 0) {
                return res.status(404).json({ message: "Máquina no encontrada" });
            }

            const [rows] = await conmysql.query('SELECT * FROM maquina WHERE id_maquina = ?', [id]);
            res.json(rows[0]);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// DELETE: Eliminar un registro
export const deleteMaquina =
    async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await conmysql.query('DELETE FROM maquina WHERE id_maquina = ?', [id]);

            if (rows.affectedRows <= 0) {
                return res.status(404).json({
                    id_maquina: 0,
                    message: "Máquina no encontrada"
                });
            }

            res.status(202).json({ message: "Máquina eliminada con éxito" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
