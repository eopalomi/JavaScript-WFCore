// VARIABLES
var fecha = new Date();
var diaUno = '1/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear();
var diaHoy = fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear();
var pag_to_refresh = new List();

// REGISTROS
var r_co_bancos = NULLIF(LS_REGIST.co_regist_10,''); // Banco
var r_co_moneda = NULLIF(LS_REGIST.co_regist_20,''); // Moneda
var r_co_filtro = NULLIF(LS_REGIST.co_regist_30,''); // Filtro
var r_fe_inicio = NULLIF(LS_REGIST.co_regist_40,''); // fecha inicial
var r_fe_finale = NULLIF(LS_REGIST.co_regist_50,''); // Fecha final
var r_da_busque = NULLIF(LS_REGIST.co_regist_60,''); // Dato de busqueda

pag_to_refresh.add(9464);
pag_to_refresh.add(9432);

if (r_co_bancos !== null  && (r_co_moneda == null || r_co_moneda == '')){
    var mensajeError = "Seleccione Moneda.";
} else if ((r_co_filtro == 4 || r_co_filtro == 5) && (r_fe_inicio == null || r_fe_inicio == '')){
    var mensajeError = "Ingrese fecha inicial.";
} else if ((r_co_filtro == 4 || r_co_filtro == 5) && (r_fe_finale == null || r_fe_finale == '')){
    var mensajeError = "Ingrese fecha final.";
}

if (mensajeError != null ) {
    MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA',mensajeError, CO_CONTEN, true);
    return OK('NONE', null, null, null);
}

return OK2([{no_action:'REFRESH', ls_pagina: pag_to_refresh}]);
