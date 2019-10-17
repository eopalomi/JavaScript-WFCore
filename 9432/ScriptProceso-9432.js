// PARAMETROS
var paramBancoCargo  = COALESCE(LS_CONPAR.co_conpar_1, null);
var paramFormaPago   = COALESCE(LS_CONPAR.co_conpar_7, 3);
var paramNroCtaCargo = COALESCE(LS_CONPAR.co_conpar_9, null);
var paramMedioPago   = COALESCE(LS_CONPAR.co_conpar_10,4);

//VARIABLES
var fecha = new Date();
var diaHoy = fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear();

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
            } else if (regDescripGlosa == null){
                var mensajeValidacion = "Ingrese la glosa. Entrega de Rendir - N° " + regNumeroEntrega;
            } else if (paramFormaPago == 2 || paramFormaPago == 3) { // TRANSFERENCIA | OTRAS TRASNFERENCIAS
                if (paramBancoCargo != regCodBancoAbono){
                    var mensajeValidacion = "El N° de Entrega " + regNumeroEntrega + " pertenece al banco " + regNomBancoAbono + ". (" + paramBancoCargo + " - "+ regCodBancoAbono +")";
                }
                else if (paramNroCtaCargo == null){
                    var mensajeValidacion =  "Seleccione el banco para generar el pago.";
                }
            };
            
            if (mensajeValidacion != null){
                MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA', mensajeValidacion, CO_CONTEN, true);
                return OK('NONE', null, null, null);
            }

            // BLOQUE DE PAGOS
            var objBloquePago = new Object();
            objBloquePago["codigoEntDetalle"] = regCodigoEntDeta;
            objBloquePago["detalleGlosa"]     = regDescripGlosa;
            arrayEntregas.push(objBloquePago);

            if (paramFormaPago == 2 || paramFormaPago == 3){ // TRANSFERENCIA | OTRAS TRASNFERENCIAS
                // CUERPO DEL TXT
                var objTxtBanco = new Object();
                objTxtBanco["numeroCtaAbono"]         = regCtaBancoAbono;
                objTxtBanco["numeroDocIdentidad"]     = "";
                objTxtBanco["nombreBeneficiario"]     = regNombrePersona;
                objTxtBanco["referenciaBeneficiario"] = "";
                objTxtBanco["referenciaEmpresas"]     = "";
                objTxtBanco["numeroComprobante"]      = "";
                objTxtBanco["fechaEmision"]           = diaHoy;
                objTxtBanco["importeAbonar"]          = regImporteAbonar;
                objTxtBanco["correoBeneficiario"]     = "";
                objTxtBanco["numeroCCIAbono"]         = "";
                objTxtBanco["fechaVencimiento"]       = "";
                objTxtBanco["tipoDocIdentidad"]       = "L";
                objTxtBanco["tipoComprobante"]        = "";
                arrayDetalleTXT.push(objTxtBanco);
            }
        }
    }

    var query002 = DATA.SQL({
        no_conexi : 'wfacr',
        no_consul : "select * from pagos.pbblopag_registrar('"+ JSON.stringify(arrayEntregas) + "', " + paramFormaPago +", " + paramBancoCargo + "," + paramNroCtaCargo + ", " + paramMedioPago + ", " + USUARI.co_usuari +")",
        sg_timout : 5
    });

    var pag_to_refresh = new List();
    pag_to_refresh.add(9432);
    pag_to_refresh.add(9464);

    if (paramFormaPago == 2 || paramFormaPago == 3 || paramFormaPago == 5){ // TRANSFERENCIA | OTRAS TRASNFERENCIAS / CHEQUE
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

        var txt = DATA.CREATE_FILE({
            no_archiv : 'EntregasRendir',
            no_extens : 'txt',
            ob_dindat : query001.result
        });
        
        return OK2([{no_action:'DOWNLOAD', ur_archiv: HTTP.URL(txt)}, {no_action:'REFRESH', ls_pagina: pag_to_refresh }]);
    };

    return OK2([{no_action:'REFRESH', ls_pagina: pag_to_refresh }]);
} else if (CO_PAGBOT == 2){
    var regCodigoEntrega  = NULLIF(LS_REGIST.co_regist_25, ''); // Código de Entrega a rendir
    var regNumeroentrega  = NULLIF(LS_REGIST.co_regist_30, ''); // Número de Entrega a rendir
      
    return OK2([{no_action:'OPENPOPUP', ur_popup  : 'wf?co_conten=8183&co_conpar_1='+regNumeroentrega+'&co_conpar_2='+regCodigoEntrega}]);
}