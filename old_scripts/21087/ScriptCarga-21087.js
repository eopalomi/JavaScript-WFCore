//PARAMETROS

//VARIABLES
var valpagJson = new ValpagJson();
var row = new Row();

var query01 = `select co_tipreq as co_compag, no_tipreq as no_compag from wflogist.tctipreq;`;
var data10  = DATA.SQL({no_conexi : 'wfacr', no_consul : query01, sg_timout : 5});

// REGISTROS
row.add(new Reg({co_pagreg: 10, va_pagreg: null, ob_dindat: data10.result}));
row.add(new Reg({co_pagreg: 20, va_pagreg: null}));
row.add(new Reg({co_pagreg: 30, va_pagreg: null}));
valpagJson.add(row);

// DOM
DO_POST_LOAD_DATA = function () {
    SHOWINFO(true);
    AUTODYNAMIC(true);
    window.parent.container(CO_PAGINA).css('width','605px');
    document.getElementById('PAG'+CO_PAGINA).setAttribute('class',document.getElementById('PAG'+CO_PAGINA).getAttribute('class')+'2');
};

/*RETORNO*/
return valpagJson;