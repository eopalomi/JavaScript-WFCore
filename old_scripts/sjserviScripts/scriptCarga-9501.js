/*PARAMETROS*/
var p_id_posven = COALESCE(LS_CONPAR.co_conpar_1,'');

/*LOGICA*/
var valpagJson = new ValpagJson();

var query = `
    select * from  sjservi.listar_segumiento_posventa(${p_id_posven});
`;

var data = DATA.SQL('wfacr', query,  1); // BANCOS

data.result.forEach(function(rs){
    var rowx = new Row();
    rowx.add(new Reg({co_pagreg:  10, va_pagreg: rs.fe_regist}));
    rowx.add(new Reg({co_pagreg:  20, va_pagreg: 'Erick palomino'}));
    rowx.add(new Reg({co_pagreg:  30, va_pagreg: rs.no_coment}));
    valpagJson.addRow(rowx);
});
/*DOM: Luego de cargar datos ejecutar:*/
DO_POST_LOAD_DATA = function () {
    document.getElementById('PAG'+ CO_PAGINA).setAttribute('class',document.getElementById('PAG'+ CO_PAGINA).getAttribute('class')+'2');
    SHOWINFO(true);
    CFGDATATABLE({
        searching:false, 
        ordering:false, 
        paging:false
        //pageLength: 5, 
        //scrollX:true,
        //scrollY:true
        //fixedHeader: true
        //"sDom":'<"H"Cfr>t<"F"ip>'
    });
};


/*RETORNO*/
VALPAGJS = valpagJson;