/* PARAMETROS*/ 
var p_nu_entreg = COALESCE(LS_CONPAR.co_conpar_1,null);
var p_co_entreg = COALESCE(LS_CONPAR.co_conpar_2,null);
arrayDestinatario =[];

/*REGISTROS*/
var r_co_tipdoc = NULLIF(LS_REGIST.co_regist_10,''); // tipo de documento
var r_nu_docume = NULLIF(LS_REGIST.co_regist_20,''); // Numero de documento
var r_no_nombre = NULLIF(LS_REGIST.co_regist_30,''); // Nombre
var r_co_bancos = NULLIF(LS_REGIST.co_regist_40,''); // Banco
var r_nu_ctaban = NULLIF(LS_REGIST.co_regist_50,''); // Cuenta bancaria
var r_im_entreg = NULLIF(LS_REGIST.co_regist_60,0); // Importe

if (CO_PAGBOT == 1) {
var v_tx_query = 
	"select "+
         "(case when et.co_moneda = 604 then et.im_entreg else et.im_entregdol end) im_totale, et.im_entreg, et.im_entregdol "+
      "from pagos.tbpagentreg et "+
      "where co_estpag = 1 " +
	  "and et.nu_entreg = " + p_nu_entreg 
;
var v_va_resqry = DATA.SQL('wfacr', v_tx_query, 30).result[0];

var v_tx_pagentdet = 
	"select coalesce(sum(im_totabo), 0) im_totabo from pagos.tbpagentdet where co_entreg =  " + p_co_entreg 
;
var v_va_pagentdet = DATA.SQL('wfacr', v_tx_pagentdet, 30).result[0];
var v_im_totdet = v_va_pagentdet.im_totabo + r_im_entreg;

if (r_co_tipdoc == null){
    MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA','Seleccione Tipo de Documento.');
    return OK('NONE', null, null, null);
} else if (r_nu_docume == null || r_nu_docume.trim() == ''){
    MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA','Ingrese Número de Documento.');
    return OK('NONE', null, null, null);
} else if (r_im_entreg == null || r_im_entreg.trim() == '' || r_im_entreg == 0){
    MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA','Ingrese importe.');
    return OK('NONE', null, null, null);
/*} else if (r_im_entreg > v_va_resqry.im_totale){
    MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA','Importe es mayor a lo permitido');
    return OK('NONE', null, null, null);
} else if (v_im_totdet > v_va_resqry.im_totale){
    MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA','Suma de Importes es mayor a lo permitido');
    return OK('NONE', null, null, null);*/
} else {
    
    var ObjetoDestinatario = new Object();
    	ObjetoDestinatario["codigoBanco"] = r_co_bancos;
    	ObjetoDestinatario["numeroCtaAbono"] = r_nu_ctaban;
    	ObjetoDestinatario["nombrePersonal"] = r_no_nombre.toUpperCase();
    	ObjetoDestinatario["numeroDocumento"] = r_nu_docume;
    	ObjetoDestinatario["importeAbono"] = r_im_entreg;
	arrayDestinatario.push(ObjetoDestinatario);
    
    var query = "select 1 from pagos.pbactualizar_cuentas_entregas(3,'" + p_nu_entreg + "', 'A', '" + JSON.stringify(arrayDestinatario) + "')";
	var v_de_detall = DATA.SQL('wfacr', query, 10);
}


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
} else if (CO_PAGBOT == 2) {
	var ls_param=new List();
    
    var pag_to_refresh = new List();
	pag_to_refresh.add(9432);
    
    // ls_param.add( new PARAM('co_conpar_2','1'));
    //return OK2([{ no_action:'POPUP',ls_params: ls_param,}]);
    return OK2({no_action:'POPUP', ls_params: ls_param, ls_pagina: pag_to_refresh});
}