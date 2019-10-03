//PARAMETROS
var p_id_tippag = COALESCE(LS_CONPAR.co_conpar_1,'');
var p_id_blopag = COALESCE(LS_CONPAR.co_conpar_2,'');

//VARIABLES
arrayBloquePago =[];

//LOGICA
LS_ALLREG.forEach(function(row){
    if (row.co_regist_170 == true) {                    // ¿Esta Seleccionado?
        var r_co_entdet = NULLIF(row.co_regist_20, ''); // Código de detalle de entrega a rendir
        
        var ObjetoEntreg = new Object();
        ObjetoEntreg["codigoAbono"] = r_co_entdet;
        arrayBloquePago.push(ObjetoEntreg);
    }
});

var v_rs_query = DATA.SQL('wfacr', `select 1 from pagos.pbactualiza_blopag_detalle('${JSON.stringify(arrayBloquePago)}')`, 10);

var pag_to_refresh = new List();
pag_to_refresh.add(9459);
pag_to_refresh.add(9470);

return OK2({
    no_action : 'REFRESH',
    ls_pagina :pag_to_refresh
});


