/*PARAMETROS*/
var p_fe_objpas = COALESCE(LS_CONPAR.co_conpar_1,'');
var p_ti_objpas = COALESCE(LS_CONPAR.co_conpar_2,'');

/*LOGICA*/
var valpagJson = new ValpagJson();

var data = DATA.SQL('wfacr', `select * from sjservi.listar_postventa(null);`,  1);
var data170 = DATA.SQL('wfacr', `select co_estcoc co_compag, no_sigest no_compag from sjservi.tcestcoc;`,  1).result;
var data180 = DATA.SQL('wfacr', `select co_motcoc co_compag, no_sigmot no_compag from sjservi.tcmotcoc;`,  1).result;
var data190 = DATA.SQL('wfacr', `select co_evacoc co_compag, co_sigeva no_compag from sjservi.tcevacoc;`,  1).result;

data.result.forEach(function(rs){
    var rowx = new Row();
    rowx.add(new Reg({co_pagreg:  100, va_pagreg: null}));
    rowx.add(new Reg({co_pagreg:  110, va_pagreg: rs.fe_cotcli}));
    rowx.add(new Reg({co_pagreg:  120, va_pagreg: rs.id_cotcli}));
    rowx.add(new Reg({co_pagreg:  125, va_pagreg: rs.id_posven}));
    rowx.add(new Reg({co_pagreg:  130, va_pagreg: rs.no_comerc}));
    rowx.add(new Reg({co_pagreg:  140, va_pagreg: null}));
    rowx.add(new Reg({co_pagreg:  150, va_pagreg: rs.im_totame}));
    rowx.add(new Reg({co_pagreg:  160, va_pagreg: rs.im_totame}));
    rowx.add(new Reg({co_pagreg:  170, va_pagreg: rs.co_evacoc, ob_dindat: data170}));
    rowx.add(new Reg({co_pagreg:  180, va_pagreg: rs.co_estcoc, ob_dindat: data180}));
    rowx.add(new Reg({co_pagreg:  190, va_pagreg: rs.co_motcoc, ob_dindat: data190}));
    rowx.add(new Reg({co_pagreg:  200, va_pagreg: '<note title="'+rs.no_coment+'">'+rs.no_coment.substring(0, 30)+'...</note>'}));
    rowx.add(new Reg({co_pagreg:  210, va_pagreg: null}));
    rowx.add(new Reg({co_pagreg:  220, va_pagreg: null}));
    rowx.add(new Reg({co_pagreg:  230, va_pagreg: null}));
    valpagJson.addRow(rowx);
});

/*DOM: Luego de cargar datos ejecutar:*/
DO_POST_LOAD_DATA = function () {
    document.getElementById('PAG'+ CO_PAGINA).setAttribute('class',document.getElementById('PAG'+ CO_PAGINA).getAttribute('class')+'2');
    SHOWINFO(true);
    CFGDATATABLE({
        searching:true, 
        ordering:false, 
        paging:true, 
        pageLength: 15, 
        scrollX:true,
        scrollY:true,
        fixedHeader: true,
        "sDom":'<"H"Cfr>t<"F"ip>'
    });
};

/*RETORNO*/
VALPAGJS = valpagJson;