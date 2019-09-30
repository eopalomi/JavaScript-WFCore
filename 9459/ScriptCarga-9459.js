/*PARAMETROS*/
var p_fe_asient = COALESCE(LS_CONPAR.co_conpar_1,'');
var p_id_blopag = COALESCE(LS_CONPAR.co_conpar_2,'');
var p_de_blopag = COALESCE(LS_CONPAR.co_conpar_3,'');

/*LOGICA*/
var valpagJson = new ValpagJson();

var v_tx_query =
    "SELECT * FROM pagos.pblistar_blopag(3) " +
    "where id_estpag = 1" +
    "and  ('" + p_de_blopag + "' = '' or ('B' || lpad(cast(id_blopag as varchar), 5, '0')) ilike '%' || '"+ p_de_blopag +"' || '%')"

// PROCESO
var v_va_resqry = DATA.SQL('wfacr', v_tx_query, 10); 

for each (var rs in v_va_resqry.result){
	if (p_id_blopag == rs.id_blopag){
    	var url_ca_totblo = '<a href="../wf?co_conten=8188&co_conpar_1=' + p_fe_asient + '&co_conpar_2=' + rs.id_blopag + '" target=_parent><font color="red"><b>[Ver]</font></b></a>';
		var v_negrit = '<b>';
    } else {
        var url_ca_totblo = '[<a href="../wf?co_conten=8188&co_conpar_1=' + p_fe_asient + '&co_conpar_2=' + rs.id_blopag + '" target=_parent><b>Ver</b></a>]';
		var v_negrit = '';
    };

    var rowx = new Row();
    rowx.add(new Reg({co_pagreg: 10, va_pagreg: null}));
    rowx.add(new Reg({co_pagreg: 20, va_pagreg: rs.id_blopag}));
    rowx.add(new Reg({co_pagreg: 25, va_pagreg: v_negrit + 'B' +(StringUtils.leftPad(rs.id_blopag, 5,'0'))}));
    rowx.add(new Reg({co_pagreg: 30, va_pagreg: v_negrit + rs.fe_regist}));
    rowx.add(new Reg({co_pagreg: 40, va_pagreg: v_negrit + rs.no_forpag}));
    rowx.add(new Reg({co_pagreg: 50, va_pagreg: v_negrit + rs.no_bancos}));
    rowx.add(new Reg({co_pagreg: 60, va_pagreg: v_negrit + rs.no_ctaban}));
    rowx.add(new Reg({co_pagreg: 70, va_pagreg: v_negrit + rs.im_totblo}));
    rowx.add(new Reg({co_pagreg: 80, va_pagreg: v_negrit + rs.ca_totblo}));
    rowx.add(new Reg({co_pagreg: 90, va_pagreg: null}));
    rowx.add(new Reg({co_pagreg: 110, va_pagreg: url_ca_totblo}));
    rowx.add(new Reg({co_pagreg: 120, va_pagreg: null, ti_pagreg:6}));
    valpagJson.addRow(rowx);
}

DO_POST_LOAD_DATA = function () {
    window.parent.container(CO_PAGINA).css('width','605px');
    document.getElementById('PAG'+CO_PAGINA).setAttribute('class',document.getElementById('PAG'+CO_PAGINA).getAttribute('class')+'2');
    SHOWINFO(true);
};

VALPAGJS = valpagJson;