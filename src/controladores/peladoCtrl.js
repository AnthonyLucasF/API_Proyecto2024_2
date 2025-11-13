import { conmysql } from "../db.js";

// GET: Obtener todos ordenados descendente por fecha
export const getPelado = async (req, res) => {
  try {
    const [result] = await conmysql.query(`
      SELECT p.*, l.lote_codigo, u.usuario_nombre, o.orden_codigo, ch.coche_descripcion
      FROM pelado p
      LEFT JOIN lote l ON p.lote_id = l.lote_id
      LEFT JOIN usuario u ON p.usuario_id = u.usuario_id
      LEFT JOIN orden o ON p.orden_id = o.orden_id
      LEFT JOIN coche ch ON p.coche_id = ch.coche_id
      ORDER BY p.pelado_fecha DESC
    `);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error al consultar Pelado" });
  }
};

// GET por ID (sin cambio)
export const getPeladoxid = async (req, res) => {
  try {
    const [result] = await conmysql.query('SELECT * FROM pelado WHERE pelado_id = ?', [req.params.id]);
    if (result.length <= 0) return res.status(404).json({ pelado_id: 0, message: "Pelado no encontrado" });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: "Error del Servidor" });
  }
};

// POST: Insert pelado, calc rendimiento
export const postPelado = async (req, res) => {
  try {
    const { usuario_id, lote_id, orden_id, coche_id, pelado_libras_peladas, pelado_basura, pelado_observaciones } = req.body;

    if (!lote_id || !orden_id || !coche_id) return res.status(400).json({ message: "Lote, orden y coche requeridos" });

    const [lote] = await conmysql.query('SELECT lote_libras_remitidas FROM lote WHERE lote_id = ?', [lote_id]);
    const librasRemitidas = lote[0].lote_libras_remitidas || 0;
    const rendimiento = (librasRemitidas > 0 ? (pelado_libras_peladas - pelado_basura) / librasRemitidas * 100 : 0).toFixed(2);

    const [insert] = await conmysql.query(
      'INSERT INTO pelado (usuario_id, lote_id, orden_id, coche_id, pelado_libras_peladas, pelado_basura, pelado_rendimiento, pelado_observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [usuario_id, lote_id, orden_id, coche_id, pelado_libras_peladas, pelado_basura, rendimiento, pelado_observaciones]
    );

    const nuevoId = insert.insertId;
    const [nuevo] = await conmysql.query('SELECT * FROM pelado WHERE pelado_id = ?', [nuevoId]);
    global._io.emit("pelado_nuevo", nuevo[0]);

    res.json({ id: nuevoId, message: "Pelado registrado con éxito", rendimiento });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// PUT: Update, recalc rendimiento
export const putPelado = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario_id, lote_id, orden_id, coche_id, pelado_libras_peladas, pelado_basura, pelado_observaciones } = req.body;

    const [lote] = await conmysql.query('SELECT lote_libras_remitidas FROM lote WHERE lote_id = ?', [lote_id]);
    const librasRemitidas = lote[0].lote_libras_remitidas || 0;
    const rendimiento = (librasRemitidas > 0 ? (pelado_libras_peladas - pelado_basura) / librasRemitidas * 100 : 0).toFixed(2);

    const [result] = await conmysql.query(
      `UPDATE pelado SET 
        usuario_id = ?, lote_id = ?, orden_id = ?, coche_id = ?,
        pelado_libras_peladas = ?, pelado_basura = ?,
        pelado_rendimiento = ?, pelado_observaciones = ?
      WHERE pelado_id = ?`,
      [usuario_id, lote_id, orden_id, coche_id, pelado_libras_peladas, pelado_basura, rendimiento, pelado_observaciones, id]
    );

    if (result.affectedRows <= 0) return res.status(404).json({ message: "Pelado no encontrado" });

    const [rows] = await conmysql.query('SELECT * FROM pelado WHERE pelado_id = ?', [id]);
    global._io.emit("pelado_actualizado", rows[0]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// PATCH: Partial
export const pathPelado = async (req, res) => {
  try {
    const { id } = req.params;
    const campos = Object.keys(req.body);
    const valores = Object.values(req.body);

    if (campos.length === 0) return res.status(400).json({ message: "No campos para actualizar" });

    const setClause = campos.map(c => `${c} = IFNULL(?, ${c})`).join(', ');
    const [result] = await conmysql.query(
      `UPDATE pelado SET ${setClause}, pelado_rendimiento = ? WHERE pelado_id = ?`,
      [...valores, 0, id]
    );

    if (result.affectedRows <= 0) return res.status(404).json({ message: "Pelado no encontrado" });

    const [rows] = await conmysql.query('SELECT * FROM pelado WHERE pelado_id = ?', [id]);
    global._io.emit("pelado_actualizado", rows[0]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deletePelado = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await conmysql.query('DELETE FROM pelado WHERE pelado_id = ?', [id]);

    if (rows.affectedRows <= 0) return res.status(404).json({ id: 0, message: "Pelado no encontrado" });

    global._io.emit("pelado_eliminado", { pelado_id: parseInt(id) });
    res.status(202).json({ message: "Pelado eliminado con éxito" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};