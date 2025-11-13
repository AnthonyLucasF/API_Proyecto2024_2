import { conmysql } from "../db.js";

// SELECT: Obtener todos los registros
export const getCoche =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM coche');
            res.json(result);
        } catch (error) {
            return res.status(500).json({ message: "Error al consultar Coches" });
        }
    };

// SELECT por ID
export const getCochexid =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM coche WHERE coche_id=?', [req.params.id]);
            if (result.length <= 0) return res.status(404).json({ 
                coche_id: 0,
                message: "Coche no encontrado" 
            });
            res.json(result[0]);
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" });
        }
    };

// INSERT: Crear un nuevo registro
export const postCoche =
    async (req, res) => {
        try {
            const { coche_descripcion, coche_estado } = req.body;

            const [rows] = await conmysql.query(
                'INSERT INTO coche (coche_descripcion, coche_estado) VALUES (?, ?)',
                [coche_descripcion, coche_estado]
            );

            res.json({
                id: rows.insertId,
                message: "Coche registrado con éxito"
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE: Actualizar un registro completo
export const putCoche =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { coche_descripcion, coche_estado } = req.body;

            const [result] = await conmysql.query(
                'UPDATE coche SET coche_descripcion=?, coche_estado=? WHERE coche_id = ?',
                [coche_descripcion, coche_estado, id]
            );

            if (result.affectedRows <= 0) return res.status(404).json({ message: "Coche no encontrado" });

            const [rows] = await conmysql.query('SELECT * FROM coche WHERE coche_id=?', [id])
            res.json(rows[0])

            res.json({
                success: true,
                message: "Coche registrado con éxito",
                data: { id: rows.insertId }
              });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE parcial: Actualizar algunos campos
export const pathCoche =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { coche_descripcion, coche_estado } = req.body;

            const [result] = await conmysql.query(
                `UPDATE coche SET 
                    coche_descripcion = IFNULL(?, coche_descripcion), 
                    coche_estado = IFNULL(?, coche_estado)
                WHERE coche_id=?`,
                [coche_descripcion, coche_estado, id]
            );

            if (result.affectedRows <= 0) return res.status(404).json({ message: "Coche no encontrado" });

            const [rows] = await conmysql.query('SELECT * FROM coche WHERE coche_id=?', [id])
            res.json(rows[0])

            res.json({ message: "Coche actualizado parcialmente" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// DELETE: Eliminar un registro
export const deleteCoche =
    async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await conmysql.query('DELETE FROM coche WHERE coche_id=?', [id]);

            if (rows.affectedRows <= 0) return res.status(404).json({ 
                id: 0,
                message: "Coche no encontrado" 
            });

            res.status(202).json({ message: "Coche eliminado con éxito" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
