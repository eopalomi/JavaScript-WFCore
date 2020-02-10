// PARAMETROS
var p_fe_objpas = COALESCE(LS_CONPAR.co_conpar_1,'');
var p_ti_objpas = COALESCE(LS_CONPAR.co_conpar_2,'');

// LOGICA
var informacionUsuario = DATA.SQL('wfacr', "select * from wflogist.obtener_datos_usuario('44232418')", 1).result;
MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA', informacionUsuario);
// REGISTROS
var valpagJson  = new ValpagJson();
var row = new Row();

v_va_resqry.result.forEach(function(rs){
    row.addReg(new Reg({co_pagreg: 10, va_pagreg: rs.no_emplea}));
    row.addReg(new Reg({co_pagreg: 20, va_pagreg: rs.no_arelab}));
    row.addReg(new Reg({co_pagreg: 30, va_pagreg: rs.no_cenope}));
    row.addReg(new Reg({co_pagreg: 40, va_pagreg: rs.no_corcor}));
    valpagJson.addRow(row);
});

//DOM: Luego de cargar datos ejecutar
DO_POST_LOAD_DATA = function () {
    window.parent.container(CO_PAGINA).css('width','605px');
    document.getElementById('PAG'+CO_PAGINA).setAttribute('class',document.getElementById('PAG'+CO_PAGINA).getAttribute('class')+'2');
    SHOWINFO(true);
};

//RETORNO
return valpagJson;