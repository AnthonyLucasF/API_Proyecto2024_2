import { conmysql } from "../db.js";

// GET: All with JOINs, ORDER BY fecha DESC
export const getLiquidacion = async (req, res) => {
  try {
    const [result] = await conmysql.query(`
      SELECT li.*, i.lote_id, l.lote_codigo, l.lote_tipo
      FROM liquidacion li
      LEFT JOIN ingresotunel i ON li.ingresotunel_id = i.ingresotunel_id
      LEFT JOIN lote l ON i.lote_id = l.lote_id
      ORDER BY li.liquidacion_fecha DESC
    `);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error al consultar Liquidaciones" });
  }
};

// GET por ID
export const getLiquidacionxid = async (req, res) => {
  try {
    const [result] = await conmysql.query('SELECT * FROM liquidacion WHERE liquidacion_id = ?', [req.params.id]);
    if (result.length <= 0) return res.status(404).json({ liquidacion_id: 0, message: "Liquidación no encontrada" });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: "Error del Servidor" });
  }
};

// POST: Calc from ingreso_id
export const postLiquidacion = async (req, res) => {
  try {
    const { ingresotunel_id, liquidacion_observaciones, liquidacion_tipo } = req.body;

    if (!ingresotunel_id) return res.status(400).json({ message: "ingresotunel_id required" });

    const [ingreso] = await conmysql.query('SELECT lote_id, ingresotunel_total, ingresotunel_basura FROM ingresotunel WHERE ingresotunel_id = ?', [ingresotunel_id]);
    const loteId = ingreso[0].lote_id;
    const empacadas = ingreso[0].ingresotunel_total || 0;
    const basuraIng = ingreso[0].ingresotunel_basura || 0;

    const [lote] = await conmysql.query('SELECT lote_peso_promedio, lote_tipo, parent_lote_id FROM lote WHERE lote_id = ?', [loteId]);
    const promedio = lote[0].lote_peso_promedio || 0;
    const loteTipo = lote[0].lote_tipo.toLowerCase();
    const parentId = lote[0].parent_lote_id || 0;

    let parentBasura = 0;
    if (loteTipo.includes('cola') && parentId) {
      const [parentAggreg] = await conmysql.query('SELECT SUM(ingresotunel_basura) as basura FROM ingresotunel WHERE lote_id = ?', [parentId]);
      parentBasura = parentAggreg[0].basura || 0;
    }

    const [defBasura] = await conmysql.query('SELECT SUM(defectos_basura) as def_basura FROM defectos WHERE lote_id = ?', [loteId]);
    const basuraDef = defBasura[0].def_basura || 0;

    const totalBasura = basuraIng + parentBasura + basuraDef;
    let rendimiento = 0;
    if (loteTipo.includes('entero')) {
      rendimiento = promedio > 0 ? (empacadas / promedio * 100).toFixed(2) : 0;
    } else {
      rendimiento = promedio > 0 ? (empacadas / (promedio - totalBasura) * 100).toFixed(2) : 0;
    }

    const tipo = liquidacion_tipo || (loteTipo.includes('entero') ? 'entero' : 'cola');
    const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const [result] = await conmysql.query(
      'INSERT INTO liquidacion (ingresotunel_id, liquidacion_fecha, liquidacion_rendimiento, liquidacion_basura, liquidacion_observaciones, liquidacion_tipo) VALUES (?, ?, ?, ?, ?, ?)',
      [ingresotunel_id, fecha, rendimiento, totalBasura, liquidacion_observaciones || 'Todo Perfecto :D', tipo]
    );

    const id = result.insertId;
    const [rows] = await conmysql.query('SELECT * FROM liquidacion WHERE liquidacion_id = ?', [id]);
    global._io.emit("liquidacion_generada", rows[0]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// PUT: Recalc on update
export const putLiquidacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { ingresotunel_id, liquidacion_observaciones, liquidacion_tipo } = req.body;

    // Recalc as in post
    const [ingreso] = await conmysql.query('SELECT lote_id, ingresotunel_total, ingresotunel_basura FROM ingresotunel WHERE ingresotunel_id = ?', [ingresotunel_id]);
    const loteId = ingreso[0].lote_id;
    const empacadas = ingreso[0].ingresotunel_total || 0;
    const basuraIng = ingreso[0].ingresotunel_basura || 0;

    const [lote] = await conmysql.query('SELECT lote_peso_promedio, lote_tipo, parent_lote_id FROM lote WHERE lote_id = ?', [loteId]);
    const promedio = lote[0].lote_peso_promedio || 0;
    const loteTipo = lote[0].lote_tipo.toLowerCase();
    const parentId = lote[0].parent_lote_id || 0;
    let parentBasura = 0;
    if (loteTipo.includes('cola') && parentId) {
      const [parentAggreg] = await conmysql.query('SELECT SUM(ingresotunel_basura) as basura FROM ingresotunel WHERE lote_id = ?', [parentId]);
      parentBasura = parentAggreg[0].basura || 0;
    }

    const [defBasura] = await conmysql.query('SELECT SUM(defectos_basura) as def_basura FROM defectos WHERE lote_id = ?', [loteId]);
    const basuraDef = defBasura[0].def_basura || 0;

    const totalBasura = basuraIng + parentBasura + basuraDef;
    let rendimiento = 0;
    if (loteTipo.includes('entero')) {
      rendimiento = promedio > 0 ? (empacadas / promedio * 100).toFixed(2) : 0;
    } else {
      rendimiento = promedio > 0 ? (empacadas / (promedio - totalBasura) * 100).toFixed(2) : 0;
    }

    const [result] = await conmysql.query(
      'UPDATE liquidacion SET ingresotunel_id = ?, liquidacion_rendimiento = ?, liquidacion_basura = ?, liquidacion_observaciones = ?, liquidacion_tipo = ? WHERE liquidacion_id = ?',
      [ingresotunel_id, rendimiento, totalBasura, liquidacion_observaciones || 'Todo Perfecto :D', liquidacion_tipo, id]
    );

    if (result.affectedRows <= 0) return res.status(404).json({ message: "Liquidación no encontrada" });

    const [rows] = await conmysql.query('SELECT * FROM liquidacion WHERE liquidacion_id = ?', [id]);
    global._io.emit("liquidacion_actualizada", rows[0]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ... DELETE / PATCH igual ...

// PATCH: Partial
export const pathLiquidacion = async (req, res) => {
  try {
    const { id } = req.params;
    const campos = Object.keys(req.body);
    const valores = Object.values(req.body);

    if (campos.length === 0) return res.status(400).json({ message: "No campos para actualizar" });

    const setClause = campos.map(c => `${c} = IFNULL(?, ${c})`).join(', ');
    const [result] = await conmysql.query(
      `UPDATE liquidacion SET ${setClause} WHERE liquidacion_id = ?`,
      [...valores, id]
    );

    if (result.affectedRows <= 0) return res.status(404).json({ message: "Liquidación no encontrada" });

    const [rows] = await conmysql.query('SELECT * FROM liquidacion WHERE liquidacion_id = ?', [id]);
    global._io.emit("liquidacion_actualizada", rows[0]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteLiquidacion = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await conmysql.query('DELETE FROM liquidacion WHERE liquidacion_id = ?', [id]);

    if (rows.affectedRows <= 0) return res.status(404).json({ id: 0, message: "Liquidación no encontrada" });

    global._io.emit("liquidacion_eliminada", { liquidacion_id: parseInt(id) });
    res.status(202).json({ message: "Liquidación eliminada con éxito" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};