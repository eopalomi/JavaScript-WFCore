/*PARAMETROS*/
var p_co_ctaban = COALESCE(LS_CONPAR.co_conpar_1,''); /*DEFAULT*/
var p_co_client = COALESCE(LS_CONPAR.co_conpar_2,''); /*DEFAULT*/

// REGISTROS:
var r_co_esteva = NULLIF(LS_REGIST.co_regist_10,''); // Código de cuenta bancaria
var r_no_observ = NULLIF(LS_REGIST.co_regist_20,''); // Código de cuenta bancaria

var v_co_correo = USUARI.no_correo;

if ( r_co_esteva == null) {
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Seleccione estado de evaluación.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if (r_co_esteva == 'RECH' && (r_no_observ == null || r_no_observ.trim() == '')){
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ingrese detalle de observación.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else {
    // QUERYS:
    var v_tx_query = 
        "select * from mesdiner.pbmovimiento_ctaban('"+ 
        'EVA'  + "'," + // TIPO DE PROCESO
        null         + "," + // Cliente
        null         + "," + // Banco
        null         + "," + // Moneda
        null         + "," + // Número de cuenta bancaria
        null         + "," + // Código Interbancario
        USUARI.co_usuari    + "," + // Usuario
        p_co_ctaban  + ",'" + // Código cuenta bancaria para eliminar O EVALUAR
        r_co_esteva  + "','" + // Código de estado de evaluación
        r_no_observ  + "'," + // Motivo de observación de evaluación
        null         + ")"    // Clasificación
    ;
   // select * from mesdiner.pbmovimiento_ctaban('EVA', null,null ,null,null , null ,null , 6, 'RECH', 'Prueba')

    // PROCESO
    var v_va_resqry = DATA.SQL('wfacr', v_tx_query, 10);  // ELIMINAR CTA BANCARIA

    // MENSAJE DE VALIDACIÓN
    v_va_resqry = v_va_resqry.result[0];

    if (v_va_resqry.co_estado == '00') {
        // MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_SUCCESS, 'CORRECTO', "El registro de evaluación se registró correctamente.");
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_SUCCESS, no_title:'<center><b>CORRECTO</b></center>', no_body:'Se evaluó correctamente.', co_conten:CO_CONTEN, ca_timeout: 5});

        /*var v_tx_correo = 
            "select * from mesdiner.pbenviar_correo('1','B','jesus.baldeon@gmail.com')";*/
    } else if (v_va_resqry.co_estado == '99') {
        //MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_ERROR,'ALERTA',"Ha ocurrido un problema al realizar el registro.");
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_ERROR, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ha ocurrido un problema al realizar el registro', co_conten:CO_CONTEN, ca_timeout: 5});
        return OK('NONE', null, null, null);
    };

};

