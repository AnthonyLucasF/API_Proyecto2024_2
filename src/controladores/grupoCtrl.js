import { conmysql } from "../db.js";

// SELECT: Obtener todos los registros
export const getGrupo =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM grupo');
            res.json(result);
        } catch (error) {
            return res.status(500).json({ message: "Error al consultar Grupos" });
        }
    };

// SELECT por ID
export const getGrupoxid =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM grupo WHERE grupo_id = ?', [req.params.id]);
            if (result.length <= 0) {
                return res.status(404).json({
                    grupo_id: 0,
                    message: "Grupo no encontrado"
                });
            }
            res.json(result[0]);
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" });
        }
    };

// INSERT: Crear un nuevo registro
export const postGrupo =
    async (req, res) => {
        try {
            const { grupo_nombre, grupo_jefe } = req.body;

            const [rows] = await conmysql.query(
                'INSERT INTO grupo (grupo_nombre, grupo_jefe) VALUES (?, ?)',
                [grupo_nombre, grupo_jefe]
            );

            res.json({
                id: rows.insertId,
                message: "Grupo registrado con éxito"
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE: Actualizar un registro completo
export const putGrupo =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { grupo_nombre, grupo_jefe } = req.body;

            const [result] = await conmysql.query(
                'UPDATE grupo SET grupo_nombre = ?, grupo_jefe = ? WHERE grupo_id = ?',
                [grupo_nombre, grupo_jefe, id]
            );

            if (result.affectedRows <= 0) {
                return res.status(404).json({ message: "Grupo no encontrado" });
            }

            const [rows] = await conmysql.query('SELECT * FROM grupo WHERE grupo_id = ?', [id]);
            res.json(rows[0]);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE parcial: Actualizar algunos campos
export const pathGrupo =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { grupo_nombre, grupo_jefe } = req.body;

            const [result] = await conmysql.query(
                `UPDATE grupo 
             SET grupo_nombre = IFNULL(?, grupo_nombre), 
                 grupo_jefe = IFNULL(?, grupo_jefe) 
             WHERE grupo_id = ?`,
                [grupo_nombre, grupo_jefe, id]
            );

            if (result.affectedRows <= 0) {
                return res.status(404).json({ message: "Grupo no encontrado" });
            }

            const [rows] = await conmysql.query('SELECT * FROM grupo WHERE grupo_id = ?', [id]);
            res.json(rows[0]);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// DELETE: Eliminar un registro
export const deleteGrupo =
    async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await conmysql.query('DELETE FROM grupo WHERE grupo_id = ?', [id]);

            if (rows.affectedRows <= 0) {
                return res.status(404).json({
                    grupo_id: 0,
                    message: "Grupo no encontrado"
                });
            }

            res.status(202).json({ message: "Grupo eliminado con éxito" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
