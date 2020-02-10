/*PARAMETROS*/
var p_fe_objpas = COALESCE(LS_CONPAR.co_conpar_1,'');
var p_ti_objpas = COALESCE(LS_CONPAR.co_conpar_2,'');

/*LOGICA*/
var valpagJson = new ValpagJson();

var data = DATA.SQL('wfacr', `select * from sjservi.tbleypos order by 1,2,5,6;`,  1);

data.result.forEach(function(rs){
    var rowx = new Row();
    rowx.add(new Reg({co_pagreg:  10, va_pagreg: rs.co_estado}));
    rowx.add(new Reg({co_pagreg:  20, va_pagreg: rs.no_estado}));
    rowx.add(new Reg({co_pagreg:  30, va_pagreg: rs.co_motivo}));
    rowx.add(new Reg({co_pagreg:  40, va_pagreg: rs.no_motivo}));
    rowx.add(new Reg({co_pagreg:  50, va_pagreg: rs.co_evalua}));
    rowx.add(new Reg({co_pagreg:  60, va_pagreg: rs.no_evalua}));
    
    valpagJson.addRow(rowx);
});

/*DOM: Luego de cargar datos ejecutar:*/
DO_POST_LOAD_DATA = function () {
    document.getElementById('PAG'+ CO_PAGINA).setAttribute('class',document.getElementById('PAG'+ CO_PAGINA).getAttribute('class')+'2');
    SHOWINFO(true);
    CFGDATATABLE({
        //searching:true, 
        ordering:false, 
        paging:false, 
        //pageLength: 5, 
        scrollX:true,
        scrollY:true
        //fixedHeader: true
        //"sDom":'<"H"Cfr>t<"F"ip>'
    });
};

/*RETORNO*/
VALPAGJS = valpagJson;