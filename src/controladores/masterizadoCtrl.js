/* import { conmysql } from "../db.js";

// Obtener todos los registros
export const getMasterizado = async (req, res) => {
  try {
    const [result] = await conmysql.query(`
      SELECT m.*, l.lote_codigo, u.usuario_nombre, c.clasificacion_codigo
      FROM masterizado m
      LEFT JOIN lote l ON m.lote_id = l.lote_id
      LEFT JOIN usuario u ON m.usuario_id = u.usuario_id
      LEFT JOIN clasificacion c ON m.clasificacion_id = c.clasificacion_id
    `);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al consultar Masterizados", error });
  }
};

// Obtener un registro por ID
export const getMasterizadoxid = async (req, res) => {
  try {
    const [result] = await conmysql.query(`
      SELECT m.*, l.lote_codigo, u.usuario_nombre, c.clasificacion_codigo
      FROM masterizado m
      LEFT JOIN lote l ON m.lote_id = l.lote_id
      LEFT JOIN usuario u ON m.usuario_id = u.usuario_id
      LEFT JOIN clasificacion c ON m.clasificacion_id = c.clasificacion_id
      WHERE masterizado_id = ?
    `, [req.params.id]);

    if (result.length === 0)
      return res.status(404).json({ message: "Masterizado no encontrado" });

    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar Masterizado", error });
  }
};

// Crear un nuevo masterizado
export const postMasterizado = async (req, res) => {
  try {
    const {
      lote_id, clasificacion_id, usuario_id, masterizado_fecha,
      masterizado_turno, masterizado_total_libras, masterizado_total_cajas,
      masterizado_total_master, masterizado_observaciones
    } = req.body;

    if (!lote_id || !clasificacion_id || !usuario_id) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const [insert] = await conmysql.query(`
      INSERT INTO masterizado (
        lote_id, clasificacion_id, usuario_id, masterizado_fecha,
        masterizado_turno, masterizado_total_libras, masterizado_total_cajas,
        masterizado_total_master, masterizado_observaciones
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      lote_id, clasificacion_id, usuario_id, masterizado_fecha,
      masterizado_turno, masterizado_total_libras, masterizado_total_cajas,
      masterizado_total_master, masterizado_observaciones
    ]);

    res.json({ id: insert.insertId, message: "Masterizado registrado con éxito" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un masterizado completo
export const putMasterizado = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      lote_id, clasificacion_id, usuario_id, masterizado_fecha,
      masterizado_turno, masterizado_total_libras, masterizado_total_cajas,
      masterizado_total_master, masterizado_observaciones
    } = req.body;

    const [result] = await conmysql.query(`
      UPDATE masterizado SET
        lote_id = ?, clasificacion_id = ?, usuario_id = ?, masterizado_fecha = ?,
        masterizado_turno = ?, masterizado_total_libras = ?, masterizado_total_cajas = ?,
        masterizado_total_master = ?, masterizado_observaciones = ?
      WHERE masterizado_id = ?
    `, [
      lote_id, clasificacion_id, usuario_id, masterizado_fecha,
      masterizado_turno, masterizado_total_libras, masterizado_total_cajas,
      masterizado_total_master, masterizado_observaciones, id
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Masterizado no encontrado" });

    const [updated] = await conmysql.query('SELECT * FROM masterizado WHERE masterizado_id = ?', [id]);
    res.json(updated[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualización parcial (PATCH)
export const pathMasterizado = async (req, res) => {
  try {
    const { id } = req.params;
    const campos = Object.keys(req.body);
    const valores = Object.values(req.body);

    if (campos.length === 0)
      return res.status(400).json({ message: "No se enviaron campos para actualizar" });

    const setClause = campos.map(c => `${c} = IFNULL(?, ${c})`).join(', ');

    const [result] = await conmysql.query(
      `UPDATE masterizado SET ${setClause} WHERE masterizado_id = ?`,
      [...valores, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Masterizado no encontrado" });

    const [updated] = await conmysql.query('SELECT * FROM masterizado WHERE masterizado_id = ?', [id]);
    res.json(updated[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un masterizado
export const deleteMasterizado = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await conmysql.query('DELETE FROM masterizado WHERE masterizado_id = ?', [id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Masterizado no encontrado" });

    res.status(202).json({ message: "Masterizado eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; */

import { conmysql } from "../db.js";

// GET: Obtener todos los registros
export const getMasterizado = async (req, res) => {
  try {
    const [result] = await conmysql.query(`
      SELECT m.*, l.lote_codigo, u.usuario_nombre, c.clasificacion_codigo
      FROM masterizado m
      JOIN lote l ON m.lote_id = l.lote_id
      JOIN usuario u ON m.usuario_id = u.usuario_id
      JOIN clasificacion c ON m.clasificacion_id = c.clasificacion_id
    `);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al consultar Datos de Masterizado", error });
  }
};

// GET: Obtener un registro por ID
export const getMasterizadoxid = async (req, res) => {
  try {
    const [result] = await conmysql.query(`
      SELECT m.*, l.lote_codigo, u.usuario_nombre, c.clasificacion_codigo
      FROM masterizado m
      JOIN lote l ON m.lote_id = l.lote_id
      JOIN usuario u ON m.usuario_id = u.usuario_id
      JOIN clasificacion c ON m.clasificacion_id = c.clasificacion_id
      WHERE m.masterizado_id = ?
    `, [req.params.id]);

    if (result.length === 0)
      return res.status(404).json({ masterizado_id: 0, message: "Datos de Masterizado no encontrados" });

    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ message: "Error del Servidor", error });
  }
};

// POST: Insertar nuevo registro
export const postMasterizado = async (req, res) => {
  try {
    const {
      lote_id, clasificacion_id, usuario_id,
      masterizado_fecha, masterizado_turno,
      masterizado_total_libras, masterizado_total_cajas,
      masterizado_total_master, masterizado_observaciones
    } = req.body;

    const [result] = await conmysql.query(`
      INSERT INTO masterizado
      (lote_id, clasificacion_id, usuario_id, masterizado_fecha, masterizado_turno,
       masterizado_total_libras, masterizado_total_cajas, masterizado_total_master, masterizado_observaciones)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        lote_id, clasificacion_id, usuario_id, masterizado_fecha, masterizado_turno,
        masterizado_total_libras, masterizado_total_cajas, masterizado_total_master, masterizado_observaciones
      ]
    );

    res.json({
      id: result.insertId,
      message: "Masterizado registrado con éxito"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT: Actualizar registro completo
export const putMasterizado = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      lote_id, clasificacion_id, usuario_id,
      masterizado_fecha, masterizado_turno,
      masterizado_total_libras, masterizado_total_cajas,
      masterizado_total_master, masterizado_observaciones
    } = req.body;

    const [result] = await conmysql.query(`
      UPDATE masterizado SET
        lote_id = ?, clasificacion_id = ?, usuario_id = ?,
        masterizado_fecha = ?, masterizado_turno = ?,
        masterizado_total_libras = ?, masterizado_total_cajas = ?,
        masterizado_total_master = ?, masterizado_observaciones = ?
      WHERE masterizado_id = ?`,
      [
        lote_id, clasificacion_id, usuario_id,
        masterizado_fecha, masterizado_turno,
        masterizado_total_libras, masterizado_total_cajas,
        masterizado_total_master, masterizado_observaciones, id
      ]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Masterizado no encontrado" });

    const [rows] = await conmysql.query('SELECT * FROM masterizado WHERE masterizado_id = ?', [id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH: Actualización parcial
export const pathMasterizado = async (req, res) => {
  try {
    const { id } = req.params;
    const campos = Object.keys(req.body);
    const valores = Object.values(req.body);

    if (campos.length === 0)
      return res.status(400).json({ message: "No se enviaron campos para actualizar" });

    const setClause = campos.map(campo => `${campo} = IFNULL(?, ${campo})`).join(', ');
    const [result] = await conmysql.query(
      `UPDATE masterizado SET ${setClause} WHERE masterizado_id = ?`,
      [...valores, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Masterizado no encontrado" });

    const [rows] = await conmysql.query('SELECT * FROM masterizado WHERE masterizado_id = ?', [id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE: Eliminar registro
export const deleteMasterizado = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await conmysql.query('DELETE FROM masterizado WHERE masterizado_id = ?', [id]);

    if (rows.affectedRows === 0)
      return res.status(404).json({ id: 0, message: "Masterizado no encontrado" });

    res.status(202).json({ message: "Masterizado eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
