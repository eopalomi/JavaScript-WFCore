/*PARAMETROS*/
var p_co_client = COALESCE(LS_CONPAR.co_conpar_1,'');

/*LOGICA*/
var query10 = `select co_client co_compag,no_razsoc no_compag from clientx.listar_clientes(null);`;
var data10  = DATA.SQL('wfacr', query10,  1).result; // BANCOS

//LOGICA
var rowx = new Row();
var valpagJson = new ValpagJson();

rowx.add(new Reg({co_pagreg: 40, va_pagreg: p_co_client, ob_dindat: data10,cf_search:{il_search: true, tx_search: 'Buscar Cliente'}}));


valpagJson.addRow(rowx);

DO_POST_LOAD_DATA = function () {
    SHOWINFO(true);
};

VALPAGJS = valpagJson;