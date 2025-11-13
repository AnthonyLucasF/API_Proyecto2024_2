import { conmysql } from "../db.js";

// GET: Ingresos with JOINs, ORDER BY lote_fecha_ingreso DESC
export const getIngresoTunel = async (req, res) => {
  try {
    const [result] = await conmysql.query(`
      SELECT c.*, 
        l.lote_codigo, l.lote_libras_remitidas,
        u.usuario_nombre, 
        pr.proveedor_nombre, 
        t.tipo_descripcion,
        cl.clase_descripcion, 
        co.color_descripcion, 
        cr.corte_descripcion, 
        ta.talla_descripcion, 
        pe.peso_descripcion,
        g.glaseo_cantidad, 
        p.presentacion_descripcion, 
        o.orden_codigo, o.orden_estado, o.orden_total_master,
        m.maquina_descripcion, 
        gr.grupo_nombre,
        ch.coche_descripcion, ch.coche_estado,
        cal.c_calidad_peso_bruto, cal.c_calidad_peso_neto, cal.c_calidad_uniformidad,
        cal.c_calidad_olor, cal.c_calidad_sabor, cal.c_calidad_observaciones,
        def.defectos_total_defectos, def.defectos_observaciones, def.defectos_acciones_correctivas
      FROM clasificacion c
      LEFT JOIN lote l ON c.lote_id = l.lote_id
      LEFT JOIN usuario u ON c.usuario_id = u.usuario_id
      LEFT JOIN proveedor pr ON c.proveedor_id = pr.proveedor_id
      LEFT JOIN tipo t ON c.tipo_id = t.tipo_id
      LEFT JOIN clase cl ON c.clase_id = cl.clase_id
      LEFT JOIN color co ON c.color_id = co.color_id
      LEFT JOIN corte cr ON c.corte_id = cr.corte_id
      LEFT JOIN talla ta ON c.talla_id = ta.talla_id
      LEFT JOIN peso pe ON c.peso_id = pe.peso_id
      LEFT JOIN glaseo g ON c.glaseo_id = g.glaseo_id
      LEFT JOIN presentacion p ON c.presentacion_id = p.presentacion_id
      LEFT JOIN orden o ON c.orden_id = o.orden_id
      LEFT JOIN maquina m ON c.maquina_id = m.maquina_id
      LEFT JOIN grupo gr ON c.grupo_id = gr.grupo_id
      LEFT JOIN coche ch ON c.coche_id = ch.coche_id
      LEFT JOIN control_calidad cal ON c.c_calidad_id = cal.c_calidad_id
      LEFT JOIN defectos def ON c.defectos_id = def.defectos_id
      ORDER BY l.lote_fecha_ingreso DESC, c.clasificacion_coche_fecha DESC
    `);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error al consultar Ingreso de Túnel" });
  }
};

// GET por ID
export const getIngresoTunelxid = async (req, res) => {
  try {
    const [result] = await conmysql.query(`
      SELECT c.*, 
        l.lote_codigo, l.lote_libras_remitidas,
        u.usuario_nombre, 
        pr.proveedor_nombre, 
        t.tipo_descripcion,
        cl.clase_descripcion, 
        co.color_descripcion, 
        cr.corte_descripcion, 
        ta.talla_descripcion, 
        pe.peso_descripcion,
        g.glaseo_cantidad, 
        p.presentacion_descripcion, 
        o.orden_codigo, o.orden_estado, o.orden_total_master,
        m.maquina_descripcion, 
        gr.grupo_nombre,
        ch.coche_descripcion, ch.coche_estado,
        cal.c_calidad_peso_bruto, cal.c_calidad_peso_neto, cal.c_calidad_uniformidad,
        cal.c_calidad_olor, cal.c_calidad_sabor, cal.c_calidad_observaciones,
        def.defectos_total_defectos, def.defectos_observaciones, def.defectos_acciones_correctivas
      FROM clasificacion c
      LEFT JOIN lote l ON c.lote_id = l.lote_id
      LEFT JOIN usuario u ON c.usuario_id = u.usuario_id
      LEFT JOIN proveedor pr ON c.proveedor_id = pr.proveedor_id
      LEFT JOIN tipo t ON c.tipo_id = t.tipo_id
      LEFT JOIN clase cl ON c.clase_id = cl.clase_id
      LEFT JOIN color co ON c.color_id = co.color_id
      LEFT JOIN corte cr ON c.corte_id = cr.corte_id
      LEFT JOIN talla ta ON c.talla_id = ta.talla_id
      LEFT JOIN peso pe ON c.peso_id = pe.peso_id
      LEFT JOIN glaseo g ON c.glaseo_id = g.glaseo_id
      LEFT JOIN presentacion p ON c.presentacion_id = p.presentacion_id
      LEFT JOIN orden o ON c.orden_id = o.orden_id
      LEFT JOIN maquina m ON c.maquina_id = m.maquina_id
      LEFT JOIN grupo gr ON c.grupo_id = gr.grupo_id
      LEFT JOIN coche ch ON c.coche_id = ch.coche_id
      LEFT JOIN control_calidad cal ON c.c_calidad_id = cal.c_calidad_id
      LEFT JOIN defectos def ON c.defectos_id = def.defectos_id
      WHERE c.clasificacion_id = ?
    `, [req.params.id]);
    if (result.length <= 0) return res.status(404).json({ clasificacion_id: 0, message: "Ingreso de Túnel no encontrado" });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: "Error del Servidor" });
  }
};

// POST: Insert, calc rendimiento, check orden cumplimiento, update coche estado
export const postIngresoTunel = async (req, res) => {
  try {
    const {
      usuario_id, orden_id, grupo_id, maquina_id, lote_id, proveedor_id, tipo_id, color_id, coche_id, clase_id, corte_id, talla_id, peso_id, glaseo_id, presentacion_id,
      clasificacion_peso_neto, clasificacion_n_cajas, clasificacion_libras_netas, clasificacion_subtotales, clasificacion_total, clasificacion_observaciones,
      c_calidad_id, defectos_id, clasificacion_coche_fecha, clasificacion_coche_hora, clasificacion_codigo,
      sobrantes_lb, basura_lb
    } = req.body;

    if (!lote_id || !orden_id || !coche_id || clasificacion_n_cajas > 330) {
      return res.status(400).json({ message: "Lote, orden, coche requeridos; max 330 cajas por coche" });
    }

    // Calc rendimiento
    const [lote] = await conmysql.query('SELECT lote_libras_remitidas FROM lote WHERE lote_id = ?', [lote_id]);
    const librasRemitidas = lote[0].lote_libras_remitidas || 0;
    const rendimiento = (librasRemitidas > 0 ? (clasificacion_libras_netas - (basura_lb || 0)) / librasRemitidas * 100 : 0).toFixed(2);
    const alerta = rendimiento < 90 ? 'Alerta: Rendimiento bajo' : '';

    const [insert] = await conmysql.query(
      `INSERT INTO clasificacion (
        usuario_id, orden_id, grupo_id, maquina_id, lote_id, proveedor_id, tipo_id, color_id, coche_id, clase_id, corte_id, talla_id, peso_id, glaseo_id, presentacion_id,
        clasificacion_peso_neto, clasificacion_n_cajas, clasificacion_libras_netas, clasificacion_subtotales, clasificacion_total, clasificacion_observaciones,
        c_calidad_id, defectos_id, clasificacion_coche_fecha, clasificacion_coche_hora, clasificacion_codigo, sobrantes_lb, basura_lb, clasificacion_rendimiento
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        usuario_id, orden_id, grupo_id, maquina_id, lote_id, proveedor_id, tipo_id, color_id, coche_id, clase_id, corte_id, talla_id, peso_id, glaseo_id, presentacion_id,
        clasificacion_peso_neto, clasificacion_n_cajas, clasificacion_libras_netas, clasificacion_subtotales, clasificacion_total, clasificacion_observaciones,
        c_calidad_id, defectos_id, clasificacion_coche_fecha, clasificacion_coche_hora, clasificacion_codigo, sobrantes_lb || 0, basura_lb || 0, rendimiento
      ]
    );

    const nuevoId = insert.insertId;
    const [nuevo] = await conmysql.query('SELECT * FROM clasificacion WHERE clasificacion_id = ?', [nuevoId]);

    // Update coche estado to 'ocupado'
    await conmysql.query('UPDATE coche SET coche_estado = "ocupado" WHERE coche_id = ?', [coche_id]);

    // Check orden cumplimiento
    const [totalEmpacado] = await conmysql.query('SELECT SUM(clasificacion_n_cajas) as total FROM clasificacion WHERE orden_id = ?', [orden_id]);
    const [orden] = await conmysql.query('SELECT orden_total_master FROM orden WHERE orden_id = ?', [orden_id]);
    if (totalEmpacado[0].total >= orden[0].orden_total_master) {
      await conmysql.query('UPDATE orden SET orden_estado = "cumplida" WHERE orden_id = ?', [orden_id]);
      global._io.emit("orden_cumplida", { orden_id });
    }

    global._io.emit("ingreso_tunel_nuevo", nuevo[0]);

    res.json({ id: nuevoId, message: "Ingreso de Túnel registrado con éxito", rendimiento, alerta });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// PUT: Update, recalc rendimiento, check cumplimiento
export const putIngresoTunel = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      usuario_id, orden_id, grupo_id, maquina_id, lote_id, proveedor_id, tipo_id, color_id, coche_id, clase_id, corte_id, talla_id, peso_id, glaseo_id, presentacion_id,
      clasificacion_peso_neto, clasificacion_n_cajas, clasificacion_libras_netas, clasificacion_subtotales, clasificacion_total, clasificacion_observaciones,
      c_calidad_id, defectos_id, clasificacion_coche_fecha, clasificacion_coche_hora, clasificacion_codigo,
      sobrantes_lb, basura_lb
    } = req.body;

    if (clasificacion_n_cajas > 330) {
      return res.status(400).json({ message: "Max 330 cajas por coche" });
    }

    // Recalc rendimiento
    const [lote] = await conmysql.query('SELECT lote_libras_remitidas FROM lote WHERE lote_id = ?', [lote_id]);
    const librasRemitidas = lote[0].lote_libras_remitidas || 0;
    const rendimiento = (librasRemitidas > 0 ? (clasificacion_libras_netas - (basura_lb || 0)) / librasRemitidas * 100 : 0).toFixed(2);
    const alerta = rendimiento < 90 ? 'Alerta: Rendimiento bajo' : '';

    const [result] = await conmysql.query(
      `UPDATE clasificacion SET 
        usuario_id=?, orden_id=?, grupo_id=?, maquina_id=?, lote_id=?, proveedor_id=?, tipo_id=?, color_id=?, coche_id=?, clase_id=?, corte_id=?, talla_id=?, peso_id=?, glaseo_id=?, presentacion_id=?,
        clasificacion_peso_neto=?, clasificacion_n_cajas=?, clasificacion_libras_netas=?, clasificacion_subtotales=?, clasificacion_total=?, clasificacion_observaciones=?,
        c_calidad_id=?, defectos_id=?, clasificacion_coche_fecha=?, clasificacion_coche_hora=?, clasificacion_codigo=?, sobrantes_lb=?, basura_lb=?, clasificacion_rendimiento=?
      WHERE clasificacion_id=?`,
      [
        usuario_id, orden_id, grupo_id, maquina_id, lote_id, proveedor_id, tipo_id, color_id, coche_id, clase_id, corte_id, talla_id, peso_id, glaseo_id, presentacion_id,
        clasificacion_peso_neto, clasificacion_n_cajas, clasificacion_libras_netas, clasificacion_subtotales, clasificacion_total, clasificacion_observaciones,
        c_calidad_id, defectos_id, clasificacion_coche_fecha, clasificacion_coche_hora, clasificacion_codigo, sobrantes_lb || 0, basura_lb || 0, rendimiento, id
      ]
    );

    if (result.affectedRows <= 0) return res.status(404).json({ message: "Ingreso de Túnel no encontrado" });

    const [rows] = await conmysql.query('SELECT * FROM clasificacion WHERE clasificacion_id = ?', [id]);
    global._io.emit("ingreso_tunel_actualizado", rows[0]);

    res.json({ message: "Ingreso de Túnel actualizado", rendimiento, alerta });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// PATCH: Partial, recalc
export const pathIngresoTunel = async (req, res) => {
  try {
    const { id } = req.params;
    const campos = Object.keys(req.body);
    const valores = Object.values(req.body);

    if (campos.length === 0) return res.status(400).json({ message: "No campos para actualizar" });

    const setClause = campos.map(c => `${c} = IFNULL(?, ${c})`).join(', ');
    const [result] = await conmysql.query(
      `UPDATE clasificacion SET ${setClause}, clasificacion_rendimiento = ? WHERE clasificacion_id = ?`,
      [...valores, 0, id]
    );

    if (result.affectedRows <= 0) return res.status(404).json({ message: "Ingreso de Túnel no encontrado" });

    const [rows] = await conmysql.query('SELECT * FROM clasificacion WHERE clasificacion_id = ?', [id]);
    global._io.emit("ingreso_tunel_actualizado", rows[0]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteIngresoTunel = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await conmysql.query('DELETE FROM clasificacion WHERE clasificacion_id = ?', [id]);

    if (rows.affectedRows <= 0) return res.status(404).json({ id: 0, message: "Ingreso de Túnel no encontrado" });

    global._io.emit("ingreso_tunel_eliminado", { clasificacion_id: parseInt(id) });
    res.status(202).json({ message: "Ingreso de Túnel eliminado con éxito" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};