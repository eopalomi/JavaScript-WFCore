// REGISTROS:
var r_co_ctaban = NULLIF(LS_REGIST.co_regist_20,''); // Código de cuenta bancaria

// QUERYS:
var v_tx_query = 
    "select * from mesdiner.pbmovimiento_ctaban('"+ 
        'ELI'  + "'," + // TIPO DE PROCESO
        null         + "," + // Cliente
        null         + "," + // Banco
        null         + "," + // Moneda
        null         + "," + // Número de cuenta bancaria
        null         + "," + // Código Interbancario
        USUARI.co_usuari    + "," + // Usuario
        r_co_ctaban  + "," + // Código cuenta bancaria para eliminar
        null         + "," + // Código de estado de evaluación
        null         + "," + // Motivo de observación de evaluación
        null         + ")"    // Clasificación
;

// PROCESO
var v_va_resqry = DATA.SQL('wfacr', v_tx_query, 10);  // ELIMINAR CTA BANCARIA

// MENSAJE DE CONFIRMACION AL USUARIO
v_va_resqry = v_va_resqry.result[0];

if(v_va_resqry.co_estado == '00'){
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_SUCCESS, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'El registro se eliminó correctamente.', co_conten:CO_CONTEN, ca_timeout: 5});
}else{
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_ERROR, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ha ocurrido un problema al realizar el registro.', co_conten:CO_CONTEN, ca_timeout: 5});
};

var pag_to_refresh = new List();
pag_to_refresh.add(9213);

return OK('REFRESH', null, null, pag_to_refresh);
