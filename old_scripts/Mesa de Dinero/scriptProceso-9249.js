/*PARAMETROS*/
var p_co_client = COALESCE(LS_CONPAR.co_conpar_1, '');

//MSG.PUSH_TO_USER(USUARI.co_usuari,'p_co_client:' + p_co_client);
// REGISTROS:
var r_co_spot = NULLIF(LS_REGIST.co_regist_10, ''); // Personal Autorizado
var r_co_peraut = NULLIF(LS_REGIST.co_regist_15, ''); // Personal Autorizado
var r_co_tipope = NULLIF(LS_REGIST.co_regist_20, ''); // Tipo de Operación
var r_co_moneda = NULLIF(LS_REGIST.co_regist_30, ''); // Moneda
var r_mo_totope = NULLIF(LS_REGIST.co_regist_40, ''); // Monto
var r_cu_oricli = NULLIF(LS_REGIST.co_regist_50, ''); // [Cliente - Acceso]
var r_cu_oriacc = NULLIF(LS_REGIST.co_regist_60, ''); // [Acceso - Cliente]
var r_ti_camope = NULLIF(LS_REGIST.co_regist_70, ''); // Tipo de cambio ofrecido
var r_ti_cammer = NULLIF(LS_REGIST.co_regist_80, ''); // Tipo de cambio de mercado
var r_ti_camest = NULLIF(LS_REGIST.co_regist_90, ''); // Tipo de cambio de operación contraria
var r_il_opecon = NULLIF(LS_REGIST.co_regist_110, ''); // ¿Operación Contraria?
var r_va_opecon = NULLIF(LS_REGIST.co_regist_120, ''); // Operaciones

var v_tx_query = 
    "select * from mesdiner.pbmostrar_cliente(" + 
    p_co_client + "," + // Codigo de Cliente
    "''" + "," +
    "''"  + ")"   
;

// PROCESO
var v_va_resqry = DATA.SQL('wfacr', v_tx_query, 10);  
v_va_resqry = v_va_resqry.result[0];

if (v_va_resqry.va_person == 2 &&  (r_il_opecon != 'true' && r_co_peraut == null)) {
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>ALERTA</b></center>', no_body:'Seleccione persona autorizada.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if (r_co_tipope == null) {
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>ALERTA</b></center>', no_body:'Seleccione tipo de operación.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if (r_co_moneda == null) {
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>ALERTA</b></center>', no_body:'Seleccione la moneda.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if (r_mo_totope == null || r_mo_totope.trim() == '') {
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>ALERTA</b></center>', no_body:'Ingrese monto total de transacción.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if (r_cu_oricli == null || r_cu_oricli.trim() == '') {
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>ALERTA</b></center>', no_body:'Ingrese cuenta origen - [CLIENTE - ACCESO].', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if (r_cu_oriacc == null || r_cu_oriacc.trim() == '') {
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>ALERTA</b></center>', no_body:'Ingrese cuenta origen - [ACCESO - CLIENTE].', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if (r_ti_camope == null || r_ti_camope.trim() == '') {
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>ALERTA</b></center>', no_body:'Ingrese el tipo de cambio ofrecido.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if (r_ti_cammer == null || r_ti_cammer.trim() == '') {
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>ALERTA</b></center>', no_body:'Ingrese el tipo de cambio de mercado.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if (r_il_opecon != 'true' && (r_ti_camest == null || r_ti_camest.trim() == '')) {
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>ALERTA</b></center>', no_body:'Ingrese el tipo de cambio de operación contraria.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else {
    r_mo_totope = r_mo_totope.replace(/,/g, '');
    if (r_co_tipope == 2){
       var v_co_concliacc = 2;
       var v_co_conacccli = 3;
    } else {
        var v_co_concliacc = 1;
        var v_co_conacccli = 4;
    };


    // CLIENTE - ACCESO
    var v_va_puncom = r_cu_oricli.split(';');

    var r_tx_jsoncli = '';
    var v_mo_totcli = 0;
    // co_maeban, r_co_ctaban, r_nu_montot, co_bandes, co_ctades
    for (var i = 0; i < r_cu_oricli.split(';').length; i++) {
        var v_to_trama = v_va_puncom[i];
        var v_va_oricli = v_to_trama.split('&&');

        v_im_oricli = (v_va_oricli[2]).replace(/,/g, '');
        v_mo_totcli = parseFloat(v_mo_totcli) + parseFloat(v_im_oricli);

        if (r_tx_jsoncli == '') {
            r_tx_jsoncli = '{"co_ctaori":' + v_va_oricli[1] + ',"im_monori":' + v_im_oricli + ',"co_ctades":' + v_va_oricli[4] + ',"im_mondes":' + v_im_oricli + ',"co_concep":"' + v_co_concliacc + '"}';
        } else {
            r_tx_jsoncli = r_tx_jsoncli + "," + '{"co_ctaori":' + v_va_oricli[1] + ',"im_monori":' + v_im_oricli + ',"co_ctades":' + v_va_oricli[4] + ',"im_mondes":' + v_im_oricli + ',"co_concep":"' + v_co_concliacc + '"}';
        };
    };

    // ACCESO - CLIENTE
    var v_va_puncom2 = r_cu_oriacc.split(';');
    var r_tx_jsonacc = '';
    var v_mo_totacc = 0;

    for (var i = 0; i < r_cu_oriacc.split(';').length; i++) {
        var v_to_trama2 = v_va_puncom2[i];
        var v_va_oriacc = v_to_trama2.split('&&');
        
		v_im_oriacc = (v_va_oriacc[2]).replace(/,/g, '');
        v_mo_totacc = parseFloat(v_mo_totacc) + parseFloat(v_im_oriacc);

        if (r_tx_jsonacc == '') {
            var r_tx_jsonacc = '{"co_ctaori":' + v_va_oriacc[1] + ',"im_monori":' + v_im_oriacc + ',"co_ctades":' + v_va_oriacc[4] + ',"im_mondes":' + v_im_oriacc + ',"co_concep":"' + v_co_conacccli + '"}';
        } else {
            var r_tx_jsonacc = r_tx_jsonacc + "," + '{"co_ctaori":' + v_va_oriacc[1] + ',"im_monori":' + v_im_oriacc + ',"co_ctades":' + v_va_oriacc[4] + ',"im_mondes":' + v_im_oriacc + ',"co_concep":"' + v_co_conacccli + '"}';
        }
    };
    //MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_ERROR,'ALERTA',"v_mo_totacc:"+v_mo_totacc, CO_CONTEN, true);

    // IMPORTE EN DOLARES = (IMPORTE EN SOLES) X (TIPO DE CAMBIO DE OPERACIÓN)
  
    if (r_co_tipope == 1){ // Compra de Dolares
       var v_im_dolare = r_mo_totope;
    } else if (r_co_tipope == 2){
       var v_im_dolare = (r_mo_totope * r_ti_camope);
    };
    

    if ((r_il_opecon != 'true') && (v_mo_totcli != v_im_dolare)) {
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>ALERTA</b></center>', no_body:'Monto de operación no coincide con monto de Cliente - Acceso' + " saldo 1: " + v_mo_totcli + " saldo 2:" + v_im_dolare, co_conten:CO_CONTEN, ca_timeout: 5});
        return OK('NONE', null, null, null);
    } else if ((r_il_opecon != 'true') && (v_mo_totacc != (r_mo_totope * r_ti_camope)) && r_co_tipope == 1) {        
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>ALERTA</b></center>', no_body:'Monto de operación no coincide con monto de Acceso - Cliente' + " saldo 1: " + v_mo_totacc + " saldo 2:" + r_mo_totope, co_conten:CO_CONTEN, ca_timeout: 5});
        return OK('NONE', null, null, null);
    } else if ((r_il_opecon != 'true') && (v_mo_totacc != r_mo_totope) && r_co_tipope == 2) {
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>ALERTA</b></center>', no_body:'Monto de operación no coincide con monto de Acceso - Cliente' + " saldo 1: " + v_mo_totacc + " saldo 2:" + r_mo_totope, co_conten:CO_CONTEN, ca_timeout: 5});
        return OK('NONE', null, null, null);
    } else {
        if (r_il_opecon == 'true' && (r_va_opecon == null || r_va_opecon == '')){
            MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>ALERTA</b></center>', no_body:'Seleccione operación a procesar.', co_conten:CO_CONTEN, ca_timeout: 5});
        	return OK('NONE', null, null, null);
        };
        
        if (r_il_opecon == 'true') {
            v_co_estope = 1;
        } else {
            v_co_estope = 0;
        };
      
        var v_tx_query =
            "select * from mesdiner.pbregistrar_operacion(" +
            USUARI.co_usuari + "," + // USUARIO REGISTRANTE
            r_co_tipope + "," + // TIPO DE OPERACION
            p_co_client + "," + // CODIGO DE CLIENTE
            r_ti_camope + "," + // TIPO DE CAMBIO DE LA OPERACION
            r_ti_cammer + "," + // TIPO DE CAMBIO DE MERCADO
            r_ti_camest + "," + // TIPO DE CAMBIO BLOOMBERG
            v_co_estope + "," + // ESTADO DE LA OPERACION (0;PENDIENTE - 1;COMPLETADO - 2;ANULADO)
            r_co_peraut + "," + // CODIGO DE PERSONA AUTORIZADA
            "'[" + r_tx_jsoncli + ',' + r_tx_jsonacc + "]'," +
            r_mo_totope + ",'" + 
            r_co_spot   + "')"; // TRANSACCIONES DE LA OPERACION
        
        // PROCESO
        var v_va_resqry = DATA.SQL('wfacr', v_tx_query, 10); // REGISTRAR OPERACIÓN

        // MENSAJE DE VALIDACIÓN DE REGISTRO DE OPERACIÓN
        v_va_resqry = v_va_resqry.result[0];

        if (r_il_opecon == 'true') {
            var v_co_opecon = r_va_opecon.split(',');
            v_mo_totcon = 0;
            for (var i = 0; i < r_va_opecon.split(',').length; i++) {
                var v_co_opemon = v_co_opecon[i];

                var v_tx_opemon = 'select im_operac from mesdiner.tboperac where co_operac = ' + v_co_opemon;
                var v_va_opemon = DATA.SQL('wfacr', v_tx_opemon, 10);
                v_va_opemon = v_va_opemon.result[0];
                v_mo_totcon = parseFloat(v_mo_totcon) + parseFloat(v_va_opemon.im_operac);
            };

            // REGISTRO DE OPERACIÓN CONTRARIA
            if (v_mo_totcon == r_mo_totope) {
                var v_va_opecon = DATA.SQL('wfacr', `SELECT * FROM mesdiner.pbregistrar_operacion_contraria(${v_va_resqry.co_operac},'${r_va_opecon}');`, 10);
                v_va_opecon = v_va_opecon.result[0];
            } else {
                MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>ALERTA</b></center>', no_body:'Monto total de operación contraria no coincide con monto ingresado.', co_conten:CO_CONTEN, ca_timeout: 5});
                return OK('NONE', null, null, null);
            }
        };
		
        //MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_SUCCESS, 'XDXDXD', "CO_ESTADO:"+v_va_resqry.co_estado, CO_CONTEN, true);
        if (v_va_resqry.co_estado == '00') {
            MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_SUCCESS, no_title:'<center><b>CORRECTO</b></center>', no_body:`El registro de la operación ${r_il_opecon == 'true'?'Contraria':''} se realizó correctamente.`, co_conten:CO_CONTEN, ca_timeout: 5});

            var v_va_qryope = `
                select
                    op.im_operac, cl.no_client,tp.no_tipope, op.ti_camope, op.fe_regist, pn.no_correo, ps.co_docide, pn.no_nombre
                from mesdiner.tboperac op
                    left join mesdiner.pbmostrar_cliente(op.co_client, null, null) cl on true
                    left join mesdiner.tctipope tp ON op.co_tipope = tp.co_tipope
                    left join mesdiner.tbperaut pa ON pa.co_peraut = op.co_peraut
                    left join mesdiner.tbperson ps ON ps.co_person = pa.co_person
                    left join mesdiner.tbpernat pn ON ps.co_person = pn.co_pernat
                where op.co_operac = ${v_va_resqry.co_operac};
            `;
            
            var v_va_datope = DATA.SQL('wfacr', v_va_qryope, 10).result;
            
            var v_tx_mencor = `
                Esta información es enviada a través de la Mesa de Dinero de Acceso Crediticio como confirmación de la negociación realizada.\n
                \nFECHA: ${v_va_datope[0].fe_regist}
                \nCLIENTE: ${v_va_datope[0].no_nombre} - ${v_va_datope[0].co_docide} 
                \nMONTO DE LA TRANSACCIÓN: ${v_va_datope[0].im_operac}
                \nOPERACIÓN: ${v_va_datope[0].no_tipope}
                \nTIPO DE CAMBIO: ${v_va_datope[0].ti_camope}
            `;
            
            var headers = new Map();
            headers.put('Content-Type','application/json');
            headers.put('Authorization', 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj');
            
            var params = new Map();
            var mensajeCorreo = `{
                "de": "Mesa de Dinero <${USUARI.co_correo}>",
                "para": ["${v_va_datope.no_correo}"],
                "cc": ["mesadinero@acceso.com.pe"],
                "asunto": "OPERACIÓN COMPRA-VENTA",
                "mensaje": "${v_tx_mencor}"
            }`;
                    
            params.put('json',mensajeCorreo);
            MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_ERROR,'CORRECTO',mensajeCorreo, CO_CONTEN, true);
            return OK('NONE', null, null, null);
            var conhtp = HTTP.POST('https://sd1.accesocrediticio.com/private/v1.0/correosAdjuntos', headers, params, 1000);
            
            if( conhtp.status == 'OK')
                MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_SUCCESS,'CORRECTO',"Se enviarón los correos correctamente.", CO_CONTEN, true);
            else
                MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_ERROR,'ERROR',"Se ha producido un error al enviar los correos: " + conhtp.error.message, CO_CONTEN, true);
    
            var pag_to_refresh = new List();
            pag_to_refresh.add(9249);
            pag_to_refresh.add(9314);

            return OK('REFRESH', null, null, pag_to_refresh);
        } else {
            MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_ERROR, no_title:'<center><b>ALERTA</b></center>', no_body:'Ha ocurrido un problema al realizar el registro.', co_conten:CO_CONTEN, ca_timeout: 5});
            return OK('NONE', null, null, null);
        };
    };
};