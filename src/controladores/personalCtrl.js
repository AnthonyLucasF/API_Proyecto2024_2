import { conmysql } from "../db.js";

// SELECT: Obtener todos los registros
export const getChofer =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM chofer');
            res.json(result);
        } catch (error) {
            return res.status(500).json({ message: "Error al consultar Choferes" });
        }
    };

// SELECT por ID
export const getChoferxid =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM chofer WHERE chofer_id=?', [req.params.id]);
            if (result.length <= 0) return res.status(404).json({ 
                chofer_id: 0,
                message: "Chofer no encontrado" 
            });
            res.json(result[0]);
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" });
        }
    };

// INSERT: Crear un nuevo registro
export const postChofer =
    async (req, res) => {
        try {
            const { chofer_cedula, chofer_nombre, chofer_telefono, chofer_licencia } = req.body;
            //const imagen = req.file ? `/uploads/${req.file.filename}` : null;

            const [rows] = await conmysql.query(
                'INSERT INTO chofer (chofer_cedula, chofer_nombre, chofer_telefono, chofer_licencia) VALUES (?, ?, ?, ?)',
                [chofer_cedula, chofer_nombre, chofer_telefono, chofer_licencia]
            );

            res.json({
                id: rows.insertId,
                message: "Chofer registrado con éxito"
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE: Actualizar un registro completo
export const putChofer =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { chofer_cedula, chofer_nombre, chofer_telefono, chofer_licencia } = req.body;

            const [result] = await conmysql.query(
                'UPDATE chofer SET chofer_cedula=?, chofer_nombre=?, chofer_telefono=?, chofer_licencia=? WHERE chofer_id = ?',
                [chofer_cedula, chofer_nombre, chofer_telefono, chofer_licencia, id]
            );

            if (result.affectedRows <= 0) return res.status(404).json({ message: "Chofer no encontrado" });

            const [rows] = await conmysql.query('SELECT * FROM chofer WHERE chofer_id=?', [id])
            res.json(rows[0])

            res.json({
                success: true,
                message: "Chofer registrado con éxito",
                data: { id: rows.insertId }
              });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE parcial: Actualizar algunos campos
export const pathChofer =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { chofer_cedula, chofer_nombre, chofer_telefono, chofer_licencia } = req.body;

            const [result] = await conmysql.query(
                `UPDATE chofer 
            SET chofer_cedula = IFNULL(?, chofer_cedula), 
                chofer_nombre = IFNULL(?, chofer_nombre), 
                chofer_telefono = IFNULL(?, chofer_telefono), 
                chofer_licencia = IFNULL(?, chofer_licencia)
            WHERE chofer_id=?`,
                [chofer_cedula, chofer_nombre, chofer_telefono, chofer_licencia, id]
            );

            if (result.affectedRows <= 0) return res.status(404).json({ message: "Chofer no encontrado" });

            const [rows] = await conmysql.query('SELECT * FROM chofer WHERE chofer_id=?', [id])
            res.json(rows[0])

            res.json({ message: "Chofer actualizado parcialmente" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// DELETE: Eliminar un registro
export const deleteChofer =
    async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await conmysql.query('DELETE FROM chofer WHERE chofer_id=?', [id]);

            if (rows.affectedRows <= 0) return res.status(404).json({ 
                id: 0,
                message: "Chofer no encontrado" 
            });

            res.status(202).json({ message: "Chofer eliminado con éxito" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
