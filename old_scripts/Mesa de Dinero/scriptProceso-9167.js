// PARAMETROS
var p_co_client = COALESCE(LS_CONPAR.co_conpar_1,'');

var v_result = '11';
// PROCESO

if (CO_PAGBOT == 1) {
    
    for each(var row in LS_ALLREG) {
        var v_30 = row.co_regist_30;
        v_30 = v_30.length;
        
        if (v_30 > 0 ) {
            var r_co_docume = NULLIF(row.co_regist_10,'');
            var r_co_arcadj = NULLIF(row.co_regist_30,'');
    
            var v_tx_query1 = "select * from mesdiner.pbregistrar_doc(" +
                p_co_client + "," +
                r_co_docume + "," +
                r_co_arcadj + "," +
                USUARI.co_usuari + ")";       

            var v_va_query1 = DATA.SQL('wfacr', v_tx_query1, 10).result[0]; 
			v_result = v_va_query1.co_estado;
        };
    };
    	

    if (v_result == '00'){
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_SUCCESS, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Documento actualizado correctamente.', co_conten:CO_CONTEN, ca_timeout: 5});
    } else if (v_result == '99'){
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ha ocurrido un problema.', co_conten:CO_CONTEN, ca_timeout: 5});
        return OK('NONE', null, null, null); 
    } else if (v_result == '11'){
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ingrese documento para actualizar.', co_conten:CO_CONTEN, ca_timeout: 5});
        return OK('NONE', null, null, null); 
    };

    var pag_to_refresh = new List();
    pag_to_refresh.add(9167);
    pag_to_refresh.add(9222);
  	var xparams = new List();
 	xparams.add(new PARAM('co_conpar_1', p_co_client));

    //return OK('REFRESH', null, xparams, pag_to_refresh);
    return OK2({no_action : 'REFRESH', 
                ls_params : xparams, 
                ls_pagina :pag_to_refresh});
    
} else if (CO_PAGBOT == 2){
    var v_tx_lisdoc = "select * from mesdiner.dtlistcdocume(" + p_co_client + ")";
    var v_va_lisdoc = DATA.SQL('wfacr', v_tx_lisdoc, 10); 

    var v_co_catdoc = '';

    for each (var rs in v_va_lisdoc.result){
        if (v_co_catdoc == ''){
            v_co_catdoc = rs.co_catdoc;
        } else {
            v_co_catdoc = rs.co_catdoc +','+v_co_catdoc;
        };
    };
    var data1 = DATA.SQL("wfacr", "select * from mesdiner.pblistdocume_cliente(" + p_co_client  +")", 10);

    var v_va_catdoc = '';

    for each (var dt in data1.result){
        if (v_va_catdoc == ''){
            v_va_catdoc = dt.co_catdoc;
        } else {
            v_va_catdoc = dt.co_catdoc +','+v_va_catdoc;
        };
    };

    if (v_co_catdoc != v_va_catdoc){
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Falta registrar más documentos del cliente.', co_conten:CO_CONTEN, ca_timeout: 5});
        return OK('NONE', null, null, null); 
    };
}

