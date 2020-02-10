/*PARAMETROS*/

/*LOGICA*/
var query = `select count(*) as ca_reqcot from sjservi.listar_requerimiento_cotizacion(null, null, null);`;
var data  = DATA.SQL('wfacr', query,  1); // BANCOS

//LOGICA
var valpagJson = new ValpagJson();

data.result.forEach(function(rs){
    var rowx = new Row();
    rowx.add(new Reg({co_pagreg:  10, va_pagreg: rs.ca_reqcot}));
    rowx.add(new Reg({co_pagreg:  20, va_pagreg: '0'}));
    rowx.add(new Reg({co_pagreg:  30, va_pagreg: '0'}));
    rowx.add(new Reg({co_pagreg:  40, va_pagreg: '0'}));
    valpagJson.addRow(rowx);
});

DO_POST_LOAD_DATA = function () {
    SHOWINFO(true);
};

VALPAGJS = valpagJson;