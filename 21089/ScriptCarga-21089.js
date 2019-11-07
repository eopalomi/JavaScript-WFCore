/*PARAMETROS*/
var p_fe_objpas = COALESCE(LS_CONPAR.co_conpar_1,'');
var p_ti_objpas = COALESCE(LS_CONPAR.co_conpar_2,'');

/*LOGICA*/
var valpagJson = new ValpagJson();
var data200 = DATA.SQL('wfacr', "SELECT co_catart AS co_compag, no_catart AS no_compag FROM wflogist.tccatart", 5).result;
var data210 = DATA.SQL('wfacr', "SELECT co_articu AS co_compag, no_articu AS no_compag FROM wflogist.tcarticu", 5).result;
var data220 = DATA.SQL('wfacr', "SELECT co_tippri AS co_compag, no_tippri AS no_compag FROM wflogist.tctippri", 5).result;
var query01 = `select co_tipreq as co_compag, no_tipreq as no_compag from wflogist.tctipreq;`;
var data100  = DATA.SQL({no_conexi : 'wfacr', no_consul : query01, sg_timout : 5}).result;

var row = new Row();
//row.addReg(new Reg({co_pagreg : 10, va_pagreg: null,ob_dindat: data10, cf_search:{il_search: true, tx_search: 'Buscar Tipo Requerimiento'}}));
row.add(new Reg({co_pagreg: 100, va_pagreg: null, ob_dindat: data100}));
row.add(new Reg({co_pagreg: 110, va_pagreg: null}));
row.add(new Reg({co_pagreg: 120, va_pagreg: null}));

row.add(new Reg({co_pagreg: 200, va_pagreg: null, ob_dindat: data200}));
row.add(new Reg({co_pagreg: 210, va_pagreg: null, ob_dindat: data210, cf_search:{il_search: true, tx_search: 'Buscar Articulo'}}));
row.add(new Reg({co_pagreg: 220, va_pagreg: null, ob_dindat: data220}));
row.add(new Reg({co_pagreg: 230, va_pagreg: null}));

valpagJson.add(row);

/*DOM: Luego de cargar datos ejecutar:*/
DO_POST_LOAD_DATA = function () {
    window.parent.container(CO_PAGINA).css('width','405px');
    document.getElementById('PAG' + CO_PAGINA).setAttribute('class',document.getElementById('PAG' + CO_PAGINA).getAttribute('class') + '2');
    SHOWINFO(true);
};

/*RETORNO*/
return valpagJson;