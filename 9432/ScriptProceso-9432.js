/*HOY*/
var hoy = new Date();
var dd = hoy.getDate();
var mm = hoy.getMonth()+1;
var yyyy = hoy.getFullYear();
hoy = dd+'-'+mm+'-'+yyyy;

// PARAMETROS
var paramBancoCargo  = COALESCE(LS_CONPAR.co_conpar_1, null);
var paramFormaPago   = COALESCE(LS_CONPAR.co_conpar_7, 3);
var paramNroCtaCargo = COALESCE(LS_CONPAR.co_conpar_9, null);
var paramMedioPago   = COALESCE(LS_CONPAR.co_conpar_10,4);

arrayEntregas   = [];
arrayDetalleTXT = [];
jsonCabeceraTXT = {};

if (CO_PAGBOT == 1){
    for each(var row in LS_ALLREG){
        if (row.co_regist_250 == true) {                                 // ¿Esta Seleccionado?
            var regCodigoEntDeta = NULLIF(row.co_regist_20, '');         // Código de Entrega a Rendir Detalle
            var regCodigoEntrega = NULLIF(row.co_regist_25, '');         // Código de Entrega a Rendir
            var regNumeroEntrega = NULLIF(row.co_regist_30, '');         // Numero de Entrega a rendir
            var regNombrePersona = DECODE(NULLIF(row.co_regist_110,'')); // Nombre de beneficiario
            var regCodBancoAbono = NULLIF(row.co_regist_115,'');         // Código de Banco a abonar
            var regNomBancoAbono = DECODE(NULLIF(row.co_regist_120,'')); // Nombre de Banco a abonar
            var regCtaBancoAbono = NULLIF(row.co_regist_130,'');         // Cuenta Bancaria de Abono
            var regImporteAbonar = NULLIF(row.co_regist_150,'');         // Importe de pago
            var regDescripGlosa  = NULLIF(row.co_regist_240,'');         // Glosa
            
            if (paramFormaPago == null){
                var mensajeValidacion =  "Seleccione forma de pago.";
            } else if (paramNroCtaCargo == null){
                var mensajeValidacion =  "Seleccione el banco para generar el pago.";
            } else if (regDescripGlosa == null){
                var mensajeValidacion = "Ingrese la glosa. Entrega de Rendir - N° " + regNumeroEntrega;
            } else if (paramBancoCargo != regCodBancoAbono){
                var mensajeValidacion = "El N° de Entrega " + regNumeroEntrega + " pertenece al banco " + regNomBancoAbono + ". (" + paramBancoCargo + " - "+ regCodBancoAbono +")";
            };
            
            if (mensajeValidacion != null){
                MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA', mensajeValidacion, CO_CONTEN, true);
                return OK('NONE', null, null, null);
            }
            
            var objTxtBCP = new Object();
            objTxtBCP["numeroCtaAbono"]         = regCtaBancoAbono;
            objTxtBCP["numeroDocIdentidad"]     = "";
            objTxtBCP["nombreBeneficiario"]     = regNombrePersona;
            objTxtBCP["referenciaBeneficiario"] = "";
            objTxtBCP["referenciaEmpresas"]     = "";
            objTxtBCP["numeroComprobante"]      = "";
            objTxtBCP["fechaEmision"]           = hoy;
            objTxtBCP["importeAbonar"]          = regImporteAbonar;
            objTxtBCP["correoBeneficiario"]     = "";
            objTxtBCP["numeroCCIAbono"]         = "";
            objTxtBCP["fechaVencimiento"]       = "";
            objTxtBCP["tipoDocIdentidad"]       = "L";
            objTxtBCP["tipoComprobante"]        = "";
            
            arrayDetalleTXT.push(objTxtBCP);

            var objEntregas = new Object();
            objEntregas["codigoEntDetalle"] = regCodigoEntDeta;
            objEntregas["detalleGlosa"]     = regDescripGlosa;
            arrayEntregas.push(objEntregas);
        }
    }

    var v_no_ctaqry = DATA.SQL('wfacr', "select id_ctaban, no_ctaban, id_tipmon from pagos.tcctaban where id_ctaban = " + paramNroCtaCargo, 5).result[0];
    var v_no_ctaban = v_no_ctaqry.no_ctaban;
    v_no_ctaban = v_no_ctaban.replace(/-/g, "");
    
    jsonCabeceraTXT["numeroCtaBanCargo"] = v_no_ctaban;
    jsonCabeceraTXT["monedaCtaBanCargo"] = v_no_ctaqry.id_tipmon;
    jsonCabeceraTXT["codigoCtaBanCargo"] = v_no_ctaqry.id_ctaban;

    if (paramBancoCargo == 1) { // SCOTIABANK
        var query001 = DATA.SQL({
            no_conexi : 'wfacr',
            no_consul : "select * from pagos.pbgenerar_txt_scotiabank_json('" + JSON.stringify(arrayDetalleTXT) + "')",
            sg_timout : 5
        });
    } else if (paramBancoCargo == 2){ // BBVA
        var query001 = DATA.SQL({
            no_conexi : 'wfacr',
            no_consul : "select * from pagos.pbgenerar_txt_bbva_json('"+ JSON.stringify(jsonCabeceraTXT) + "','" + JSON.stringify(arrayDetalleTXT) + "')",
            sg_timout : 5
        });
    } else if (paramBancoCargo == 3){ //BCP
        var query001 = DATA.SQL({
            no_conexi : 'wfacr',
            no_consul : "select * from pagos.pbgenerar_txt_bcp_json('"+ JSON.stringify(jsonCabeceraTXT) + "','" + JSON.stringify(arrayDetalleTXT) + "')",
            sg_timout : 5
        });
    };

    var query002 = DATA.SQL({
        no_conexi : 'wfacr',
        no_consul : "select * from pagos.pbgenerar_bloque_pagos('"+ JSON.stringify(arrayEntregas) + "', " + paramFormaPago +", " + paramBancoCargo + "," + paramNroCtaCargo + ", " + paramMedioPago + ", " + USUARI.co_usuari +")",
        sg_timout : 5
    });

    var txt = DATA.CREATE_FILE({
        no_archiv : 'EntregasRendir',
        no_extens : 'txt',
        ob_dindat : query001.result
    });

    var pag_to_refresh = new List();
    pag_to_refresh.add(9432);

    return OK2([
        {no_action:'DOWNLOAD',  ur_archiv: HTTP.URL(txt)},
        {no_action:'REFRESH', ls_pagina: pag_to_refresh }
    ]);
} else if (CO_PAGBOT == 2){
    var regCodigoEntrega  = NULLIF(LS_REGIST.co_regist_25, ''); // Código de Entrega a rendir
    var regNumeroentrega  = NULLIF(LS_REGIST.co_regist_30, ''); // Número de Entrega a rendir
      
    return OK2([{no_action:'OPENPOPUP', ur_popup  : 'wf?co_conten=8183&co_conpar_1='+regNumeroentrega+'&co_conpar_2='+regCodigoEntrega}]);
}