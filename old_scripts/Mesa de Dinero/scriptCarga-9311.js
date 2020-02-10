/* PARAMETROS*/ 
var p_co_maeban = COALESCE(LS_CONPAR.co_conpar_1,'null');
var p_fe_proces = COALESCE(LS_CONPAR.co_conpar_2,'');

/*LOGICA*/
var valpagJson = new ValpagJson();

// QUERYS:
var v_tx_query = "select * from mesdiner.pblistar_transaciones();";
var v_va_resqry = DATA.SQL('wfacr', v_tx_query, 10);

function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
};

for each (var rs in v_va_resqry.result){
	var rowx = new Row();
	rowx.addReg(new Reg({co_pagreg: 10, va_pagreg: rs.no_bancos, tx_pagreg: rs.no_bancos}));
	rowx.addReg(new Reg({co_pagreg: 20, va_pagreg: rs.no_concep, tx_pagreg: rs.no_concep}));
	rowx.addReg(new Reg({co_pagreg: 30, va_pagreg: rs.no_moneda, tx_pagreg: rs.no_moneda}));
    rowx.addReg(new Reg({co_pagreg: 40, va_pagreg: rs.nu_ctaori, tx_pagreg: rs.nu_ctaori}));
    rowx.addReg(new Reg({co_pagreg: 50, va_pagreg: rs.nu_ctades, tx_pagreg: rs.nu_ctades}));
    rowx.addReg(new Reg({co_pagreg: 60, va_pagreg: rs.im_operac, tx_pagreg: formatNumber(rs.im_operac)}));
    rowx.addReg(new Reg({co_pagreg: 65, va_pagreg: rs.nu_refere, tx_pagreg: rs.nu_refere}));
    rowx.addReg(new Reg({co_pagreg: 70, va_pagreg: rs.fe_regist, tx_pagreg: rs.fe_regist}));  
    rowx.addReg(new Reg({co_pagreg: 80, va_pagreg: rs.ho_regist, tx_pagreg: rs.ho_regist}));
	valpagJson.addRow(rowx);
};

/*DOM: Luego de cargar datos ejecutar:*/
DO_POST_LOAD_DATA = function () {
	SHOWINFO(true);
	document.getElementById('PAG'+CO_PAGINA).setAttribute('class',document.getElementById('PAG'+CO_PAGINA).getAttribute('class')+'2');
  CFGDATATABLE({
        searching: true, //no buscar
        ordering: true, //no ordenable
        paging: true, //no paginacion
        pageLength: 20 // Número de Registros por página
    });
};

/*RETORNO*/
return valpagJson;