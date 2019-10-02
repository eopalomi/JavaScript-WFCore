//VARIABLES
var queryDatos =    
    "SELECT " +
        "co_bancos, " +
        "no_banabo, " +
        "sum(CASE co_moneda WHEN 1 THEN 1 ELSE 0 END) nu_cansol, " +
        "sum(CASE co_moneda WHEN 2 THEN 1 ELSE 0 END) nu_candol, " +
        "sum(im_totabo) im_totabo " +
    "FROM pagos.pbentren_listar() " +
    "WHERE co_estpag = 1 " +
    "AND id_blopag IS NULL " +
    "GROUP BY co_bancos, no_banabo ";

var v_va_resqry  = DATA.SQL('wfacr', queryDatos, 1);

/*LOGICA*/
var valpagJson = new ValpagJson();
MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA',v_va_resqry.result, CO_CONTEN, true);

v_va_resqry.result.forEach(function(rs) {
    var rowx = new Row();
    rowx.addReg(new Reg({co_pagreg: 10, va_pagreg: rs.no_banabo}));
    rowx.addReg(new Reg({co_pagreg: 20, va_pagreg: rs.nu_cansol}));
    rowx.addReg(new Reg({co_pagreg: 30, va_pagreg: rs.nu_candol}));
    rowx.addReg(new Reg({co_pagreg: 40, va_pagreg: rs.im_totabo}));
	valpagJson.addRow(rowx);
});


/* for (var rs in v_va_resqry.result) {
    var rowx = new Row();
    rowx.addReg(new Reg({co_pagreg:   10, va_pagreg: v_va_resqry.result[rs] }));
    rowx.addReg(new Reg({co_pagreg:   20, va_pagreg: "rs.nu_cansol"}));
    rowx.addReg(new Reg({co_pagreg:   30, va_pagreg: "rs.nu_candol"}));
    rowx.addReg(new Reg({co_pagreg:   40, va_pagreg: "rs.im_totabo"}));
	valpagJson.addRow(rowx);
} */

DO_POST_LOAD_DATA = function () {
    SHOWINFO(true);
    AUTODYNAMIC(true);
    window.parent.container(CO_PAGINA).css('width','605px');
    document.getElementById('PAG'+CO_PAGINA).setAttribute('class',document.getElementById('PAG'+CO_PAGINA).getAttribute('class')+'2');
};

return valpagJson;