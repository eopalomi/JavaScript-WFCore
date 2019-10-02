//PARAMETROS
var p_id_tippag = COALESCE(LS_CONPAR.co_conpar_1, null);

//VARIABLES
var v_tx_query = "SELECT id_tippag as co_compag, de_tippag as no_compag from pagos.tctippag";
var data10     = DATA.SQL('wfacr', v_tx_query, 30).result;

var valpagJson = new ValpagJson();
var rowx = new Row();
rowx.add(new Reg({co_pagreg: 10, va_pagreg: p_id_tippag, ob_dindat: data10}));
valpagJson.addRow(rowx);

DO_POST_LOAD_DATA = function(){
	SHOWINFO(true);
    window.parent.container(CO_PAGINA).css('width','605px');
    document.getElementById('PAG'+CO_PAGINA).setAttribute('class',document.getElementById('PAG'+CO_PAGINA).getAttribute('class')+'2');
};

VALPAGJS = valpagJson;