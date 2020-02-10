/*PARAMETROS*/
var p_fe_objpas = COALESCE(LS_CONPAR.co_conpar_1,'');
var p_ti_objpas = COALESCE(LS_CONPAR.co_conpar_2,'');

/*LOGICA*/
var v_tx_query = `select * from clientx.listar_clientes(null);`;
var v_va_resqry = DATA.SQL('wfacr', v_tx_query, 30);

//LOGICA
var valpagJson = new ValpagJson();
v_va_resqry.result.forEach(function(rs){
    var rowx = new Row();
    rowx.add(new Reg({co_pagreg:  10, va_pagreg: rs.co_client}));
    rowx.add(new Reg({co_pagreg:  20, va_pagreg: rs.no_razsoc}));
    rowx.add(new Reg({co_pagreg:  30, va_pagreg: rs.co_doctri}));
    rowx.add(new Reg({co_pagreg:  40, va_pagreg: rs.ca_percon}));
    rowx.add(new Reg({co_pagreg:  50, va_pagreg: rs.ca_direcc}));
    valpagJson.addRow(rowx);
});

DO_POST_LOAD_DATA = function () {
    document.getElementById('PAG'+ CO_PAGINA).setAttribute('class',document.getElementById('PAG'+ CO_PAGINA).getAttribute('class')+'2');
    SHOWINFO(true);
    CFGDATATABLE({searching: false, ordering: false, "pageLength": 10,select: true});
    
};

VALPAGJS = valpagJson;