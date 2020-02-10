var query = `
    select * from sjservi.registrar_envio_correo(null, null, 'E');
`;
//MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA',"Ingrese nombre de Personal Autorizado: "+query);
var v_de_detall = DATA.SQL('wfacr', query, 10);

var pag_to_refresh = new List();
pag_to_refresh.add(9513);
pag_to_refresh.add(9512);
pag_to_refresh.add(9511);

var xparams = new List();
xparams.add(new PARAM('co_conpar_1', null));

return OK2({no_action : 'REFRESH', ls_params : xparams, ls_pagina :pag_to_refresh});




