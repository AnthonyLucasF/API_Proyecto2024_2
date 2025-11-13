import { conmysql } from "../db.js";

// SELECT: Obtener todos los registros
export const getTipo =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM tipo');
            res.json(result);
        } catch (error) {
            return res.status(500).json({ message: "Error al consultar Tipos de camarón" });
        }
    };
