//PARAMETROS
var p_js_detreq = COALESCE(LS_CONPAR.co_conpar_1,'');
p_js_detreq = build_json(p_js_detreq);

//REGISTROS
var r_ti_requer = NULLIF(LS_REGIST.co_regist_100,''); // Tipo de Requerimiento
var r_as_asunto = NULLIF(LS_REGIST.co_regist_110,''); // Asunto
var r_ju_justif = NULLIF(LS_REGIST.co_regist_120,''); // Justificacion
var r_co_articu = NULLIF(LS_REGIST.co_regist_210,''); // Codigo de Articulo
var r_no_cantid = NULLIF(LS_REGIST.co_regist_230,''); // Cantidad
var r_co_tippri = NULLIF(LS_REGIST.co_regist_220,''); // Codigo Tipo Prioridad

jsonRequerimientos = {};
jsonDetalleRequerimientos = {};
var arrayDetalleRequer = new List();

if(CO_PAGBOT == 10){ // ES PARA REGISTRAR UN REQUERIMIENTO  
    jsonRequerimientos['codigoUsuario'] = USUARI.co_usuari;
    jsonRequerimientos['tipoRequerimiento']     = r_ti_requer;
    jsonRequerimientos['asuntoRequerimiento']     = r_as_asunto;
    jsonRequerimientos['justificacionRequerimiento']     = r_ju_justif;  
    
    var queryreq = DATA.SQL({
        no_conexi: `wfacr`,
        no_consul: `
            SELECT 1 FROM wflogist.registrar_requerimiento(
               'R', 
               null,
               '${JSON.stringify(jsonRequerimientos)}',
               '${JSON.stringify(p_js_detreq)}'   
            );
        `,
        sg_timout:5
    });
   
    var ls_param = new List();
    var pag_to_refresh = new List();
    pag_to_refresh.add(9106); 
    
    return OK2({no_action:'POPUP', ls_params: ls_param, ls_pagina: pag_to_refresh});
    //MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_ERROR, no_title:'DATO:', no_body:"AQUI A: " + CO_PAGBOT, co_conten:8026, ca_timeout: 50});
}else if(CO_PAGBOT == 20){ // PARA REGISTRAR CADA ARTICULO PARA UN REQUERIMIENTO
    if (p_js_detreq != null) {
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_ERROR, no_title:'DATO:', no_body:"objParametro: " + JSON.stringify(p_js_detreq), co_conten:8026, ca_timeout: 50});

        var objnuevo = new Object();
        objnuevo['codigoArticulo']   = r_co_articu;
        objnuevo['cantidadArticulo'] = r_no_cantid;
        objnuevo['codigoPrioridad']  = r_co_tippri;

        //BLOQUE A MEJORAR
        var p_js_detreq2 = new List(); 
        p_js_detreq2.add(objnuevo);

        for each(var param in p_js_detreq){
            p_js_detreq2.add(param);
        };

        var ls_param =new List();

        ls_param.add(new PARAM('co_conpar_1', p_js_detreq2));
    }else {
		p_js_detreq = new List();
        var objetoDetalleRequerimiento = new Object();
        objetoDetalleRequerimiento['codigoArticulo']   = r_co_articu;
        objetoDetalleRequerimiento['cantidadArticulo'] = r_no_cantid;
        objetoDetalleRequerimiento['codigoPrioridad']  = r_co_tippri;
        
        p_js_detreq.add(objetoDetalleRequerimiento);

        var ls_param =new List();
        ls_param.add(new PARAM('co_conpar_1', p_js_detreq));
    };
 
    var pag_to_refresh = new List();
    pag_to_refresh.add(21090); 
    pag_to_refresh.add(21089);
    
    return OK2([{no_action:'REFRESH', ls_pagina: pag_to_refresh, ls_params: ls_param}]);
}




