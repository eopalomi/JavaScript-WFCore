// REGISTROS:
var r_ti_operac = NULLIF(LS_REGIST.co_regist_10,''); // Nro. Negociación
var r_co_bancos = NULLIF(LS_REGIST.co_regist_20,''); // Banco
var r_co_moneda = NULLIF(LS_REGIST.co_regist_30,''); // Moneda
var r_co_tiptra = NULLIF(LS_REGIST.co_regist_40,''); // Tipo de Transacción
var r_co_ctaori = NULLIF(LS_REGIST.co_regist_50,''); // Cuenta de Cargo - (Origen)
var r_co_ctades = NULLIF(LS_REGIST.co_regist_60,''); // Cuenta de Abono - (destino)
var r_co_ctacon = NULLIF(COALESCE(LS_REGIST.co_regist_70,''),''); // Descripción
var r_im_operac = NULLIF(LS_REGIST.co_regist_80,''); // Monto
var r_nu_refere = NULLIF(LS_REGIST.co_regist_90,''); // Operación y/o Referencia

var v_co_estliq = 1;


//var v_nu_refere = DATA.SQL('wfacr', `SELECT nu_refope FROM mesdiner.tbtransa where co_esttra <> 2 and nu_refope = '${r_nu_refere}'`, 10);

if (r_ti_operac == null) {
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Seleccione tipo de operación.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if ((r_co_ctaori == null || r_co_ctaori.trim()  == '') && (r_co_ctades == null || r_co_ctades.trim()  == '')) {
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ingrese cuenta de operación.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if (r_im_operac == null || r_im_operac.trim()  == '') {
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ingrese importe de operación.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if (r_nu_refere == null || r_nu_refere.trim()  == '') {
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ingrese número de referencia.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else {
    /*for each (var rs in v_nu_refere.result){
        if (rs.nu_refope != null || rs.nu_refope != '') {
            MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING, 'ALERTA', 'El Número de referencia ' + r_nu_refere + ' ya se encuentra registrado.');
            return OK('NONE', null, null, null);
        }
    }*/

    //r_co_ctacon = (r_co_ctacon).length > 0 ? r_co_ctacon : null;
    r_im_operac = r_im_operac.replace(/,/g, '');
    v_rs_query = 
      "select * from mesdiner.pbregistrar_transaccion(" +
      "null" + "," + 		// CODIGO DE OPERACION
      "null" + "," +		// CODIGO DE DETALLE OPERACION
      r_ti_operac + "," + 	// CODIGO DE CONCEPTO
      r_co_ctaori + "," + 	// CUENTA BANCARIA DE ORIGEN
      r_co_ctades + "," + 	// CUENTA BANCARIA DE DESTINO
      r_im_operac + "," + 	// IMPORTE DE LA TRANSACCION
      r_co_bancos + "," + 	// BANCO
      v_co_estliq + ",'" +  // ESTADO DE LA TRANSACCION
      r_nu_refere + "',"+ 	// NUMERO DE REFERENCIA
      "null"	  + "," + 	// IMPORTE TOTAL ITF
      "null"	  + "," + 	// IMPORTE DE OTROS GASTOS
      "null"	  + ",'" + 	// CÓDIGO DE ARCHIVO ADJUNTO
      r_co_ctacon + "',"+ 	// CÓDIGO CUENTA CONTABLE DETALLE
      r_co_moneda + ")"; 	// MONEDA DE LA TRANSACCION

    var v_va_resqu = DATA.SQL('wfacr', v_rs_query, 10);
    v_va_resqu = v_va_resqu.result[0];
    
    if (v_va_resqu.co_estado == '00') {
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_SUCCESS, no_title:'<center><b>CORRECTO</b></center>', no_body:'El registro de operación contraria se realizó correctamente.', co_conten:CO_CONTEN, ca_timeout: 5});
        /*var pag_to_refresh = new List();
        pag_to_refresh.add(9306);
        return OK('REFRESH', null, null, pag_to_refresh);*/
    } else {
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_ERROR, no_title:'<center><b>CORRECTO</b></center>', no_body:"Ha ocurrido un problema al realizar el registro.  [ " + v_va_resqu.no_estado + " ]", co_conten:CO_CONTEN, ca_timeout: 5});
        return OK('NONE', null, null, null);
    }   
}

