import { conmysql } from "../db.js";

// SELECT: Obtener todos los registros
export const getCorte =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM corte');
            res.json(result);
        } catch (error) {
            return res.status(500).json({ message: "Error al consultar Corte" });
        }
    };

// SELECT por ID
export const getCortexid =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM corte WHERE id_corte = ?', [req.params.id]);
            if (result.length <= 0) {
                return res.status(404).json({
                    id_corte: 0,
                    message: "Corte no encontrado"
                });
            }
            res.json(result[0]);
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" });
        }
    };

