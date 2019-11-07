// REGISTROS:
var r_co_peraut = NULLIF(LS_REGIST.co_regist_20,''); // Código de cuenta bancaria

// QUERYS:
var v_tx_query = 
    "select * from mesdiner.pbmovimiento_personas_autorizadas(" + 
    null         + "," + // Cliente
    null         + "," + // Nombre y Apellidos
    null         + "," + // DNI
    null         + "," + // Cargo
    null         + "," + // Teléfono
    null         + "," + // E-mail
    null         + "," + // Usuario Registrante
    r_co_peraut + ")"    // Ubigeo
;

// PROCESO
var v_va_resqry = DATA.SQL('wfacr', v_tx_query, 10);  // ELIMINAR CTA BANCARIA

// DATOS DE RESPUESTA

  // MENSAJE DE VALIDACIÓN
v_va_resqry = v_va_resqry.result[0];

if(v_va_resqry.co_estado == '00'){
    //MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_SUCCESS, 'CORRECTO', "El registro se eliminó correctamente.");
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_SUCCESS, no_title:'<center><b>CORRECTO</b></center>', no_body:'El registro se eliminó correctamente', co_conten:CO_CONTEN, ca_timeout: 5});
}else{
    //MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_ERROR,'ALERTA',"Ha ocurrido un problema al realizar el registro.");
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_ERROR, no_title:'<center><b>ALERTA</b></center>', no_body:'Ha ocurrido un problema al realizar el registro', co_conten:CO_CONTEN, ca_timeout: 5});
};

var pag_to_refresh = new List();
pag_to_refresh.add(9224);
return OK('REFRESH', null, null, pag_to_refresh);






