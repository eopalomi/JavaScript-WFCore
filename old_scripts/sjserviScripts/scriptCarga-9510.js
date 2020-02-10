/* PARAMETROS*/ 

/*LOGICA*/
var valpagJson = new ValpagJson();

// QUERYS:
var v_va_data10 = DATA.SQL('wfacr', `select no_sigsve co_compag, concat(no_sigsve, ' - ', no_estsve) no_compag from sjservi.listar_estado_seguimiento_venta(null);`, 10).result;
var v_va_data30 = DATA.SQL('wfacr', `select co_semsve co_compag, concat(co_sigsve, ' - ', no_semsve) no_compag from sjservi.listar_semaforo_seguimiento_venta(null);`, 10).result;

var rowx = new Row();
rowx.addReg(new Reg({co_pagreg: 10, va_pagreg: null, tx_pagreg: null, ob_dindat: v_va_data10}));
rowx.addReg(new Reg({co_pagreg: 20, va_pagreg: null, tx_pagreg: null}));
rowx.addReg(new Reg({co_pagreg: 30, va_pagreg: null, tx_pagreg: null, ob_dindat: v_va_data30}));
rowx.addReg(new Reg({co_pagreg: 40, va_pagreg: null, tx_pagreg: null}));
rowx.addReg(new Reg({co_pagreg: 50, va_pagreg: null, tx_pagreg: null}));
rowx.addReg(new Reg({co_pagreg: 60, va_pagreg: null, tx_pagreg: null}));
rowx.addReg(new Reg({co_pagreg: 70, va_pagreg: null, tx_pagreg: null}));
rowx.addReg(new Reg({co_pagreg: 80, va_pagreg: null, tx_pagreg: null}));

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