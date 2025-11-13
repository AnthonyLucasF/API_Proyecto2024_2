import { conmysql } from "../db.js";

// SELECT: Obtener todos los registros
export const getTalla =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM talla');
            res.json(result);
        } catch (error) {
            return res.status(500).json({ message: "Error al consultar Talla" });
        }
    };

// SELECT por ID
export const getTallaxid =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM talla WHERE id_talla = ?', [req.params.id]);
            if (result.length <= 0) {
                return res.status(404).json({
                    id_talla: 0,
                    message: "Talla no encontrada"
                });
            }
            res.json(result[0]);
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" });
        }
    };
