/*PARAMETROS*/
var p_fe_objpas = COALESCE(LS_CONPAR.co_conpar_1,'');
var p_ti_objpas = COALESCE(LS_CONPAR.co_conpar_2,'');

/*LOGICA*/
var query10 = `select co_tipper co_compag, no_tipper no_compag from personx.tctipper`;
var data10  = DATA.SQL('wfacr', query10,  1).result; // BANCOS

//LOGICA
var rowx = new Row();
var valpagJson = new ValpagJson();

rowx.add(new Reg({co_pagreg:  10, va_pagreg: null, ob_dindat: data10}));
rowx.add(new Reg({co_pagreg:  20, va_pagreg: null}));
rowx.add(new Reg({co_pagreg:  30, va_pagreg: null}));
rowx.add(new Reg({co_pagreg:  40, va_pagreg: null}));

valpagJson.addRow(rowx);

DO_POST_LOAD_DATA = function () {
    SHOWINFO(true);
};

VALPAGJS = valpagJson;