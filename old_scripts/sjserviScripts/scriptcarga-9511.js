/* PARAMETROS*/ 

/*LOGICA*/
var valpagJson = new ValpagJson();

// QUERYS:
var v_va_resqry = DATA.SQL('wfacr', `select * from sjservi.registrar_envio_correo(null, null, null);`, 10);

v_va_resqry.result.forEach(function(rs){
    var rowx = new Row();
    rowx.addReg(new Reg({co_pagreg:  5, va_pagreg: null, tx_pagreg: rs.no_compag}));
    rowx.addReg(new Reg({co_pagreg: 10, va_pagreg: null, tx_pagreg: rs.no_client}));
    rowx.addReg(new Reg({co_pagreg: 20, va_pagreg: null, tx_pagreg: rs.no_contac}));
    rowx.addReg(new Reg({co_pagreg: 30, va_pagreg: null, tx_pagreg: rs.no_correo}));

    valpagJson.addRow(rowx);
});

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