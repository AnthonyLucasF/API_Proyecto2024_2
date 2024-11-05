import { conmysql } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Importa la clave secreta desde el archivo .env
const secretKey = process.env.SECRET_KEY;

// Controlador de autenticación
export const loginUsuarios = async (req, res) => {
    const { usr_usuario, usr_clave } = req.body;

    try {
        // Verificar si el usuario existe
        const [result] = await conmysql.query('SELECT * FROM usuarios WHERE usr_usuario = ?', [usr_usuario]);
        if (result.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });

        const user = result[0];

        // Verificar la contraseña
        const passwordMatch = await bcrypt.compare(usr_clave, user.usr_clave);
        if (!passwordMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

        // Generar el token JWT con duración de 60 segundos
        const token = jwt.sign({ id: user.usr_id }, secretKey, { expiresIn: '60s' });

        res.json({ message: "Autenticación exitosa", token });
    } catch (error) {
        return res.status(500).json({ message: "Error del Servidor" });
    }
};
