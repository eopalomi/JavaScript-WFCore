
//PARAMETROS
var p_co_client = COALESCE(LS_CONPAR.co_conpar_1,'');

var r_co_depart = NULLIF(LS_REGIST.co_regist_10,''); // Departamento
var r_co_provin = NULLIF(LS_REGIST.co_regist_20,''); // Provincia
var r_co_distri = NULLIF(LS_REGIST.co_regist_30,''); // Distrito
var r_no_direcc = NULLIF(LS_REGIST.co_regist_40,''); // Direccion
arrayDirección =[];

//MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA',"dato: " + p_co_client);

var ObjetoDireccion = new Object();
ObjetoDireccion["codigoUbigeo"] = r_co_distri;
ObjetoDireccion["direccion"] = r_no_direcc;
arrayDirección.push(ObjetoDireccion);

var query = `
    select * from  clientx.mantenedor_cliente(
        'RD',
        ${p_co_client},
        null,
        '${JSON.stringify(arrayDirección)}',
        null,
        null
     );
`;

MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA',"Ingrese nombre de Personal Autorizado: "+query);
var v_de_detall = DATA.SQL('wfacr', query, 10);

var pag_to_refresh = new List();
pag_to_refresh.add(9486);
pag_to_refresh.add(9487);
var ls_param=new List();

return OK2({no_action:'POPUP', ls_params: ls_param, ls_pagina: pag_to_refresh});


