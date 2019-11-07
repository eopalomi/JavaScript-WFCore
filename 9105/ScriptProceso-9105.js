// VARIABLES
var tipoRequerimiento           = NULLIF(LS_REGIST.co_regist_10,''); // Tipo de Requerimiento
var asuntoRequerimiento         = NULLIF(LS_REGIST.co_regist_20,''); // Asunto del Requerimiento
var justificacionRequerimiento  = NULLIF(LS_REGIST.co_regist_30,''); // Justificacion del Requerimientos
var mensajeError;

// VALIDACION
if (tipoRequerimiento == null) {
    mensajeError = 'Seleccione Tipo de Requerimiento.';
} else if (asuntoRequerimiento == null){
    mensajeError = 'Ingrese el asunto del Requerimiento.';
} else if (justificacionRequerimiento == null){
    mensajeError = 'Ingrese la justificación del Requerimiento.';
};

// LOGICA
if (mensajeError != null) {
    MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA', mensajeError);
    return OK('NONE', null, null, null);
} else {
    
    var v_json = ('{"codigoUsuario":"'+ USUARI.co_usuari +'","tipoRequerimiento":"'+ tipoRequerimiento +'","asuntoRequerimiento":"'+ asuntoRequerimiento +'","justificacionRequerimiento":"'+ justificacionRequerimiento +'"}');
    
    var headers=new Map();
    headers.put('Content-Type','application/json');

    var params=new Map();
    params.put('p_js_requer',v_json);

    var conhtp = HTTP.POST('http://192.168.55.218:3000/api/logisticas/consulta', headers, params, 1);
    MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA', conhtp.error.message);
    print('conhtp:'+ conhtp);
    print('conhtp.result:'+ conhtp.result);
    print('conhtp.result.:'+ conhtp.result);

    /*
        var queryInsertRequerimiento =  
        'INSERT INTO wflogist.tbrequer (id_requer, us_regist, co_tipreq, no_asunto, no_justif, co_estado)' +
        'VALUES (DEFAULT,' + USUARI.co_usuari + ',' + tipoRequerimiento + ',' + asuntoRequerimiento + ', ' + justificacionRequerimiento + ', default) RETURNING id_requer;'
        var resultInsertRequerimiento = DATA.SQL('wfacr',queryInsertRequerimiento, 1);
    */

    
    //MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA', resultInsertRequerimiento.error)
};

// PAGINAS REFRESCAR
var pag_to_refresh = new List();
pag_to_refresh.add(9105);

// PARAMETROS
var xparams = new List();
xparams.add(new PARAM('co_conpar_1', tipoRequerimiento));

// ENVIAR PARAMETROS

/*
return OK2({
    no_action : 'OPENPOPUP',
    ur_popup  : 'wf?co_conten=20020'
    
    ls_params : xparams, 
    ls_pagina : pag_to_refresh
});
*/

return OK2([
    /*{no_action:'DOWNLOAD',  ur_archiv : HTTP.URL(zip)},*/
    {no_action:'OPENPOPUP', ur_popup  : 'wf?co_conten=20042'}
]);

