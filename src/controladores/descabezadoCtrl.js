import { conmysql } from "../db.js";

// GET: Obtener todos ordenados descendente por fecha
export const getDescabezado = async (req, res) => {
  try {
    const [result] = await conmysql.query(`
      SELECT d.*, l.lote_codigo, u.usuario_nombre, o.orden_codigo, ch.coche_descripcion
      FROM descabezado d
      LEFT JOIN lote l ON d.lote_id = l.lote_id
      LEFT JOIN usuario u ON d.usuario_id = u.usuario_id
      LEFT JOIN orden o ON d.orden_id = o.orden_id
      LEFT JOIN coche ch ON d.coche_id = ch.coche_id
      ORDER BY d.descabezado_fecha DESC
    `);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error al consultar Descabezado" });
  }
};

// GET por ID (sin cambio)
export const getDescabezadoxid = async (req, res) => {
  try {
    const [result] = await conmysql.query('SELECT * FROM descabezado WHERE descabezado_id = ?', [req.params.id]);
    if (result.length <= 0) return res.status(404).json({ descabezado_id: 0, message: "Descabezado no encontrado" });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: "Error del Servidor" });
  }
};

// POST: Insert descabezado, calc rendimiento
export const postDescabezado = async (req, res) => {
  try {
    const { usuario_id, lote_id, orden_id, coche_id, descabezado_libras_descabezadas, descabezado_basura, descabezado_observaciones } = req.body;

    if (!lote_id || !orden_id || !coche_id) return res.status(400).json({ message: "Lote, orden y coche requeridos" });

    const [lote] = await conmysql.query('SELECT lote_libras_remitidas FROM lote WHERE lote_id = ?', [lote_id]);
    const librasRemitidas = lote[0].lote_libras_remitidas || 0;
    const rendimiento = (librasRemitidas > 0 ? (descabezado_libras_descabezadas - descabezado_basura) / librasRemitidas * 100 : 0).toFixed(2);

    const [insert] = await conmysql.query(
      'INSERT INTO descabezado (usuario_id, lote_id, orden_id, coche_id, descabezado_libras_descabezadas, descabezado_basura, descabezado_rendimiento, descabezado_observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [usuario_id, lote_id, orden_id, coche_id, descabezado_libras_descabezadas, descabezado_basura, rendimiento, descabezado_observaciones]
    );

    const nuevoId = insert.insertId;
    const [nuevo] = await conmysql.query('SELECT * FROM descabezado WHERE descabezado_id = ?', [nuevoId]);
    global._io.emit("descabezado_nuevo", nuevo[0]);

    res.json({ id: nuevoId, message: "Descabezado registrado con éxito", rendimiento });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// PUT: Update, recalc rendimiento
export const putDescabezado = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario_id, lote_id, orden_id, coche_id, descabezado_libras_descabezadas, descabezado_basura, descabezado_observaciones } = req.body;

    const [lote] = await conmysql.query('SELECT lote_libras_remitidas FROM lote WHERE lote_id = ?', [lote_id]);
    const librasRemitidas = lote[0].lote_libras_remitidas || 0;
    const rendimiento = (librasRemitidas > 0 ? (descabezado_libras_descabezadas - descabezado_basura) / librasRemitidas * 100 : 0).toFixed(2);

    const [result] = await conmysql.query(
      `UPDATE descabezado SET 
        usuario_id = ?, lote_id = ?, orden_id = ?, coche_id = ?,
        descabezado_libras_descabezadas = ?, descabezado_basura = ?,
        descabezado_rendimiento = ?, descabezado_observaciones = ?
      WHERE descabezado_id = ?`,
      [usuario_id, lote_id, orden_id, coche_id, descabezado_libras_descabezadas, descabezado_basura, rendimiento, descabezado_observaciones, id]
    );

    if (result.affectedRows <= 0) return res.status(404).json({ message: "Descabezado no encontrado" });

    const [rows] = await conmysql.query('SELECT * FROM descabezado WHERE descabezado_id = ?', [id]);
    global._io.emit("descabezado_actualizado", rows[0]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// PATCH: Partial
export const pathDescabezado = async (req, res) => {
  try {
    const { id } = req.params;
    const campos = Object.keys(req.body);
    const valores = Object.values(req.body);

    if (campos.length === 0) return res.status(400).json({ message: "No campos para actualizar" });

    const setClause = campos.map(c => `${c} = IFNULL(?, ${c})`).join(', ');
    const [result] = await conmysql.query(
      `UPDATE descabezado SET ${setClause}, descabezado_rendimiento = ? WHERE descabezado_id = ?`,
      [...valores, 0, id]
    );

    if (result.affectedRows <= 0) return res.status(404).json({ message: "Descabezado no encontrado" });

    const [rows] = await conmysql.query('SELECT * FROM descabezado WHERE descabezado_id = ?', [id]);
    global._io.emit("descabezado_actualizado", rows[0]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteDescabezado = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await conmysql.query('DELETE FROM descabezado WHERE descabezado_id = ?', [id]);

    if (rows.affectedRows <= 0) return res.status(404).json({ id: 0, message: "Descabezado no encontrado" });

    global._io.emit("descabezado_eliminado", { descabezado_id: parseInt(id) });
    res.status(202).json({ message: "Descabezado eliminado con éxito" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};