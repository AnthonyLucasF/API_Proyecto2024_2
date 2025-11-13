import { conmysql } from "../db.js";

// SELECT: Obtener todos los registros
export const getClase =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM clase');
            res.json(result);
        } catch (error) {
            return res.status(500).json({ message: "Error al consultar Clase" });
        }
    };

// SELECT por ID
export const getClasexid =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM clase WHERE clase_id = ?', [req.params.id]);
            if (result.length <= 0) {
                return res.status(404).json({
                    clase_id: 0,
                    message: "Clase no encontrada"
                });
            }
            res.json(result[0]);
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" });
        }
    };

