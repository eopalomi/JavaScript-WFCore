// VARIABLES
var fecha = new Date();
var diaUno = '1/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear();
var diaHoy = fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear();


/*PARAMETROS*/
var p_id_bancos = COALESCE(LS_CONPAR.co_conpar_1, null);
var p_co_moneda = COALESCE(LS_CONPAR.co_conpar_2, 1);
var p_co_filtro = COALESCE(LS_CONPAR.co_conpar_3, '');
var p_fe_inicio = COALESCE(LS_CONPAR.co_conpar_4, diaUno);
var p_fe_finale = COALESCE(LS_CONPAR.co_conpar_5, diaHoy);
var p_da_busque = COALESCE(LS_CONPAR.co_conpar_6, '');
var p_co_medpag = COALESCE(LS_CONPAR.co_conpar_10, 4);

/*LOGICA*/
var v_tx_query = 
    "SELECT * FROM pagos.pbentren_listar() " +
    "where co_estpag = 1 " +
    "and id_blopag is null " +
    "and co_bancos = " + p_id_bancos + " " +
    "and (case "+
            "when '"+ p_co_filtro +"' = '4' then fe_movimi >= '" + p_fe_inicio + "' and fe_movimi <= '" + p_fe_finale + "' "+
            "when '"+ p_co_filtro +"' = '5' then fe_regsma >= '" + p_fe_inicio + "' and fe_regsma <= '" + p_fe_finale + "' "+
            "else true "+
        "end) " +
    "and ('"+ p_da_busque + "' = '' or cast(nu_entren as varchar) ilike '%' || '"+ p_da_busque +"' || '%' or nu_docide ilike '%'|| '"+ p_da_busque +"' || '%' or no_person ilike '%' || '"+ p_da_busque +"' || '%' or 'B' || lpad(cast(id_blopag as varchar), 5, '0') ilike '%' || '"+ p_da_busque +"' || '%') " + 
    "and ("+ p_id_bancos +" is null or co_bancos = "+ p_id_bancos+ ") " +
    "and ("+ p_co_moneda +" is null or co_moneda = "+ p_co_moneda+ ")";

var v_va_resqry = DATA.SQL('wfacr', v_tx_query, 30);
var valpagJson = new ValpagJson();

for each (var rs in v_va_resqry.result){
	switch(rs.id_blopag){
        case null:{
            var v_ti_estglo ="E";
            var v_ti_estreg ="E";
            var url = rs.id_blopag;
            break;
        } 
        default: {
			var v_ti_estglo ="L";
            var v_ti_estreg ="L";
            var url = '<a href="../wf?co_conten=8188&co_conpar_1=' + diaHoy + '&co_conpar_2=' + rs.id_blopag + '" target=_parent><b>' + 'B' +(StringUtils.leftPad(rs.id_blopag, 5,'0')) + '</b></a>';
            break; 
        }
    };

	var rowx = new Row();
    rowx.addReg(new Reg({co_pagreg:   10, va_pagreg: null}));
    rowx.addReg(new Reg({co_pagreg:   20, va_pagreg: rs.co_entdet}));
    rowx.addReg(new Reg({co_pagreg:   25, va_pagreg: rs.co_entren}));
    rowx.addReg(new Reg({co_pagreg:   30, va_pagreg: rs.nu_entren}));
    rowx.addReg(new Reg({co_pagreg:   40, va_pagreg: rs.fe_movimi}));
    rowx.addReg(new Reg({co_pagreg:   50, va_pagreg: rs.fe_visado}));
    rowx.addReg(new Reg({co_pagreg:   60, va_pagreg: rs.hr_visado}));
    rowx.addReg(new Reg({co_pagreg:   70, va_pagreg: rs.no_tipent}));
    rowx.addReg(new Reg({co_pagreg:   80, va_pagreg: rs.no_estado}));
    rowx.addReg(new Reg({co_pagreg:   90, va_pagreg: rs.ca_pladia}));
    rowx.addReg(new Reg({co_pagreg:  100, va_pagreg: rs.no_oficin}));
    rowx.addReg(new Reg({co_pagreg:  110, va_pagreg: rs.no_person}));
    rowx.addReg(new Reg({co_pagreg:  115, va_pagreg: rs.co_bancos}));
    rowx.addReg(new Reg({co_pagreg:  120, va_pagreg: rs.no_banabo}));
    rowx.addReg(new Reg({co_pagreg:  130, va_pagreg: rs.nu_ctaabo}));
    rowx.addReg(new Reg({co_pagreg:  140, va_pagreg: '<note title="'+rs.no_descri+'">'+rs.no_descri.substring(0, 30)+'...</note>'}));
    rowx.addReg(new Reg({co_pagreg:  150, va_pagreg: rs.im_totabo}));
    rowx.addReg(new Reg({co_pagreg:  170, va_pagreg: rs.ti_cambio}));
    rowx.addReg(new Reg({co_pagreg:  180, va_pagreg: rs.no_moneda}));
    rowx.addReg(new Reg({co_pagreg:  190, va_pagreg: rs.no_peraut}));
    rowx.addReg(new Reg({co_pagreg:  240, va_pagreg: rs.no_glosae, ti_estreg: v_ti_estglo}));
    rowx.addReg(new Reg({co_pagreg:  245, va_pagreg: url}));
    rowx.addReg(new Reg({co_pagreg:  250, va_pagreg: null, ti_estreg: v_ti_estreg}));
    
    v_ti_estreg = v_ti_estreg == 'L'?true:false; // NO BORRAR
    rowx.cfg([{'ti_object': 'button','co_object':2, 'disabled':v_ti_estreg}]);
	valpagJson.addRow(rowx);
}

DO_POST_LOAD_DATA = function () {
    SHOWINFO(true);
    AUTODYNAMIC(true);
};

return valpagJson;