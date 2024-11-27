import { conmysql } from "../db.js";

// SELECT: Obtener todos los registros
export const getEmpaque =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM empaque');
            res.json(result);
        } catch (error) {
            return res.status(500).json({ message: "Error al consultar los empaques" });
        }
    };

// SELECT por ID
export const getEmpaquexid =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM empaque WHERE id_empaque = ?', [req.params.id]);
            if (result.length <= 0) {
                return res.status(404).json({
                    id_empaque: 0,
                    message: "Empaque no encontrado"
                });
            }
            res.json(result[0]);
        } catch (error) {
            return res.status(500).json({ message: "Error del servidor" });
        }
    };

// INSERT: Crear un nuevo registro
export const postEmpaque =
    async (req, res) => {
        try {
            const { cantidad_libras, fecha_empaque, id_peso, id_talla, id_materia_prima } = req.body;

            const [rows] = await conmysql.query(
                'INSERT INTO empaque (cantidad_libras, fecha_empaque, id_peso, id_talla, id_materia_prima) VALUES (?, ?, ?, ?, ?)',
                [cantidad_libras, fecha_empaque, id_peso, id_talla, id_materia_prima]
            );

            res.json({
                id: rows.insertId,
                message: "Empaque registrado con éxito"
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE: Actualizar un registro completo
export const putEmpaque =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { cantidad_libras, fecha_empaque, id_peso, id_talla, id_materia_prima } = req.body;

            const [result] = await conmysql.query(
                'UPDATE empaque SET cantidad_libras = ?, fecha_empaque = ?, id_peso = ?, id_talla = ?, id_materia_prima = ? WHERE id_empaque = ?',
                [cantidad_libras, fecha_empaque, id_peso, id_talla, id_materia_prima, id]
            );

            if (result.affectedRows <= 0) {
                return res.status(404).json({ message: "Empaque no encontrado" });
            }

            const [rows] = await conmysql.query('SELECT * FROM empaque WHERE id_empaque = ?', [id]);
            res.json(rows[0]);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE parcial: Actualizar algunos campos
export const pathEmpaque =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { cantidad_libras, fecha_empaque, id_peso, id_talla, id_materia_prima } = req.body;

            const [result] = await conmysql.query(
                `UPDATE empaque 
             SET cantidad_libras = IFNULL(?, cantidad_libras), 
                 fecha_empaque = IFNULL(?, fecha_empaque), 
                 id_peso = IFNULL(?, id_peso), 
                 id_talla = IFNULL(?, id_talla), 
                 id_materia_prima = IFNULL(?, id_materia_prima) 
             WHERE id_empaque = ?`,
                [cantidad_libras, fecha_empaque, id_peso, id_talla, id_materia_prima, id]
            );

            if (result.affectedRows <= 0) {
                return res.status(404).json({ message: "Empaque no encontrado" });
            }

            const [rows] = await conmysql.query('SELECT * FROM empaque WHERE id_empaque = ?', [id]);
            res.json(rows[0]);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// DELETE: Eliminar un registro
export const deleteEmpaque =
    async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await conmysql.query('DELETE FROM empaque WHERE id_empaque = ?', [id]);

            if (rows.affectedRows <= 0) {
                return res.status(404).json({
                    id_empaque: 0,
                    message: "Empaque no encontrado"
                });
            }

            res.sendStatus(202); // Código HTTP 202 (Accepted)
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
