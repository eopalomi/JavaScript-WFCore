/* PARAMETROS*/ 
var p_co_envcor = COALESCE(LS_CONPAR.co_conpar_1,'');

/*LOGICA*/
var valpagJson = new ValpagJson();

// QUERYS:
//var v_va_data15 = DATA.SQL('wfacr', `select no_horcit co_compag, concat(no_horcit, ':00') no_compag from generate_series(7,23) no_horcit;`, 10).result;

var rowx = new Row();
rowx.addReg(new Reg({co_pagreg: 10, va_pagreg: null, tx_pagreg: null}));
rowx.addReg(new Reg({co_pagreg: 20, va_pagreg: null, tx_pagreg: null}));
rowx.addReg(new Reg({co_pagreg: 30, va_pagreg: null, tx_pagreg: null}));

valpagJson.addRow(rowx);

/*DOM: Luego de cargar datos ejecutar:*/
DO_POST_LOAD_DATA = function () {
    document.getElementById('PAG'+ CO_PAGINA).setAttribute('class',document.getElementById('PAG'+ CO_PAGINA).getAttribute('class')+'2');
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