// REGISTROS:
var r_co_operac = NULLIF(LS_REGIST.co_regist_10,''); // Nro. Negociación
var r_co_opedet = NULLIF(LS_REGIST.co_regist_20,''); // Nro. Operación
var r_nu_docume = NULLIF(LS_REGIST.co_regist_30,''); // Fecha
var r_co_tipope = NULLIF(LS_REGIST.co_regist_40,''); // Tipo de Operacion
//var r_co_tipdoc = NULLIF(LS_REGIST.co_regist_50,''); // Tipo de Documento
var r_no_tipmon = NULLIF(LS_REGIST.co_regist_60,''); // Tipo de Moneda
var r_im_operacini = NULLIF(LS_REGIST.co_regist_70,''); // Importe Inicial
var r_im_operac = NULLIF(LS_REGIST.co_regist_80,''); // Importe
var r_co_maeban = NULLIF(LS_REGIST.co_regist_90,'');  // Banco
var r_im_cositf = NULLIF(LS_REGIST.co_regist_100,''); // ITF
var r_im_otrgas = NULLIF(LS_REGIST.co_regist_110,''); // Otros gastos
//var r_no_direcc = NULLIF(LS_REGIST.co_regist_120,''); // Dirección
var r_nu_cueban = NULLIF(LS_REGIST.co_regist_130,''); // Cuenta Bancaria
var r_co_estado = NULLIF(LS_REGIST.co_regist_140,''); // Estado
var r_co_arcadj = NULLIF(LS_REGIST.co_regist_150,'undefined'); // Archivo Adjunto
var r_co_concep = NULLIF(LS_REGIST.co_regist_500,''); // Codigo de Concepto
var r_co_ctaori = NULLIF(LS_REGIST.co_regist_510,''); // Codigo de Cuenta Origen
var r_co_ctades = NULLIF(LS_REGIST.co_regist_520,''); // Codigo de Cuenta Destino
var r_co_monope = NULLIF(LS_REGIST.co_regist_530,''); // Codigo de Moneda Operacion
var r_nu_refope = NULLIF(LS_REGIST.co_regist_540,''); // Número de referencia

if (CO_PAGBOT == 1) {
	var v_co_estliq = 1;
   //var v_nu_refere = DATA.SQL('wfacr', `SELECT nu_refope FROM mesdiner.tbtransa where co_esttra <> 2 and nu_refope = '${r_nu_refope}'`, 10);
  	if (r_nu_refope == null) {
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ingrese número de referencia('+r_nu_cueban+').', co_conten:CO_CONTEN, ca_timeout: 5});
	 	return OK('NONE', null, null, null);
  	} else if (r_co_maeban == null) {
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Seleccione banco.', co_conten:CO_CONTEN, ca_timeout: 5});
        return OK('NONE', null, null, null);
    } else if (r_co_ctaori == null) {
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Seleccione cuenta bancaria.', co_conten:CO_CONTEN, ca_timeout: 5});
        return OK('NONE', null, null, null);
    } else if (r_im_operac == null) {
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ingrese importe.', co_conten:CO_CONTEN, ca_timeout: 5});
        return OK('NONE', null, null, null);
    } else if (r_co_arcadj == null || r_co_arcadj == 'null' ){
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'No existe documento adjunto.', co_conten:CO_CONTEN, ca_timeout: 5});
        return OK('NONE', null, null, null);
    } 
	/*for each (var rs in v_nu_refere.result){
        if (rs.nu_refope != null || rs.nu_refope != '') {
            MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING, 'ALERTA', 'El Número de referencia ' + r_nu_refope + ' ya se encuentra registrado.');
            return OK('NONE', null, null, null);
        }
    }*/

} else {
  v_co_estliq = 2;
};

 v_rs_query = 
      "select * from mesdiner.pbregistrar_transaccion(" +
      r_co_operac + "," + 	// CODIGO DE OPERACION
      r_co_opedet + "," + 	// CODIGO DE DETALLE OPERACION
      r_co_concep + "," + 	// CODIGO DE CONCEPTO
      r_co_ctaori + "," + 	// CUENTA BANCARIA DE ORIGEN
      r_nu_cueban + "," + 	// CUENTA BANCARIA DE DESTINO
      r_im_operac + "," + 	// IMPORTE DE LA TRANSACCION
      r_co_maeban + "," + 	// BANCO
      v_co_estliq + ",'"+ 	// ESTADO DE LA TRANSACCION
      r_nu_refope + "',"+ 	// NUMERO DE REFERENCIA
      r_im_cositf + "," + 	// IMPORTE TOTAL ITF
      r_im_otrgas + "," +  	// IMPORTE DE OTROS GASTOS
      COALESCE(r_co_arcadj, null) + "," + 	// CÓDIGO DE ARCHIVO ADJUNTO
      "null" 	  + ","+ 	// CÓDIGO CUENTA CONTABLE DETALLE
      r_co_monope + ")"
;  	// MONEDA DE LA TRANSACCION

var v_va_resqu = DATA.SQL('wfacr', v_rs_query, 10);
v_va_resqu = v_va_resqu.result[0];

if (v_va_resqu.co_estado == '00') {
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_SUCCESS, no_title:'<center><b>CORRECTO</b></center>', no_body:'Se ejecutó la acción correctamente.', co_conten:CO_CONTEN, ca_timeout: 5});
    var pag_to_refresh = new List();
    pag_to_refresh.add(9245);
    pag_to_refresh.add(9246);
    return OK('REFRESH', null, null, pag_to_refresh);
} else {
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_ERROR, no_title:'<center><b>CORRECTO</b></center>', no_body:'Ha ocurrido un problema al realizar el registro.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
};

/*
var pag_to_refresh = new List();
pag_to_refresh.add(9245);
pag_to_refresh.add(9246);

return OK('REFRESH', null, null, pag_to_refresh);*/




