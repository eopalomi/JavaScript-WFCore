/*PARAMETROS*/
var p_co_client = COALESCE(LS_CONPAR.co_conpar_1,'');

// REGISTROS:
var r_co_esteva = NULLIF(LS_REGIST.co_regist_10,''); // ESTADO
var r_no_observ = NULLIF(LS_REGIST.co_regist_20,''); // OBSERVACIÓN
/*
var v_no_correo = USUARI.no_correo;

MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_ERROR,'ALERTA',""+v_no_correo);
*/
if ( r_co_esteva == null) {
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Seleccione estado de evaluación.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if (r_co_esteva == 'B' && (r_no_observ == null || r_no_observ.trim() == '')){
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ingrese detalle de observación.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else {
    // QUERYS:
    if (CO_CONTEN == 8116){
        var v_tx_query = 
            "select * from mesdiner.pfevaluar_cliente(" +
            p_co_client  + ",'" + // Código
            r_co_esteva  + "','" + // Estado
            r_no_observ  + "')"   // Motivo de observación de evaluación
        ;
    } else {
        var v_tx_query = 
            "select * from mesdiner.pfevaluar_cliente_subger(" +
            p_co_client  + ",'" + // Código
            r_co_esteva  + "','" + // Estado
            r_no_observ  + "')"   // Motivo de observación de evaluación
        ;
    };
    // PROCESO
    var v_va_resqry = DATA.SQL('wfacr', v_tx_query, 10);  // ELIMINAR CTA BANCARIA

    // MENSAJE DE VALIDACIÓN
    v_va_resqry = v_va_resqry.result[0];

    if (v_va_resqry.co_estado == '00') {
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_SUCCESS, no_title:'<center><b>CORRECTO</b></center>', no_body:'Se registró la evaluación correctamente.', co_conten:CO_CONTEN, ca_timeout: 5});
    } else if (v_va_resqry.co_estado == '99') {
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ha ocurrido un problema al realizar el registro.', co_conten:CO_CONTEN, ca_timeout: 5});
        return OK('NONE', null, null, null);
    };
};

