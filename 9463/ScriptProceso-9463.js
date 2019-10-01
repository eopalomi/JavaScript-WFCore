/* PARAMETROS*/ 
var p_nu_entreg = COALESCE(LS_CONPAR.co_conpar_1,null);
var p_co_entreg = COALESCE(LS_CONPAR.co_conpar_2,null);
arrayDestinatario =[];

/*REGISTROS*/
var r_co_entdet = NULLIF(LS_REGIST.co_regist_10,''); // Código
var r_nu_docide = NULLIF(LS_REGIST.co_regist_20,''); // Número de Documento de Indentidad
var r_no_person = NULLIF(LS_REGIST.co_regist_30,''); // Nombres y Apellidos
var r_co_bancos = NULLIF(LS_REGIST.co_regist_40,''); // Banco
var r_nu_cueban = NULLIF(LS_REGIST.co_regist_50,''); // Cuenta bancaria
var r_im_totabo = NULLIF(LS_REGIST.co_regist_60, 0); // Importe

    //MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA','HOLA');

 var ObjetoDestinatario = new Object();
    	ObjetoDestinatario["codigoBanco"] = r_co_bancos;
    	ObjetoDestinatario["numeroCtaAbono"] = r_nu_cueban;
    	ObjetoDestinatario["nombrePersonal"] = r_no_person;
    	ObjetoDestinatario["numeroDocumento"] = r_nu_docide;
    	ObjetoDestinatario["importeAbono"] = r_im_totabo;
	arrayDestinatario.push(ObjetoDestinatario);
    
    var query = "select 1 from pagos.pbbenpag_actualizar(3,'" + p_nu_entreg + "', 'E', '" + JSON.stringify(arrayDestinatario) + "')";

	var v_de_detall = DATA.SQL('wfacr', query, 10);

var pag_to_refresh = new List();
pag_to_refresh.add(9463);
pag_to_refresh.add(9437);
pag_to_refresh.add(9462);

var xparams = new List();
xparams.add(new PARAM('co_conpar_1', p_nu_entreg));
xparams.add(new PARAM('co_conpar_2', p_co_entreg)); // Tipo de Documento

//return OK('REFRESH', null, xparams, pag_to_refresh);
return OK2({no_action : 'REFRESH', 
            ls_params : xparams, 
            ls_pagina :pag_to_refresh});