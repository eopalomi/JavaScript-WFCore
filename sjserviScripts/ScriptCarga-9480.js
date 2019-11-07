/*PARAMETROS*/
var p_co_estreq = COALESCE(LS_CONPAR.co_conpar_1,'');
var p_fe_inireq = COALESCE(LS_CONPAR.co_conpar_2,'');
var p_fe_finreq = COALESCE(LS_CONPAR.co_conpar_3,'');

/*LOGICA*/
var query10 = `select co_estreq as co_compag, no_estreq as no_compag from sjservi.tcestreq`;
var data10  = DATA.SQL('wfacr', query10,  1).result; // BANCOS

//LOGICA
var rowx = new Row();
var valpagJson = new ValpagJson();

rowx.add(new Reg({co_pagreg:  10, va_pagreg: p_co_estreq, ob_dindat: data10}));
rowx.add(new Reg({co_pagreg:  20, va_pagreg: p_fe_inireq}));
rowx.add(new Reg({co_pagreg:  30, va_pagreg: p_fe_finreq}));
rowx.add(new Reg({co_pagreg:  40, va_pagreg: null}));

valpagJson.addRow(rowx);

DO_POST_LOAD_DATA = function () {
    SHOWINFO(true);
};

VALPAGJS = valpagJson;