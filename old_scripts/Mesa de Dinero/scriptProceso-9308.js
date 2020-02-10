var regCodOped  = NULLIF(LS_REGIST.co_regist_20,'');         // Glosa
var regConcept  = NULLIF(LS_REGIST.co_regist_40,'');         // Código de Concepto
var regArchadj  = NULLIF(LS_REGIST.co_regist_110,'');        // Glosa
var regOpecont  = NULLIF(LS_REGIST.co_regist_120,'');        // Operación Contraria
 
/*LOGICA*/
var valpagJson = new ValpagJson();

var v_co_concep = new Set([1, 2]);

if (regArchadj == null || regArchadj == 'null'){
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'No existe documento adjunto.', co_conten:CO_CONTEN, ca_timeout: 5});
	return OK('NONE', null, null, null);
} else {
    //MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_SUCCESS, no_title:'<center><b>CORRECTO</b></center>', no_body:'Se adjunto el documento correctamente.', co_conten:CO_CONTEN, ca_timeout: 5});
	var queryDatos = `
        UPDATE mesdiner.tbopedet SET 
           co_arcadj = ${regArchadj} 
        where co_opedet = ${regCodOped}
        returning co_opedet
    `;
}

var pag_to_refresh = new List();
pag_to_refresh.add(9308);

var v_va_resqry  = DATA.SQL('wfacr', queryDatos, 1);

return OK2([{no_action:'REFRESH', ls_pagina: pag_to_refresh }]);

