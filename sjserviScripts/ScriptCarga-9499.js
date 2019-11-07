/*PARAMETROS*/
var p_fe_objpas = COALESCE(LS_CONPAR.co_conpar_1,'');
var p_ti_objpas = COALESCE(LS_CONPAR.co_conpar_2,'');

/*LOGICA*/
var valpagJson = new ValpagJson();

var query = `
    select * from sjservi.listar_requerimiento_cotizacion('', '', '') where no_estreq = 'ACEPTADO';
`;

var data = DATA.SQL('wfacr', query,  1); // BANCOS

data.result.forEach(function(rs){
    var rowx = new Row();
    rowx.add(new Reg({co_pagreg:  10, va_pagreg: null}));
    rowx.add(new Reg({co_pagreg:  20, va_pagreg: null}));
    rowx.add(new Reg({co_pagreg:  30, va_pagreg: null}));
    rowx.add(new Reg({co_pagreg:  40, va_pagreg: null}));
    rowx.add(new Reg({co_pagreg:  50, va_pagreg: null}));
    rowx.add(new Reg({co_pagreg:  60, va_pagreg: null}));
    rowx.add(new Reg({co_pagreg:  70, va_pagreg: null}));
    rowx.add(new Reg({co_pagreg:  80, va_pagreg: null}));
    rowx.add(new Reg({co_pagreg:  90, va_pagreg: null}));
    rowx.add(new Reg({co_pagreg: 100, va_pagreg: null}));
    valpagJson.addRow(rowx);
});
/*DOM: Luego de cargar datos ejecutar:*/
DO_POST_LOAD_DATA = function () {
    document.getElementById('PAG'+ CO_PAGINA).setAttribute('class',document.getElementById('PAG'+ CO_PAGINA).getAttribute('class')+'2');
    SHOWINFO(true);
    CFGDATATABLE({searching: true, ordering: true, "pageLength": 5,select: true});
};

/*RETORNO*/
VALPAGJS = valpagJson;