import { conmysql } from "../db.js";

// SELECT: Obtener todos los registros
export const getProceso =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM proceso');
            res.json(result);
        } catch (error) {
            return res.status(500).json({ message: "Error al consultar los procesos" });
        }
    };

// SELECT por ID
export const getProcesoxid =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM proceso WHERE id_proceso = ?', [req.params.id]);
            if (result.length <= 0) {
                return res.status(404).json({
                    id_proceso: 0,
                    message: "Proceso no encontrado"
                });
            }
            res.json(result[0]);
        } catch (error) {
            return res.status(500).json({ message: "Error del servidor" });
        }
    };

// INSERT: Crear un nuevo registro
export const postProceso =
    async (req, res) => {
        try {
            const { fecha_proceso, id_corte, id_maquina, id_materia_prima } = req.body;

            const [rows] = await conmysql.query(
                'INSERT INTO proceso (fecha_proceso, id_corte, id_maquina, id_materia_prima) VALUES (?, ?, ?, ?)',
                [fecha_proceso, id_corte, id_maquina, id_materia_prima]
            );

            res.json({
                id: rows.insertId,
                message: "Proceso registrado con éxito"
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE: Actualizar un registro completo
export const putProceso =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { fecha_proceso, id_corte, id_maquina, id_materia_prima } = req.body;

            const [result] = await conmysql.query(
                'UPDATE proceso SET fecha_proceso = ?, id_corte = ?, id_maquina = ?, id_materia_prima = ? WHERE id_proceso = ?',
                [fecha_proceso, id_corte, id_maquina, id_materia_prima, id]
            );

            if (result.affectedRows <= 0) {
                return res.status(404).json({ message: "Proceso no encontrado" });
            }

            const [rows] = await conmysql.query('SELECT * FROM proceso WHERE id_proceso = ?', [id]);
            res.json(rows[0]);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE parcial: Actualizar algunos campos
export const pathProceso =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { fecha_proceso, id_corte, id_maquina, id_materia_prima } = req.body;

            const [result] = await conmysql.query(
                `UPDATE proceso 
             SET fecha_proceso = IFNULL(?, fecha_proceso), 
                 id_corte = IFNULL(?, id_corte), 
                 id_maquina = IFNULL(?, id_maquina), 
                 id_materia_prima = IFNULL(?, id_materia_prima) 
             WHERE id_proceso = ?`,
                [fecha_proceso, id_corte, id_maquina, id_materia_prima, id]
            );

            if (result.affectedRows <= 0) {
                return res.status(404).json({ message: "Proceso no encontrado" });
            }

            const [rows] = await conmysql.query('SELECT * FROM proceso WHERE id_proceso = ?', [id]);
            res.json(rows[0]);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// DELETE: Eliminar un registro
export const deleteProceso =
    async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await conmysql.query('DELETE FROM proceso WHERE id_proceso = ?', [id]);

            if (rows.affectedRows <= 0) {
                return res.status(404).json({
                    id_proceso: 0,
                    message: "Proceso no encontrado"
                });
            }

            res.sendStatus(202); // Código HTTP 202 (Accepted)
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
