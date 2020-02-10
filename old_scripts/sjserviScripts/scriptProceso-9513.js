var r_co_tipenv = NULLIF(LS_REGIST.co_regist_10,''); // Numero de documento
var r_co_percon = NULLIF(LS_REGIST.co_regist_20,''); // Razon Social

var query = `
    select * from sjservi.registrar_envio_correo(${r_co_percon} , 1, 'R');
`;

//MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA',"Ingrese nombre de Personal Autorizado: "+query);
var v_de_detall = DATA.SQL('wfacr', query, 10);

var xparams = new List();
xparams.add(new PARAM('co_conpar_1', r_co_tipenv));

var pag_to_refresh = new List();
pag_to_refresh.add(9512);
pag_to_refresh.add(9511);
pag_to_refresh.add(9513);

return OK2({no_action : 'REFRESH', ls_params : xparams, ls_pagina :pag_to_refresh});





