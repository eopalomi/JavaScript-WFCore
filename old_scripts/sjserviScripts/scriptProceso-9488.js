//PARAMETROS
var p_co_client = COALESCE(LS_CONPAR.co_conpar_1,'');

var r_nu_docume = NULLIF(LS_REGIST.co_regist_10,''); // Numero de documento
var r_no_apepat = NULLIF(LS_REGIST.co_regist_20,''); // Razon Social
var r_no_apemat = NULLIF(LS_REGIST.co_regist_30,''); // Razon Social
var r_no_nombre = NULLIF(LS_REGIST.co_regist_40,''); // Razon Social
arrayCliente =[];

//MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA',"dato: " + p_co_client);

var ObjetoCliente = new Object();
ObjetoCliente["tipoPersona"] = "N";
ObjetoCliente["numeroDocumento"] = r_nu_docume;
ObjetoCliente["apellidoPaterno"] = r_no_apepat;
ObjetoCliente["apellidoMaterno"] = r_no_apemat;
ObjetoCliente["nombres"] = r_no_nombre;
ObjetoCliente["tipoDocumento"] = "1";
ObjetoCliente["codigoNacionalidad"] = "1";
ObjetoCliente["fechaNacimiento"] = "1990-10-10";
ObjetoCliente["generoPersona"] = "M";
ObjetoCliente["estadoCivil"] = "SO";
ObjetoCliente["documentoTributario"] = "48998589";
ObjetoCliente["razonSocial"] = "";
ObjetoCliente["nombreComercial"] = "";
arrayCliente.push(ObjetoCliente);

var query = `
    select clientx.mantenedor_cliente(
        'RC',
        ${p_co_client},
        null,
        null,
        null,
        '${JSON.stringify(arrayCliente)}'
    );
`;

MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA',"query:  "+query);
var v_de_detall = DATA.SQL('wfacr', query, 10);

var pag_to_refresh = new List();
pag_to_refresh.add(9486);
pag_to_refresh.add(9487);
var ls_param=new List();

// ls_param.add( new PARAM('co_conpar_2','1'));
//return OK2([{ no_action:'POPUP',ls_params: ls_param,}]);
return OK2({no_action:'POPUP', ls_params: ls_param, ls_pagina: pag_to_refresh});


