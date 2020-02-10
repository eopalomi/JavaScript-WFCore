/* PARAMETROS*/ 

/*LOGICA*/
var valpagJson = new ValpagJson();

// QUERYS:
var v_va_resqry = DATA.SQL('wfacr', `
    select
        co_semsve co_compag,
        concat(
        no_semsve,
        ' (', (CASE co_semsve
                    WHEN 1 THEN '+ de 1 compra'
                    WHEN 2 THEN '1 sola compra'
                    WHEN 3 THEN '+ 60 días sin comprar'
                    WHEN 4 THEN 'Solo Cotizaciones'
                    WHEN 5 THEN 'Sin respuesta'
                END), ')') no_compag,
        ca_semafo
    from sjservi.listar_semaforo_seguimiento_venta(null) sv
    left join (
        select ti_estsve, count(*) ca_semafo from clientx.listar_clientes(null)
        where ti_estsve is not null
        group by ti_estsve
    ) tt on sv.co_semsve = tt.ti_estsve
    order by 1;
`, 10);

v_va_resqry.result.forEach(function(rs){
    var rowx = new Row();
    rowx.addReg(new Reg({co_pagreg: 10, va_pagreg: null, tx_pagreg: rs.no_compag}));
    rowx.addReg(new Reg({co_pagreg: 20, va_pagreg: null, tx_pagreg: rs.ca_semafo}));
    rowx.addReg(new Reg({co_pagreg: 30, va_pagreg: null, tx_pagreg: null}));

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