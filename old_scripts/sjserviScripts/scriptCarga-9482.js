/*PARAMETROS*/
/*PARAMETROS*/
var p_co_estreq = COALESCE(LS_CONPAR.co_conpar_1,''); 
var p_fe_inireq = COALESCE(LS_CONPAR.co_conpar_2,''); 
var p_fe_finreq = COALESCE(LS_CONPAR.co_conpar_3,''); 


//
var query = `
    select * from sjservi.listar_requerimiento_cotizacion('${p_co_estreq}', '${p_fe_inireq}', '${p_fe_finreq}');
`;
//MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA',"dato: " + query);
//var query = `select * from clientx.listar_clientes(12);`;
var data  = DATA.SQL('wfacr', query,  1); // BANCOS

/*LOGICA*/
//LOGICA

var valpagJson = new ValpagJson();

data.result.forEach(function(rs){
    var rowx = new Row();
    rowx.add(new Reg({co_pagreg:  10, va_pagreg: null}));
    rowx.add(new Reg({co_pagreg:  20, va_pagreg: rs.id_reqcot}));
    rowx.add(new Reg({co_pagreg:  30, va_pagreg: rs.fe_regist}));
    rowx.add(new Reg({co_pagreg:  40, va_pagreg: rs.no_razsoc}));
    rowx.add(new Reg({co_pagreg:  50, va_pagreg: rs.no_contac}));
    rowx.add(new Reg({co_pagreg:  60, va_pagreg: rs.ca_diapen}));
    rowx.add(new Reg({co_pagreg:  62, va_pagreg: rs.fe_reqcot}));
    rowx.add(new Reg({co_pagreg:  70, va_pagreg: rs.no_estreq}));
    rowx.add(new Reg({co_pagreg:  80, va_pagreg: '<note title="'+rs.de_reqcot+'">'+rs.de_reqcot.substring(0, 30)+'...</note>'}));
    
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


