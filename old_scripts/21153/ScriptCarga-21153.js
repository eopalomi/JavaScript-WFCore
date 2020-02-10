/*PARAMETROS*/

/*LOGICA*/
var valpagJson  = new ValpagJson();
var row = new Row();
var data100 = DATA.SQL('wfacr', "select co_tippro as co_compag, no_tippro as no_compag from wflogist.tctippro", 5).result;
var data110 = DATA.SQL('wfacr', "select id_provee as co_compag, no_provee as no_compag from wflogist.tbprovee;", 5).result;

row.addReg(new Reg({co_pagreg: 100, va_pagreg: null, ob_dindat: data100})); // Categoria
row.addReg(new Reg({co_pagreg: 110, va_pagreg: null, ob_dindat: data110, cf_search:{il_search: true, tx_search: 'Buscar Articulo'}})); // Proveedor
valpagJson.addRow(row);

/*DOM: Luego de cargar datos ejecutar:*/
DO_POST_LOAD_DATA = function () {
    SHOWINFO(true);
    document.getElementById('PAG' + CO_PAGINA).setAttribute('class',document.getElementById('PAG' + CO_PAGINA).getAttribute('class') + '1');
};

/*RETORNO*/
VALPAGJS = valpagJson;