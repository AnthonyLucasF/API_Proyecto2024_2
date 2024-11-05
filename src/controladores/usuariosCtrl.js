import { conmysql } from "../db.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsuarios =
    async (req, res) => {
        try {
            const [result] = await conmysql.query(' select * from usuarios')
            res.json(result)
        } catch (error) {
            return res.status(500).json({ message: "Error al consultar usuarios" })
        }
    }

export const getUsuariosxid = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM usuarios WHERE usr_id=?', [req.params.id]);

        if (result.length <= 0) {
            return res.status(404).json({
                usr_id: 0,
                message: "Usuario no encontrado"
            });
        }

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error del Servidor" });
    }
};

export const postUsuarios = async (req, res) => {
    try {
        const { usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo } = req.body;

        // Encriptar la clave
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(usr_clave, saltRounds);

        const [rows] = await conmysql.query('INSERT INTO usuarios (usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo) VALUES(?,?,?,?,?,?)',
            [usr_usuario, hashedPassword, usr_nombre, usr_telefono, usr_correo, usr_activo]);

        res.send({
            id: rows.insertId
        });
    } catch (error) {
        return res.status(500).json({ message: "Error del Servidor" });
    }
};

export const putUsuarios = async (req, res) => {
    try {
        const { id } = req.params;
        const { usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo } = req.body;

        // Preparar los campos para la actualización
        let updatedFields = [usr_usuario, usr_nombre, usr_telefono, usr_correo, usr_activo];
        let query = 'UPDATE usuarios SET usr_usuario=?, usr_nombre=?, usr_telefono=?, usr_correo=?, usr_activo=?';

        // Encriptar la nueva clave si se proporciona
        if (usr_clave) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(usr_clave, saltRounds);
            updatedFields.push(hashedPassword);
            query += ', usr_clave=?';
        }

        query += ' WHERE usr_id=?';
        updatedFields.push(id);

        const [result] = await conmysql.query(query, updatedFields);
        if (result.affectedRows <= 0) return res.status(404).json({ message: "Usuario no encontrado" });

        const [rows] = await conmysql.query('SELECT * FROM usuarios WHERE usr_id=?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error del Servidor" });
    }
};