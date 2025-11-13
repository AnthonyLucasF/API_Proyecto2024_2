import { conmysql } from "../db.js";

// SELECT: Obtener todos los registros
export const getColor =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM color');
            res.json(result);
        } catch (error) {
            return res.status(500).json({ message: "Error al consultar Color" });
        }
    };

// SELECT por ID
export const getColorxid =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM color WHERE color_id = ?', [req.params.id]);
            if (result.length <= 0) {
                return res.status(404).json({
                    color_id: 0,
                    message: "Color no encontrado"
                });
            }
            res.json(result[0]);
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" });
        }
    };

