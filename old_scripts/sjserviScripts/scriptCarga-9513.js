/* PARAMETROS*/ 
var p_co_envcor = COALESCE(LS_CONPAR.co_conpar_1,'');

/*LOGICA*/
var valpagJson = new ValpagJson();

// QUERYS:
var v_va_data10 = DATA.SQL('wfacr', `select co_envcor co_compag, no_envcor no_compag from sjservi.listar_tipo_envio_correo(null);`, 10).result;
var v_va_data20 = DATA.SQL('wfacr', `select co_person as co_compag, concat(no_nombre, ' ', no_apepat, ' ', no_apemat) no_compag from clientx.listar_personas_contacto(null, null);`, 10).result;

var rowx = new Row();
rowx.addReg(new Reg({co_pagreg: 10, va_pagreg: p_co_envcor, tx_pagreg: null, ob_dindat: v_va_data10}));
rowx.addReg(new Reg({co_pagreg: 20, va_pagreg: null, ob_dindat: v_va_data20, cf_search:{il_search: true, tx_search: 'Buscar Persona Contacto'}}));
rowx.addReg(new Reg({co_pagreg: 30, va_pagreg: null, tx_pagreg: null}));

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