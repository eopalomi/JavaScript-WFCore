/*PARAMETROS*/
var p_fe_asient = COALESCE(LS_CONPAR.co_conpar_1,'');
arrayBloquePago =[];

if (CO_PAGBOT == 1 || CO_PAGBOT == 2) {
    if (CO_PAGBOT == 1) {
        var v_co_estpag = 2; // 2 -> PAGADO
    } else {
        var v_co_estpag = 3; // 3 -> ANULADO
    };

    for each(var row in LS_ALLREG){
        if (row.co_regist_120 == true) { // ¿Esta Seleccionado?
            var r_co_blopag = NULLIF(row.co_regist_20, ''); // CÓDIGO DE BLOQUE

            var ObjetoEntreg = new Object();
            ObjetoEntreg["codigoBloquePago"] = r_co_blopag;

            arrayBloquePago.push(ObjetoEntreg);
        }
    }

    var query = "select 1 from pagos.pbblopag_actualizar('" + JSON.stringify(arrayBloquePago) + "', " + v_co_estpag + ")";
    var v_de_detall = DATA.SQL('wfacr', query, 10);

    MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_SUCCESS,'ALERTA','OK', CO_CONTEN, true);
} else if (CO_PAGBOT == 3) {
    var r_co_blopag  = NULLIF(LS_REGIST.co_regist_20, ''); // CÓDIGO DE BLOQUE
    
    return OK2([{no_action:'OPENPOPUP', ur_popup:'wf?co_conten=8190&co_conpar_3=' + r_co_blopag}]);
}

