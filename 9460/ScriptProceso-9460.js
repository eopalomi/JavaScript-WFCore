/*PARAMETROS*/
var p_fe_asient = COALESCE(LS_CONPAR.co_conpar_1,'');
var p_id_blopag = COALESCE(LS_CONPAR.co_conpar_2,'');
arrayBloquePago =[];

if (CO_PAGBOT == 1) {
	var v_co_estpag = 1;
} else {
	var v_co_estpag = 2;
};

//LOGICA
for each(var row in LS_ALLREG){
    if (row.co_regist_210 == true) {// ¿Esta Seleccionado?
        var r_co_entdet = NULLIF(row.co_regist_20, ''); // Código de detalle de entrega a rendir
        
        var ObjetoEntreg = new Object();
        ObjetoEntreg["codigoAbono"] = r_co_entdet;

        arrayBloquePago.push(ObjetoEntreg);

    }
}

//var query = "select 1 from pagos.pbactualiza_blopag_entrega('" + JSON.stringify(arrayBloquePago) + "')";
var query = "select 1 from pagos.pbblopag_detalle_actualizar('" + JSON.stringify(arrayBloquePago) + "')";
var v_de_detall = DATA.SQL('wfacr', query, 10);

var pag_to_refresh = new List();
pag_to_refresh.add(9459);
pag_to_refresh.add(9460);

var xparams = new List();
xparams.add(new PARAM('co_conpar_1', p_fe_asient));
xparams.add(new PARAM('co_conpar_2', p_id_blopag)); // Código de Bloque Inicial

//return OK('REFRESH', null, xparams, pag_to_refresh);
return OK2({no_action : 'REFRESH', 
            ls_params : xparams, 
            ls_pagina :pag_to_refresh});


