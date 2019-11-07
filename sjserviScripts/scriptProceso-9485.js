//PARAMETROS
var p_co_client = COALESCE(LS_CONPAR.co_conpar_1,'');

// REGISTROS
var r_fe_requer = NULLIF(LS_REGIST.co_regist_10,''); 
var r_no_client = NULLIF(LS_REGIST.co_regist_20,''); 
var r_no_contac = NULLIF(LS_REGIST.co_regist_30,''); 
var r_no_direcc = NULLIF(LS_REGIST.co_regist_35,''); 
var r_no_asunto = NULLIF(LS_REGIST.co_regist_38,''); 
var r_no_descri = NULLIF(LS_REGIST.co_regist_40,'');
var r_no_detall = NULLIF(LS_REGIST.co_regist_50,''); 

//QUERY
var query = `
    select sjservi.registrar_requerimiento_cotizacion(
        '${r_no_detall}',
        '${r_fe_requer}',
         ${p_co_client}
     )
`;

if(r_fe_requer == null) {
    MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_ERROR, 'ALERTA', 'Seleccione la Fecha de Requerimiento');
    return OK('NONE', null, null, null);
} else if (r_no_contac == null) {
    MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_ERROR, 'ALERTA', 'Seleccione el contacto.');
    return OK('NONE', null, null, null);
} else if (r_no_direcc == null) {
    MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_ERROR, 'ALERTA', 'Seleccione la direccion.');
    return OK('NONE', null, null, null);
}else if (r_no_asunto == null) {
    MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_ERROR, 'ALERTA', 'Ingrese el asunto.');
    return OK('NONE', null, null, null);
}else if (r_no_descri == null) {
    MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_ERROR, 'ALERTA', 'Ingrese la descripcion.');
    return OK('NONE', null, null, null);
};

//MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_ERROR,'ALERTA',"= "+query);
var v_de_detall = DATA.SQL('wfacr', query, 10);
var v_ca_reqhoy = DATA.SQL('wfacr', `select count(*) as ca_reqhoy from sjservi.listar_requerimiento_cotizacion('', '', '') where id_client =${p_co_client};`, 10).result[0];
MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_SUCCESS,'ALERTA',"El registro se realizo correctamente" );

if (v_ca_reqhoy.ca_reqhoy > 0){
    MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_ERROR,'ALERTA',"El cliente ya tiene registrado otro requerimiento hoy. (CANTIDAD: " + v_ca_reqhoy.ca_reqhoy + ")" );
};

var pag_to_refresh = new List();
pag_to_refresh.add(9483);
pag_to_refresh.add(9485);

//var xparams = new List();
//xparams.add(new PARAM('co_conpar_1', p_co_client));

return OK2({no_action:'REDIRECT', co_condes: 8196});
//return OK('REFRESH', null, null, pag_to_refresh);

