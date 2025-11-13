import { conmysql } from "../db.js";

// GET: Todos with JOIN talla, calc pendientes (sum clasificacion_libras_netas)
export const getOrden = async (req, res) => {
  try {
    const [result] = await conmysql.query(`
      SELECT o.*, t.talla_descripcion,
        (o.orden_total_libras - IFNULL((SELECT SUM(c.clasificacion_libras_netas) FROM clasificacion c WHERE c.orden_id = o.orden_id), 0)) as orden_libras_pendientes
      FROM orden o
      LEFT JOIN talla t ON o.talla_id = t.talla_id
      ORDER BY o.orden_fecha_produccion DESC
    `);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error al consultar Órdenes" });
  }
};

// GET por ID with pendientes
export const getOrdenxid = async (req, res) => {
  try {
    const [result] = await conmysql.query(`
      SELECT o.*, t.talla_descripcion,
        (o.orden_total_libras - IFNULL((SELECT SUM(c.clasificacion_libras_netas) FROM clasificacion c WHERE c.orden_id = o.orden_id), 0)) as orden_libras_pendientes
      FROM orden o
      LEFT JOIN talla t ON o.talla_id = t.talla_id
      WHERE o.orden_id = ?
    `, [req.params.id]);
    if (result.length <= 0) return res.status(404).json({ orden_id: 0, message: "Orden no encontrada" });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: "Error del Servidor" });
  }
};

// GET pendientes por talla (para filtro en empaque)
export const getOrdenesPendientes = async (req, res) => {
  try {
    const { talla_id } = req.query;
    if (!talla_id) return res.status(400).json({ message: "talla_id required" });

    const [result] = await conmysql.query(`
      SELECT o.*, t.talla_descripcion,
        (o.orden_total_libras - IFNULL((SELECT SUM(c.clasificacion_libras_netas) FROM clasificacion c WHERE c.orden_id = o.orden_id), 0)) as orden_libras_pendientes
      FROM orden o
      LEFT JOIN talla t ON o.talla_id = t.talla_id
      WHERE o.talla_id = ? AND o.orden_estado = 'pendiente'
      GROUP BY o.orden_id
      HAVING orden_libras_pendientes > 0
      ORDER BY o.orden_fecha_produccion ASC  // Antigua primero para secuencial
    `, [talla_id]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST: Set pendientes = total_libras, estado 'pendiente'
export const postOrden = async (req, res) => {
  try {
    const { orden_codigo, orden_descripcion, orden_cliente, orden_lote_cliente, orden_fecha_produccion, orden_fecha_juliana, orden_talla_real, orden_talla_marcada, orden_microlote, orden_total_master, orden_total_libras, talla_id } = req.body;
    const orden_libras_pendientes = orden_total_libras;

    const [rows] = await conmysql.query(
      'INSERT INTO orden (orden_codigo, orden_descripcion, orden_cliente, orden_lote_cliente, orden_fecha_produccion, orden_fecha_juliana, orden_talla_real, orden_talla_marcada, orden_microlote, orden_total_master, orden_total_libras, orden_libras_pendientes, talla_id, orden_estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [orden_codigo, orden_descripcion, orden_cliente, orden_lote_cliente, orden_fecha_produccion, orden_fecha_juliana, orden_talla_real, orden_talla_marcada, orden_microlote, orden_total_master, orden_total_libras, orden_libras_pendientes, talla_id, 'pendiente']
    );

    const [nueva] = await conmysql.query('SELECT * FROM orden WHERE orden_id = ?', [rows.insertId]);
    global._io.emit("orden_nueva", nueva[0]);
    res.json(nueva[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// PUT: Recalc pendientes if total_libras changes
export const putOrden = async (req, res) => {
  try {
    const { id } = req.params;
    const { orden_codigo, orden_descripcion, orden_cliente, orden_lote_cliente, orden_fecha_produccion, orden_fecha_juliana, orden_talla_real, orden_talla_marcada, orden_microlote, orden_total_master, orden_total_libras, talla_id } = req.body;

    // Calc new pendientes: total - empacadas actuales
    const empacadas = await getEmpacadas(id);
    const orden_libras_pendientes = orden_total_libras - empacadas;

    const [result] = await conmysql.query(
      'UPDATE orden SET orden_codigo = ?, orden_descripcion = ?, orden_cliente = ?, orden_lote_cliente = ?, orden_fecha_produccion = ?, orden_fecha_juliana = ?, orden_talla_real = ?, orden_talla_marcada = ?, orden_microlote = ?, orden_total_master = ?, orden_total_libras = ?, orden_libras_pendientes = ?, talla_id = ? WHERE orden_id = ?',
      [orden_codigo, orden_descripcion, orden_cliente, orden_lote_cliente, orden_fecha_produccion, orden_fecha_juliana, orden_talla_real, orden_talla_marcada, orden_microlote, orden_total_master, orden_total_libras, orden_libras_pendientes, talla_id, id]
    );

    if (result.affectedRows <= 0) return res.status(404).json({ message: "Orden no encontrada" });

    const [rows] = await conmysql.query('SELECT * FROM orden WHERE orden_id = ?', [id]);
    global._io.emit("orden_actualizada", rows[0]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteOrden = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await conmysql.query('DELETE FROM orden WHERE orden_id = ?', [id]);

    if (rows.affectedRows <= 0) return res.status(404).json({ id: 0, message: "Orden no encontrada" });

    global._io.emit("orden_eliminada", { orden_id: parseInt(id) });
    res.status(202).json({ message: "Orden eliminada con éxito" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Helper: Sum clasificacion_libras_netas for orden
async function getEmpacadas(orden_id) {
  const [sum] = await conmysql.query('SELECT SUM(clasificacion_libras_netas) as empacadas FROM clasificacion WHERE orden_id = ?', [orden_id]);
  return sum[0].empacadas || 0;
}