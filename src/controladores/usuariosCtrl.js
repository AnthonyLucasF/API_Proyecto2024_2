import { conmysql } from "../db.js";

// SELECT: Obtener todos los registros
export const getUsuario =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM usuario');
            res.json(result);
        } catch (error) {
            return res.status(500).json({ message: "Error al consultar Usuarios" });
        }
    };

// SELECT por ID
export const getUsuarioxid =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM usuario WHERE usuario_id=?', [req.params.id]);
            if (result.length <= 0) return res.status(404).json({ 
                chofer_id: 0,
                message: "Usuario no encontrado" 
            });
            res.json(result[0]);
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" });
        }
    };

// INSERT: Crear un nuevo registro
export const postUsuario =
    async (req, res) => {
        try {
            const { usuario_cedula, usuario_nombre, usuario_usuario, usuarioclave, usuario_estado, usuario_rol } = req.body;
            //const imagen = req.file ? `/uploads/${req.file.filename}` : null;

            const [rows] = await conmysql.query(
                `INSERT INTO usuario 
                    (usuario_cedula, usuario_nombre, usuario_usuario, usuarioclave, usuario_estado, usuario_rol) 
                VALUES (?, ?, ?, ?, ?, ?)`,
                [usuario_cedula, usuario_nombre, usuario_usuario, usuarioclave, usuario_estado, usuario_rol]
            );

            res.json({
                id: rows.insertId,
                message: "Usuario registrado con éxito"
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE: Actualizar un registro completo
export const putUsuario =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { usuario_cedula, usuario_nombre, usuario_usuario, usuarioclave, usuario_estado, usuario_rol } = req.body;

            const [result] = await conmysql.query(
                `UPDATE chofer SET 
                    usuario_cedula=?, usuario_nombre=?, usuario_usuario=?, usuarioclave=?, usuario_estado=?, usuario_rol=? 
                WHERE usuario_id = ?`,
                [usuario_cedula, usuario_nombre, usuario_usuario, usuarioclave, usuario_estado, usuario_rol, id]
            );

            if (result.affectedRows <= 0) return res.status(404).json({ message: "Usuario no encontrado" });

            const [rows] = await conmysql.query('SELECT * FROM usuario WHERE usuario_id=?', [id])
            res.json(rows[0])

            res.json({
                success: true,
                message: "Usuario registrado con éxito",
                data: { id: rows.insertId }
              });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE parcial: Actualizar algunos campos
export const pathUsuario =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { usuario_cedula, usuario_nombre, usuario_usuario, usuarioclave, usuario_estado, usuario_rol } = req.body;

            const [result] = await conmysql.query(
                `UPDATE usuario SET 
                    usuario_cedula = IFNULL(?, usuario_cedula), 
                    usuario_nombre = IFNULL(?, usuario_nombre), 
                    usuario_usuario = IFNULL(?, usuario_usuario), 
                    usuarioclave = IFNULL(?, usuarioclave), 
                    usuario_estado = IFNULL(?, usuario_estado), 
                    usuario_rol = IFNULL(?, usuario_rol)
                WHERE usuario_id=?`,
                [usuario_cedula, usuario_nombre, usuario_usuario, usuarioclave, usuario_estado, usuario_rol, id]
            );

            if (result.affectedRows <= 0) return res.status(404).json({ message: "Usuario no encontrado" });

            const [rows] = await conmysql.query('SELECT * FROM usuario WHERE usuario_id=?', [id])
            res.json(rows[0])

            res.json({ message: "Usuario actualizado parcialmente" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// DELETE: Eliminar un registro
export const deleteUsuario =
    async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await conmysql.query('DELETE FROM usuario WHERE usuario_id=?', [id]);

            if (rows.affectedRows <= 0) return res.status(404).json({ 
                id: 0,
                message: "Usuario no encontrado" 
            });

            res.status(202).json({ message: "Usuario eliminado con éxito" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
