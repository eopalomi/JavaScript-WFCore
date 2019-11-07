/*PARAMETROS*/
var p_fe_objpas = COALESCE(LS_CONPAR.co_conpar_1,'');
var p_ti_objpas = COALESCE(LS_CONPAR.co_conpar_2,'');

var data10  = DATA.SQL('wfacr', `select co_estven co_compag, no_estven no_compag from sjservi.tcestven;`,  1).result; // BANCOS
var data20  = DATA.SQL('wfacr', `select co_motven co_compag, no_motven no_compag from sjservi.tcmotven;`,  1).result; // BANCOS
var data30  = DATA.SQL('wfacr', `select co_evaven co_compag, no_evaven no_compag from sjservi.tcevaven;`,  1).result; // BANCOS

/*LOGICA*/
var valpagJson = new ValpagJson();

var rowx = new Row();
rowx.add(new Reg({co_pagreg:  10, va_pagreg: null, ob_dindat: data10}));
rowx.add(new Reg({co_pagreg:  20, va_pagreg: null, ob_dindat: data20}));
rowx.add(new Reg({co_pagreg:  30, va_pagreg: null, ob_dindat: data30}));
rowx.add(new Reg({co_pagreg:  40, va_pagreg: null}));
rowx.add(new Reg({co_pagreg:  50, va_pagreg: null}));
valpagJson.addRow(rowx);

/*DOM: Luego de cargar datos ejecutar:*/
DO_POST_LOAD_DATA = function () {
    document.getElementById('PAG'+ CO_PAGINA).setAttribute('class',document.getElementById('PAG'+ CO_PAGINA).getAttribute('class')+'2');
    SHOWINFO(true);
    CFGDATATABLE({searching: true, ordering: true, "pageLength": 5,select: true});
};


/*RETORNO*/
VALPAGJS = valpagJson;