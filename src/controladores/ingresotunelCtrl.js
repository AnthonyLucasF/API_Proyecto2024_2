import { conmysql } from "../db.js";

// GET: Ingresos with JOINs, ORDER BY lote_fecha_ingreso DESC
export const getIngresoTunel = async (req, res) => {
  try {
    const [result] = await conmysql.query(`
      SELECT i.*, 
        l.lote_codigo, l.lote_libras_remitidas, l.lote_peso_promedio, l.clase_id as lote_clase_id, l.color_id as lote_color_id,
        t.tipo_descripcion as lote_tipo,
        u.usuario_nombre, 
        pr.proveedor_nombre, 
        ty.tipo_descripcion,
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
      FROM ingresotunel i
      LEFT JOIN lote l ON i.lote_id = l.lote_id
      LEFT JOIN tipo t ON l.tipo_id = t.tipo_id
      LEFT JOIN usuario u ON i.usuario_id = u.usuario_id
      LEFT JOIN proveedor pr ON i.proveedor_id = pr.proveedor_id
      LEFT JOIN tipo ty ON i.tipo_id = ty.tipo_id
      LEFT JOIN clase cl ON i.clase_id = cl.clase_id
      LEFT JOIN color co ON i.color_id = co.color_id
      LEFT JOIN corte cr ON i.corte_id = cr.corte_id
      LEFT JOIN talla ta ON i.talla_id = ta.talla_id
      LEFT JOIN peso pe ON i.peso_id = pe.peso_id
      LEFT JOIN glaseo g ON i.glaseo_id = g.glaseo_id
      LEFT JOIN presentacion p ON i.presentacion_id = p.presentacion_id
      LEFT JOIN orden o ON i.orden_id = o.orden_id
      LEFT JOIN maquina m ON i.maquina_id = m.maquina_id
      LEFT JOIN grupo gr ON i.grupo_id = gr.grupo_id
      LEFT JOIN coche ch ON i.coche_id = ch.coche_id
      LEFT JOIN control_calidad cal ON i.c_calidad_id = cal.c_calidad_id
      LEFT JOIN defectos def ON i.defectos_id = def.defectos_id
      ORDER BY i.ingresotunel_fecha DESC
    `);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET por ID with JOINs
export const getIngresoTunelxid = async (req, res) => {
  try {
    const [result] = await conmysql.query(`
      SELECT i.*, 
        l.lote_codigo, l.lote_libras_remitidas, l.lote_peso_promedio, l.clase_id as lote_clase_id, l.color_id as lote_color_id,
        t.tipo_descripcion as lote_tipo,
        u.usuario_nombre, 
        pr.proveedor_nombre, 
        ty.tipo_descripcion,
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
      FROM ingresotunel i
      LEFT JOIN lote l ON i.lote_id = l.lote_id
      LEFT JOIN tipo t ON l.tipo_id = t.tipo_id
      LEFT JOIN usuario u ON i.usuario_id = u.usuario_id
      LEFT JOIN proveedor pr ON i.proveedor_id = pr.proveedor_id
      LEFT JOIN tipo ty ON i.tipo_id = ty.tipo_id
      LEFT JOIN clase cl ON i.clase_id = cl.clase_id
      LEFT JOIN color co ON i.color_id = co.color_id
      LEFT JOIN corte cr ON i.corte_id = cr.corte_id
      LEFT JOIN talla ta ON i.talla_id = ta.talla_id
      LEFT JOIN peso pe ON i.peso_id = pe.peso_id
      LEFT JOIN glaseo g ON i.glaseo_id = g.glaseo_id
      LEFT JOIN presentacion p ON i.presentacion_id = p.presentacion_id
      LEFT JOIN orden o ON i.orden_id = o.orden_id
      LEFT JOIN maquina m ON i.maquina_id = m.maquina_id
      LEFT JOIN grupo gr ON i.grupo_id = gr.grupo_id
      LEFT JOIN coche ch ON i.coche_id = ch.coche_id
      LEFT JOIN control_calidad cal ON i.c_calidad_id = cal.c_calidad_id
      LEFT JOIN defectos def ON i.defectos_id = def.defectos_id
      WHERE i.ingresotunel_id = ?
    `, [req.params.id]);
    if (result.length <= 0) return res.status(404).json({ ingresotunel_id: 0, message: "Ingreso de Túnel no encontrado" });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST: Insert, calc rendimiento, check orden cumplimiento, update coche estado
export const postIngresoTunel = async (req, res) => {
    try {
        let {
            lote_id, usuario_id, proveedor_id, tipo_id, clase_id, color_id, corte_id, talla_id, peso_id,
            glaseo_id, presentacion_id, orden_id, maquina_id, grupo_id, coche_id, c_calidad_id, defectos_id,
            ingresotunel_peso_neto, ingresotunel_n_cajas, ingresotunel_libras_netas, ingresotunel_subtotales,
            ingresotunel_total, ingresotunel_sobrante, ingresotunel_basura, ingresotunel_rendimiento, ingresotunel_observaciones
        } = req.body;

        // (Calc as prev, but for ingresotunel fields)

        // Insert
        const ingresotunel_fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const [result] = await conmysql.query(
            'INSERT INTO ingresotunel (lote_id, usuario_id, proveedor_id, tipo_id, clase_id, color_id, corte_id, talla_id, peso_id, glaseo_id, presentacion_id, orden_id, maquina_id, grupo_id, coche_id, c_calidad_id, defectos_id, ingresotunel_fecha, ingresotunel_peso_neto, ingresotunel_n_cajas, ingresotunel_libras_netas, ingresotunel_subtotales, ingresotunel_total, ingresotunel_sobrante, ingresotunel_basura, ingresotunel_rendimiento, ingresotunel_observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [lote_id, usuario_id, proveedor_id, tipo_id, clase_id, color_id, corte_id, talla_id, peso_id, glaseo_id, presentacion_id, orden_id, maquina_id, grupo_id, coche_id, c_calidad_id, defectos_id, ingresotunel_fecha, ingresotunel_peso_neto, ingresotunel_n_cajas, ingresotunel_libras_netas, ingresotunel_subtotales, ingresotunel_total, ingresotunel_sobrante, ingresotunel_basura, ingresotunel_rendimiento, ingresotunel_observaciones]
        );

        const id = result.insertId;
        const [rows] = await conmysql.query('SELECT * FROM ingresotunel WHERE ingresotunel_id = ?', [id]);
        global._io.emit("ingreso_nuevo", rows[0]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// PUT: Update, recalc
export const putIngresoTunel = async (req, res) => {
    try {
        const { id } = req.params;
        // (Similar to post, update fields)
        const [result] = await conmysql.query(
            'UPDATE ingresotunel SET ... WHERE ingresotunel_id = ?',
            // Params
        );

        const [rows] = await conmysql.query('SELECT * FROM ingresotunel WHERE ingresotunel_id = ?', [id]);
        global._io.emit("ingreso_tunel_actualizado", rows[0]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// PATCH: Partial
export const pathIngresoTunel = async (req, res) => {
    try {
        const { id } = req.params;
        const campos = Object.keys(req.body);
        const valores = Object.values(req.body);

        const setClause = campos.map(c => `${c} = IFNULL(?, ${c})`).join(', ');
        const [result] = await conmysql.query(
            `UPDATE ingresotunel SET ${setClause} WHERE ingresotunel_id = ?`,
            [...valores, id]
        );

        const [rows] = await conmysql.query('SELECT * FROM ingresotunel WHERE ingresotunel_id = ?', [id]);
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
        const [rows] = await conmysql.query('DELETE FROM ingresotunel WHERE ingresotunel_id = ?', [id]);

        if (rows.affectedRows <= 0) return res.status(404).json({ id: 0, message: "Ingreso de Túnel no encontrado" });

        global._io.emit("ingreso_tunel_eliminado", { ingresotunel_id: parseInt(id) });
        res.status(202).json({ message: "Ingreso de Túnel eliminado con éxito" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getRendimientoLote = async (req, res) => {
  try {
    const { lote_id } = req.query;
    if (!lote_id) return res.status(400).json({ message: "lote_id required" });

    const [lote] = await conmysql.query('SELECT l.lote_peso_promedio, t.tipo_descripcion as lote_tipo, l.parent_lote_id FROM lote l LEFT JOIN tipo t ON l.tipo_id = t.tipo_id WHERE l.lote_id = ?', [lote_id]);
    if (lote.length === 0) return res.status(404).json({ message: "Lote no encontrado" });

    const promedio = lote[0].lote_peso_promedio || 0;
    const loteTipo = lote[0].lote_tipo;
    const parentId = lote[0].parent_lote_id;

    const [aggreg] = await conmysql.query('SELECT SUM(clasificacion_total) as total, SUM(clasificacion_sobrante) as sobrante, SUM(clasificacion_basura) as basura FROM clasificacion WHERE lote_id = ?', [lote_id]);
    const total = aggreg[0].total || 0;
    const sobrante = aggreg[0].sobrante || 0;
    const basura = aggreg[0].basura || 0;

    let rendimiento = 0;
    if (loteTipo.toLowerCase().includes('entero')) {
      rendimiento = promedio > 0 ? ((total - sobrante) / promedio * 100).toFixed(2) : 0;
    } else {
      let parentBasura = 0;
      if (parentId) {
        const [parentAggreg] = await conmysql.query('SELECT SUM(clasificacion_basura) as basura FROM clasificacion WHERE lote_id = ?', [parentId]);
        parentBasura = parentAggreg[0].basura || 0;
      }
      rendimiento = promedio > 0 ? (total / (promedio - parentBasura - basura) * 100).toFixed(2) : 0;
    }

    res.json({ rendimiento });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

