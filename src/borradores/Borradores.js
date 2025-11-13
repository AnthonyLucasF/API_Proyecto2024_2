// INSERT: Crear un nuevo registro
export const postDefectos =
    async (req, res) => {
        try {
            const { defectos_cabeza_roja, defectos_cabeza_naranja, defectos_cabeza_floja, defectos_hepato_reventado, defectos_corbata, defectos_deformes,
                    defectos_deshidratado_leve, defectos_deshidratado_moderado, defectos_deterioro, defectos_rojo, defectos_juvenil, defectos_flacido, 
                    defectos_mudado, defectos_mal_descabezado, defectos_mezclas_de_especies, defectos_necrosis_leve, defectos_necrosis_moderada,
                    defectos_quebrado, defectos_pequenios, defectos_melanosis, defectos_3er_segmento_separado, defectos_porcentaje_cascara,
                    defectos_porcentaje_intestino, defectos_porcentaje_sin_telon, defectos_porcentaje_falta_de_corte, defectos_porcentaje_corte_profundo,
                    defectos_porcentaje_corte_desviado, defectos_basura, defectos_total_defectos, defectos_observaciones, defectos_acciones_correctivas,
                    lote_id} = req.body;

            const [rows] = await conmysql.query(
                `INSERT INTO defectos 
                    (defectos_cabeza_roja, defectos_cabeza_naranja, defectos_cabeza_floja, defectos_hepato_reventado, defectos_corbata, defectos_deformes, 
                    defectos_deshidratado_leve, defectos_deshidratado_moderado, defectos_deterioro, defectos_rojo, defectos_juvenil, defectos_flacido, 
                    defectos_mudado, defectos_mal_descabezado, defectos_mezclas_de_especies, defectos_necrosis_leve, defectos_necrosis_moderada, 
                    defectos_quebrado, defectos_pequenios, defectos_melanosis, defectos_3er_segmento_separado, defectos_porcentaje_cascara, 
                    defectos_porcentaje_intestino, defectos_porcentaje_sin_telon, defectos_porcentaje_falta_de_corte, defectos_porcentaje_corte_profundo, 
                    defectos_porcentaje_corte_desviado, defectos_basura, defectos_total_defectos, defectos_observaciones, defectos_acciones_correctivas, 
                    lote_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [   defectos_cabeza_roja, defectos_cabeza_naranja, defectos_cabeza_floja, defectos_hepato_reventado, defectos_corbata, defectos_deformes,
                    defectos_deshidratado_leve, defectos_deshidratado_moderado, defectos_deterioro, defectos_rojo, defectos_juvenil, defectos_flacido, 
                    defectos_mudado, defectos_mal_descabezado, defectos_mezclas_de_especies, defectos_necrosis_leve, defectos_necrosis_moderada,
                    defectos_quebrado, defectos_pequenios, defectos_melanosis, defectos_3er_segmento_separado, defectos_porcentaje_cascara,
                    defectos_porcentaje_intestino, defectos_porcentaje_sin_telon, defectos_porcentaje_falta_de_corte, defectos_porcentaje_corte_profundo,
                    defectos_porcentaje_corte_desviado, defectos_basura, defectos_total_defectos, defectos_observaciones, defectos_acciones_correctivas,
                    lote_id  ]
            );

            res.json({
                id: rows.insertId,
                message: "Defectos registrada con éxito"
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };