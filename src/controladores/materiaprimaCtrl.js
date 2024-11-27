import { conmysql } from "../db.js";

// SELECT: Obtener todos los registros
export const getMateriaPrima =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM materiaprima');
            res.json(result);
        } catch (error) {
            return res.status(500).json({ message: "Error al consultar Materia Prima" });
        }
    };

// SELECT por ID
export const getMateriaPrimaxid =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM materiaprima WHERE id_materia_prima=?', [req.params.id]);
            if (result.length <= 0) return res.status(404).json({ 
                id_materia_prima: 0,
                message: "Materia Prima no encontrada" 
            });
            res.json(result[0]);
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" });
        }
    };

// INSERT: Crear un nuevo registro
export const postMateriaPrima =
    async (req, res) => {
        try {
            const { estado, lote, cantidad, id_proveedor, id_usuario } = req.body;
            //const imagen = req.file ? `/uploads/${req.file.filename}` : null;

            const [rows] = await conmysql.query(
                'INSERT INTO materiaprima (estado, lote, cantidad, id_proveedor, id_usuario) VALUES (?, ?, ?, ?, ?)',
                [estado, lote, cantidad, id_proveedor, id_usuario]
            );

            res.json({
                id: rows.insertId,
                message: "Materia Prima registrada con éxito"
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE: Actualizar un registro completo
export const putMateriaPrima =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { estado, lote, cantidad, id_proveedor, id_usuario } = req.body;

            const [result] = await conmysql.query(
                'UPDATE materiaprima SET estado=?, lote=?, cantidad=?, id_proveedor=?, id_usuario=? WHERE id_materia_prima = ?',
                [estado, lote, cantidad, id_proveedor, id_usuario, id]
            );

            if (result.affectedRows <= 0) return res.status(404).json({ message: "Materia Prima no encontrada" });

            const [rows] = await conmysql.query('SELECT * FROM materiaprima WHERE id_materia_prima=?', [id])
            res.json(rows[0])

            //res.json({ message: "Materia Prima actualizada con éxito" });
            res.json({
                success: true,
                message: "Materia Prima registrada con éxito",
                data: { id: rows.insertId }
              });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE parcial: Actualizar algunos campos
export const pathMateriaPrima =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { estado, lote, cantidad, id_proveedor, id_usuario } = req.body;

            const [result] = await conmysql.query(
                `UPDATE materiaprima 
            SET estado = IFNULL(?, estado), 
                lote = IFNULL(?, lote), 
                cantidad = IFNULL(?, cantidad), 
                id_proveedor = IFNULL(?, id_proveedor), 
                id_usuario = IFNULL(?, id_usuario)
            WHERE id_materia_prima=?`,
                [estado, lote, cantidad, id_proveedor, id_usuario, id]
            );

            if (result.affectedRows <= 0) return res.status(404).json({ message: "Materia Prima no encontrada" });

            const [rows] = await conmysql.query('SELECT * FROM materiaprima WHERE id_materia_prima=?', [id])
            res.json(rows[0])

            res.json({ message: "Materia Prima actualizada parcialmente" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// DELETE: Eliminar un registro
export const deleteMateriaPrima =
    async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await conmysql.query('DELETE FROM materiaprima WHERE id_materia_prima=?', [id]);

            if (rows.affectedRows <= 0) return res.status(404).json({ 
                id: 0,
                message: "Materia Prima no encontrada" 
            });

            res.sendStatus(202); // Código HTTP 202 (Accepted)
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
