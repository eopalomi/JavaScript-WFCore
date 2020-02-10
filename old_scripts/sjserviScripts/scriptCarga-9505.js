/* PARAMETROS*/ 
var p_co_client = COALESCE(LS_CONPAR.co_conpar_1,'');

/*LOGICA*/
var valpagJson = new ValpagJson();

// QUERYS:
var v_va_data15 = DATA.SQL('wfacr', `select no_horcit co_compag, concat(no_horcit, ':00') no_compag from generate_series(7,23) no_horcit;`, 10).result;
var query35 = `select co_ubigeo co_compag, no_direcc no_compag from clientx.listar_direccion(${p_co_client});`;
//MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA',"p_co_client: " + query35);
var data18  = DATA.SQL('wfacr', query35,  1).result; // BANCOS

var rowx = new Row();
rowx.addReg(new Reg({co_pagreg: 10, va_pagreg: null, tx_pagreg: null}));
rowx.addReg(new Reg({co_pagreg: 15, va_pagreg: null, tx_pagreg: null, ob_dindat: v_va_data15}));
rowx.addReg(new Reg({co_pagreg: 18, va_pagreg: null, ob_dindat: data18, cf_search:{il_search: true, tx_search: 'Buscar Dirección'}}));
rowx.addReg(new Reg({co_pagreg: 20, va_pagreg: null, tx_pagreg: null}));

valpagJson.addRow(rowx);

/*DOM: Luego de cargar datos ejecutar:*/
DO_POST_LOAD_DATA = function () {
    //document.getElementById('PAG'+ CO_PAGINA).setAttribute('class',document.getElementById('PAG'+ CO_PAGINA).getAttribute('class')+'2');
    SHOWINFO(true);
    /*CFGDATATABLE({
        searching:true, 
        ordering:false, 
        paging:true, 
        pageLength:15, 
        scrollX:true,
        scrollY:false,
        fixedHeader: true,
        "sDom":'<"H"Cfr>t<"F"ip>'
    });*/
};


/*RETORNO*/
return valpagJson;
