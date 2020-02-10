/* PARAMETROS*/ 
var p_fe_period = COALESCE(LS_CONPAR.co_conpar_1,"");
var p_co_estope = COALESCE(LS_CONPAR.co_conpar_2,"");

/*LOGICA*/
var valpagJson = new ValpagJson();
var v_co_concep = new Set([1, 2]);

// QUERYS:
var v_tx_query = "select * from mesdiner.pblistar_operaciones('" + p_fe_period  + "','" + p_co_estope + "');";
var v_va_resqry = DATA.SQL('wfacr', v_tx_query, 10);

function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
};

for each (var rs in v_va_resqry.result){
    var row = new Row();
    row.addReg(new Reg({co_pagreg:   5, va_pagreg: rs.co_operac, tx_pagreg: rs.co_uniope}));
    row.addReg(new Reg({co_pagreg:  10, va_pagreg: rs.co_operac, tx_pagreg: 'NE' + StringUtils.leftPad(rs.co_operac, 6,'0')}));
    row.addReg(new Reg({co_pagreg:  20, va_pagreg: rs.co_opedet, tx_pagreg: 'OP' + StringUtils.leftPad(rs.co_opedet, 6,'0')}));
	row.addReg(new Reg({co_pagreg:  30, va_pagreg: rs.fe_regist, tx_pagreg: rs.fe_regist}));
	row.addReg(new Reg({co_pagreg:  35, va_pagreg: rs.ho_regist, tx_pagreg: rs.ho_regist}));
	row.addReg(new Reg({co_pagreg:  40, va_pagreg: rs.co_concep, tx_pagreg: rs.no_concep}));
	row.addReg(new Reg({co_pagreg:  50, va_pagreg: rs.no_moneda, tx_pagreg: rs.no_moneda}));
	row.addReg(new Reg({co_pagreg:  60, va_pagreg: rs.im_operac, tx_pagreg: formatNumber(COALESCE(rs.im_operac, ''))}));
	row.addReg(new Reg({co_pagreg:  70, va_pagreg: rs.nu_ctaori, tx_pagreg: rs.nu_ctaori}));
	row.addReg(new Reg({co_pagreg:  80, va_pagreg: rs.nu_ctades, tx_pagreg: rs.nu_ctades}));
	row.addReg(new Reg({co_pagreg:  90, va_pagreg: rs.no_bancos, tx_pagreg: rs.no_bancos}));
    row.addReg(new Reg({co_pagreg:  95, va_pagreg: rs.im_ganfin, tx_pagreg: formatNumber(COALESCE(rs.im_ganfin, ''))}));
	row.addReg(new Reg({co_pagreg: 100, va_pagreg: rs.no_estope, tx_pagreg: rs.no_estope}));
	row.addReg(new Reg({co_pagreg: 120, va_pagreg: rs.il_opecon, tx_pagreg: rs.il_opecon}));

    if (v_co_concep.has(rs.co_concep) == true & rs.co_arcadj == null & rs.il_opecon != true){
        v_ti_pagreg = 36;
        v_ti_estreg = 'E';
    } else if (rs.co_arcadj == null) {
        v_ti_pagreg = 1;
        v_ti_estreg = 'L';
    } else {
        v_ti_estreg = 'L';
        v_ti_pagreg = 36;
    };
    
    row.addReg(new Reg({co_pagreg: 110, va_pagreg: rs.co_arcadj, tx_pagreg: rs.co_arcadj, ti_estreg: v_ti_estreg, ti_pagreg: v_ti_pagreg}));
	valpagJson.addRow(row);
}

// far fa-save  -- ICONO GUARDAR
DO_POST_LOAD_DATA = function () {
	document.getElementById('PAG'+CO_PAGINA).setAttribute('class',document.getElementById('PAG'+CO_PAGINA).getAttribute('class')+'2');
    SHOWINFO(true);
   // PRINTABLE(true);
    
    CFGDATATABLE({
        searching: 	true, 	//no buscar
        ordering: 	true, 	//no ordenable
        paging: 	true, 	//no paginacion
        pageLength: 50,
        "scrollX": 	true, 	// ver scroll horizontal
        "scrollY": 	true, 	//altura maxima de tabla  - "400px"
        fixedHeader: true,
        "sDom": 	'<"H"Cfr>t<"F"ip>'
    });

};

return valpagJson;