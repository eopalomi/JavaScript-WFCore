//PARAMETROS
var p_id_posven = COALESCE(LS_CONPAR.co_conpar_1,'');

var r_fe_procit = NULLIF(LS_REGIST.co_regist_10,''); // fecha
var r_no_coment = NULLIF(LS_REGIST.co_regist_20,''); // comentario

MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA',"Ingrese nombre de Personal Autorizado: "+CO_PAGBOT);

if (CO_PAGBOT == 1){
    var query = `select 1 from sjservi.registrar_posventa(${p_id_posven},'${r_no_coment}','${r_fe_procit}')`;

    MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA',"Ingrese nombre de Personal Autorizado: "+query);
    var v_de_detall = DATA.SQL('wfacr', query, 10);

    var pag_to_refresh = new List();
    pag_to_refresh.add(9501);
    pag_to_refresh.add(9500);

    var ls_param=new List();
    ls_param.add(new PARAM('co_conpar_1', p_id_posven)); // 

    return OK2({no_action : 'REFRESH', ls_params : ls_param, ls_pagina :pag_to_refresh});
}
else {
    var ls_param=new List();
    var pag_to_refresh = new List();
	pag_to_refresh.add(9499);
    return OK2({no_action:'POPUP', ls_params: ls_param, ls_pagina: pag_to_refresh});
}

