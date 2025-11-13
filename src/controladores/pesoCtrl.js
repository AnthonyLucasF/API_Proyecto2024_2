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
            const [result] = await conmysql.query('SELECT * FROM peso WHERE peso_id = ?', [req.params.id]);
            if (result.length <= 0) {
                return res.status(404).json({
                    peso_id: 0,
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
            const { peso_descripcion, peso_cantidad } = req.body;

            const [rows] = await conmysql.query(
                'INSERT INTO peso (peso_descripcion, peso_cantidad) VALUES (?, ?)',
                [peso_descripcion, peso_cantidad]
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
            const { peso_descripcion, peso_cantidad } = req.body;

            const [result] = await conmysql.query(
                'UPDATE peso SET peso_descripcion = ?, peso_cantidad = ? WHERE peso_id = ?',
                [peso_descripcion, peso_cantidad, id]
            );

            if (result.affectedRows <= 0) {
                return res.status(404).json({ message: "Peso no encontrado" });
            }

            const [rows] = await conmysql.query('SELECT * FROM peso WHERE peso_id = ?', [id]);
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
            const { peso_descripcion, peso_cantidad } = req.body;

            const [result] = await conmysql.query(
                `UPDATE peso 
             SET peso_descripcion = IFNULL(?, peso_descripcion), 
                 peso_cantidad = IFNULL(?, peso_cantidad) 
             WHERE peso_id = ?`,
                [peso_descripcion, peso_cantidad, id]
            );

            if (result.affectedRows <= 0) {
                return res.status(404).json({ message: "Peso no encontrado" });
            }

            const [rows] = await conmysql.query('SELECT * FROM peso WHERE peso_id = ?', [id]);
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
            const [rows] = await conmysql.query('DELETE FROM peso WHERE peso_id = ?', [id]);

            if (rows.affectedRows <= 0) {
                return res.status(404).json({
                    id: 0,
                    message: "Peso no encontrado"
                });
            }

            res.status(202).json({ message: "Peso eliminado con éxito" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
