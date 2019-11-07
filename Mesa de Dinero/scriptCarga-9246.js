/*PARAMETROS*/
var p_fe_inicio = COALESCE(LS_CONPAR.co_conpar_1,'');
var p_fe_finale = COALESCE(LS_CONPAR.co_conpar_2,'');
var p_da_busque = COALESCE(LS_CONPAR.co_conpar_3,'');

/*LOGICA*/
var valpagJson = new ValpagJson();

// QUERYS:
var v_tx_query = "SELECT * FROM mesdiner.pblistar_operac_liquidar('"+ p_fe_inicio + "','" + p_fe_finale + "','"+ p_da_busque +"')";
// PROCESO
var v_va_resqry = DATA.SQL('wfacr', v_tx_query, 10);  // REGISTRAR EMPRESA

var v_tx_query_test = ("select 1 as co_compag, 'Seleccionar' as no_compag ");
var v_va_resqry_test = DATA.SQL('wfacr', v_tx_query_test, 10).result;  // REGISTRAR EMPRESA
var v_co_concep = new Set([4, 3]);
//MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_SUCCESS, "CORRECTO", "X: " + v_va_resqry_combo);
//MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_SUCCESS, "CORRECTO", "Ha sido aprobado correctamente" + v_va_resqry.result);

for each (var rs in v_va_resqry.result){
  //var url_ctaban = '<a href="http://192.168.9.212/wf?co_conten=8075&co_conpar_1=' + rs.co_client + '" target=_parent> ' + rs.nu_ctaban +'</a>';
  //var url_peraut = '<a href="http://192.168.9.212/wf?co_conten=8079&co_conpar_1=' + rs.co_client + '" target=_parent> ' + rs.nu_peraut +'</a>';
  
  var rowx = new Row();
 
  rowx.addReg(new Reg({co_pagreg: 10, va_pagreg: rs.co_operac, tx_pagreg: rs.co_uniope}));
  rowx.addReg(new Reg({co_pagreg: 20, va_pagreg: rs.co_opedet, tx_pagreg: 'NE' + StringUtils.leftPad(rs.co_operac, 6,'0')}));
  //rowx.addReg(new Reg({co_pagreg: 10, va_pagreg: rs.co_operac, tx_pagreg: rs.co_operac}));
  //rowx.addReg(new Reg({co_pagreg: 20, va_pagreg: rs.co_opedet, tx_pagreg: rs.co_opedet}));
  rowx.addReg(new Reg({co_pagreg: 30, va_pagreg: rs.fe_regist}));
  rowx.addReg(new Reg({co_pagreg: 40, va_pagreg: rs.co_concep, tx_pagreg: rs.no_concep}));
  rowx.addReg(new Reg({co_pagreg: 45, va_pagreg: rs.co_docide}));
  rowx.addReg(new Reg({co_pagreg: 50, va_pagreg: rs.no_client}));
  rowx.addReg(new Reg({co_pagreg: 60, va_pagreg: rs.co_monope, tx_pagreg: rs.no_moneda}));
  rowx.addReg(new Reg({co_pagreg: 70, va_pagreg: rs.im_operac}));
  rowx.addReg(new Reg({co_pagreg: 80, va_pagreg: rs.im_operac}));
  // rowx.addReg(new Reg({co_pagreg: 90, va_pagreg: rs.no_bancos, ti_estreg: 'E', ti_pagreg: 1}));
    
  var v_tx_query_combo = (
    "select ct.co_maeban as co_compag, bn.no_bancos as no_compag " + 
    "from mesdiner.tbctaban ct, mesdiner.tcmaeban bn " + 
    "where bn.co_maeban = ct.co_maeban " +
    "and ct.co_moneda = " + rs.co_monope  + " " +
    "and (case when " + rs.co_concep + " in (1, 2) then il_cuemes = true else ct.co_client = " + rs.co_client  + " end) " +
    "group by  ct.co_maeban, bn.no_bancos "
  );
    
  var v_va_resqry_combo = DATA.SQL('wfacr', v_tx_query_combo, 10).result;  // REGISTRAR EMPRESA
    
  rowx.addReg(new Reg({co_pagreg: 90, va_pagreg: rs.co_maeban, ti_estreg: 'E', ob_dindat: v_va_resqry_combo}));
  rowx.addReg(new Reg({co_pagreg: 100, va_pagreg: parseFloat(Math.floor(rs.im_operac/1000)*0.05).toPrecision(2)}));
  rowx.addReg(new Reg({co_pagreg: 110, va_pagreg: ''}));
  rowx.addReg(new Reg({co_pagreg: 120, va_pagreg: '', ti_estreg: 'O'}));
  rowx.addReg(new Reg({co_pagreg: 130, va_pagreg: rs.nu_ctades, ob_dindat: v_va_resqry_test}));
  rowx.addReg(new Reg({co_pagreg: 140, va_pagreg: rs.no_estope}));
    
    if (v_co_concep.has(rs.co_concep) == true & rs.co_arcadj == null){
        v_ti_pagreg = 36;
        v_ti_estreg = 'E';
    } else if (rs.il_opecon & rs.co_arcadj == null) {
        v_ti_pagreg = 36;
        v_ti_estreg = 'E';
    } else if (rs.co_arcadj == null) {
        v_ti_pagreg = 1;
        v_ti_estreg = 'L';
    } else {
        v_ti_estreg = 'L';
        v_ti_pagreg = 36;
    };
  rowx.addReg(new Reg({co_pagreg: 150, va_pagreg: rs.co_arcadj, ti_estreg: v_ti_estreg, ti_pagreg: v_ti_pagreg}));
  rowx.addReg(new Reg({co_pagreg: 160, va_pagreg: rs.co_client}));
  rowx.addReg(new Reg({co_pagreg: 500, va_pagreg: rs.co_concep}));
  rowx.addReg(new Reg({co_pagreg: 510, va_pagreg: rs.co_ctaori}));
  rowx.addReg(new Reg({co_pagreg: 520, va_pagreg: rs.co_ctades}));
  rowx.addReg(new Reg({co_pagreg: 530, va_pagreg: rs.co_monope}));

  valpagJson.addRow(rowx);
};

/*DOM: Luego de cargar datos ejecutar:*/
DO_POST_LOAD_DATA = function () {
	SHOWINFO(true);
    AUTODYNAMIC(true);
    //CFGDATATABLE({searching: false, ordering: false, "pageLength": 10, "scrollX": true,select: true, initComplete:fixsize, drawCallback:fixsize});
    CFGDATATABLE({searching: true, ordering: true, "pageLength": 20});
    //CFGDATATABLE({"pageLength": 10, searching: false,select: true});
};



/*RETORNO*/
return valpagJson;

// far fa-trash-alt    - ICONO DELETE
// far fa-check-square - ICONO LISTO
