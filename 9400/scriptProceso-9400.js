//PARAMETROS
var paramClasificacion  = COALESCE(LS_CONPAR.co_conpar_1, '');
var paramBancoBusqueda  = COALESCE(LS_CONPAR.co_conpar_2, null);
var paramTipoMoneda     = COALESCE(LS_CONPAR.co_conpar_3, null);
var paramTipoProducto   = COALESCE(LS_CONPAR.co_conpar_4, null);
var paramDatoBusqueda   = COALESCE(LS_CONPAR.co_conpar_5, '');
var paramFormaPago      = COALESCE(LS_CONPAR.co_conpar_6, null);
var paramBancoCargo     = COALESCE(LS_CONPAR.co_conpar_7, '');
var paramMonedaCargo    = COALESCE(LS_CONPAR.co_conpar_8, '');
var paramNroCtaCargo    = COALESCE(LS_CONPAR.co_conpar_9, '');
var paramMedioPago      = COALESCE(LS_CONPAR.co_conpar_10, 4);

// VARIABLES
var fecha = new Date();
var diaHoy = fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear();

arrayConcesionarios = [];
arrayDetalleTXT     = [];
jsonCabeceraTXT     = {};
arrayDestinatario   = [];

var v_co_clasif = new Set(['1', '4', '5']);
var v_co_pagtes = '';

if (CO_PAGBOT == 1){ // BOTON CONFIRMAR
   LS_ALLREG.forEach(function(rs){
      if (row.co_regist_500 == true) {                               // ¿Esta Seleccionado?
         var regCodigoDetAbo        = NULLIF(row.co_regist_11, ''); // Código(id_detabo)
         var regCodBancoAbono       = NULLIF(row.co_regist_12, ''); // Código de Banco a abonar
         var regTipoDocumeIdentidad = NULLIF(row.co_regist_13, ''); // Tipo de documento de identidad
         
         var regNumeroReferencia    = NULLIF(row.co_regist_200, ''); // Credito
         var regDocumeIdentidad     = NULLIF(row.co_regist_300, ''); // Nro. Documento
         var regNombreBeneficiario  = NULLIF(row.co_regist_310, ''); // Nombre
         var regCtaBancoAbono       = NULLIF(row.co_regist_430, ''); // Cuenta Bancaria
         var regCtaInterBancoAbono  = NULLIF(row.co_regist_440, ''); // Cuenta InterBancaria
         var regImporteAbonar       = NULLIF(row.co_regist_480, ''); // Monto a Transferir
         var regImpSimuladorPend    = NULLIF(row.co_regist_490, ''); // Monto Pendiente
        
         if (paramFormaPago == null){ // FORMA DE PAGO VACIA
            var mensajeValidacion =  "Seleccione forma de pago.";
         } else if (paramFormaPago == 2 || paramFormaPago == 3) { // TRANSFERENCIA | OTRAS TRASNFERENCIAS
            if (paramNroCtaCargo == null){
                var mensajeValidacion =  "Seleccione el banco para generar el pago.";
            }
         };
        
         if ((paramBancoCargo != regCodBancoAbono) & (paramFormaPago !=5)){ // Banco de Cargo y Abono Distintos | Forma Pago Cheque Distinta Cheque
            var tipoCtaAbono = "I"; // Abono Interbancario
            if (regCtaInterBancoAbono == null || regCtaInterBancoAbono == ''){
                MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Crédito: ' + regNumeroReferencia +'. No cuenta con cuenta interbancaria registrada', co_conten:CO_CONTEN, ca_timeout: 15});
                return OK('NONE', null, null, null);
            }
         } else {
            var tipoCtaAbono = "C"; // Abono Entre Cuentas del Mismo Banco
         }
        
         if (mensajeValidacion != null){
            MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:mensajeValidacion, co_conten:CO_CONTEN, ca_timeout: 15});
            return OK('NONE', null, null, null);
         }
        
         // CREAR BLOQUE DE PAGOS
         var objBloquePago = new Object();
         objBloquePago["codigoEntDetalle"] = regCodigoDetAbo;
         objBloquePago["detalleGlosa"]     = '';
         arrayConcesionarios.push(objBloquePago);
        
         // TRANSFERENCIA | OTRAS TRASNFERENCIAS // CHEQUE
         if (paramFormaPago == 2 || paramFormaPago == 3 || paramFormaPago == 5){ 
            // CUERPO DEL TXT
            var objTxtBanco = new Object();
            objTxtBanco["numeroCtaAbono"]         = regCtaBancoAbono;
            objTxtBanco["numeroCCIAbono"]         = COALESCE(regCtaInterBancoAbono, '');
            objTxtBanco["numeroDocIdentidad"]     = regDocumeIdentidad;
            objTxtBanco["tipoDocIdentidad"]       = regTipoDocumeIdentidad;
            objTxtBanco["nombreBeneficiario"]     = regNombreBeneficiario;
            objTxtBanco["referenciaBeneficiario"] = regNombreBeneficiario;
            objTxtBanco["referenciaEmpresas"]     = regNombreBeneficiario;
            objTxtBanco["numeroComprobante"]      = regNumeroReferencia;
            objTxtBanco["fechaEmision"]           = diaHoy;
            objTxtBanco["importeAbonar"]          = regImporteAbonar;
            objTxtBanco["correoBeneficiario"]     = "";
            objTxtBanco["fechaVencimiento"]       = "";
            objTxtBanco["tipoComprobante"]        = "F";
            objTxtBanco["tipoDocumentoIdentidad"] = "6";
            objTxtBanco["tipoCtaAbono"]           = tipoCtaAbono;
            objTxtBanco["codigoBancoAbono"]       = regCodBancoAbono;
            objTxtBanco["monedaCtaBanAbono"]      = paramMonedaCargo;
            arrayDetalleTXT.push(objTxtBanco);
         }
         
         if (regImpSimuladorPend != 0.0) {
            var ObjetoDestinatario = new Object();
            ObjetoDestinatario["codigoBanco"]      = regCodBancoAbono;
            ObjetoDestinatario["numeroCtaAbono"]   = regCtaBancoAbono;
            ObjetoDestinatario["numeroCtaAbonoCCI"] = COALESCE(regCtaInterBancoAbono, '');
            ObjetoDestinatario["nombrePersonal"]   = regNombreBeneficiario.toUpperCase();
            ObjetoDestinatario["numeroDocumento"]  = regDocumeIdentidad;
            ObjetoDestinatario["importeAbono"]     = regImporteAbonar;
            ObjetoDestinatario["tipoDocIdentidad"]       = regTipoDocumeIdentidad;
            arrayDestinatario.push(ObjetoDestinatario);
            
            var query = `select 1 from pagos.pbactualizar_cuentas_entregas( 2 ,  ${paramClasificacion},  '${regNumeroReferencia}', 'A', '${JSON.stringify(arrayDestinatario)}')`;
            var v_de_detall = DATA.SQL('wfacr', query, 10); 
            
            ObjetoDestinatario = '';
            arrayDestinatario =[];
         };
      };
   });
    
    var query002 = DATA.SQL({
        no_conexi : 'wfacr',
        no_consul : "select * from pagos.pbgenerar_bloque_pagos('"+ JSON.stringify(arrayConcesionarios) + "', " + paramFormaPago +", " + paramBancoCargo + "," + paramNroCtaCargo + ", " + paramMedioPago + "," + paramMonedaCargo + ", " + USUARI.co_usuari +")",
        sg_timout : 5
    });

    var pag_to_refresh = new List();
    pag_to_refresh.add(9400);
    pag_to_refresh.add(9474);
    
    if (paramBancoCargo == 5 & paramFormaPago ==5) { // BANBIF // CHEQUE
        txt = `select * from pagos.pbgenerar_txt_cheque_banbif_json('${JSON.stringify(arrayDetalleTXT)}')`;
        //MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA', 'Entro aqui 111 :'+ txt, CO_CONTEN, true);
        var query001 = DATA.SQL({
            no_conexi : 'wfacr',
            no_consul : txt,
            sg_timout : 5
        });
        
        var txt = DATA.CREATE_FILE({
            no_archiv : nombreTXT,
            no_extens : 'txt',
            ob_dindat : query001.result
        });
        
        return OK2([{no_action:'DOWNLOAD', ur_archiv: HTTP.URL(txt)}, {no_action:'REFRESH', ls_pagina: pag_to_refresh }]);
    };

    if (paramFormaPago == 2 || paramFormaPago == 3){ // TRANSFERENCIA | OTRAS TRASNFERENCIAS
        var v_no_ctaqry = DATA.SQL('wfacr', "select id_ctaban, no_ctaban, id_tipmon from pagos.tcctaban where id_ctaban = " + paramNroCtaCargo, 5);
        var v_no_ctaban = v_no_ctaqry.status == 'ERROR' ? '': v_no_ctaqry.result[0].no_ctaban;
        v_no_ctaban = v_no_ctaban.replace(/-/g, "");
        
        jsonCabeceraTXT["numeroCtaBanCargo"] = v_no_ctaban;
        jsonCabeceraTXT["monedaCtaBanCargo"] = v_no_ctaqry.status == 'ERROR' ? '': v_no_ctaqry.result[0].id_tipmon;
        jsonCabeceraTXT["codigoCtaBanCargo"] = v_no_ctaqry.status == 'ERROR' ? '': v_no_ctaqry.result[0].id_ctaban;
        jsonCabeceraTXT["referenciaDetalle"] = "PAGO DE NO TRADICIONALES";
        jsonCabeceraTXT["codigoDocumento"]   = "";
        jsonCabeceraTXT["tipoDocumentoPago"] = "F";
        
        if (paramBancoCargo == 1) { // SCOTIABANK
            var nombreTXT = 'SCOTIABANK_NO_TRADICIONALES';
            if (v_co_clasif.has(paramClasificacion) == true) {
                if ( paramClasificacion == 4){
                    txt = "select * from pagos.pbgenerar_txt_scotiabank_json_variosTBK('"+ JSON.stringify(jsonCabeceraTXT) + "','" + JSON.stringify(arrayDetalleTXT) + "')";
                } else {
                    txt = "select * from pagos.pbgenerar_txt_scotiabank_json_proveedoresTBK('"+ JSON.stringify(jsonCabeceraTXT) + "','" + JSON.stringify(arrayDetalleTXT) + "')";
                };
            } else {
                txt = "select * from pagos.pbgenerar_txt_scotiabank_json_agrupado_proveedoresTBK('"+ JSON.stringify(jsonCabeceraTXT) + "','" + JSON.stringify(arrayDetalleTXT) + "')";
            };
        } else if (paramBancoCargo == 2){ // BBVA
            var nombreTXT = 'BBVA_NO_TRADICIONALES';
            if (v_co_clasif.has(paramClasificacion) == true) {
                txt = "select * from pagos.pbgenerar_txt_bbva_json('"+ JSON.stringify(jsonCabeceraTXT) + "','" + JSON.stringify(arrayDetalleTXT) + "')";
            } else {
                txt = "select * from pagos.pbgenerar_txt_bbva_agrupado_json('"+ JSON.stringify(jsonCabeceraTXT) + "','" + JSON.stringify(arrayDetalleTXT) + "')";
            };
        } else if (paramBancoCargo == 3){ //BCP
            var nombreTXT = 'BCP_NO_TRADICIONALES';
            if (v_co_clasif.has(paramClasificacion) == true) {               
                txt = "select * from pagos.pbgenerar_txt_bcp_json('"+ JSON.stringify(jsonCabeceraTXT) + "','" + JSON.stringify(arrayDetalleTXT) + "')";
            } else {
                txt = "select * from pagos.pbgenerar_txt_bcp_agrupado_json('"+ JSON.stringify(jsonCabeceraTXT) + "','" + JSON.stringify(arrayDetalleTXT) + "')";
            };
        } else if (paramBancoCargo == 5){ //BANBIF
            var nombreTXT = 'BANBIF_NO_TRADICIONALES';
            if (v_co_clasif.has(paramClasificacion) == true) {
                txt = "select * from pagos.pbgenerar_txt_banbif_json('"+ JSON.stringify(jsonCabeceraTXT) + "','" + JSON.stringify(arrayDetalleTXT) + "')";
            } else {
                txt = "select * from pagos.pbgenerar_txt_banbif_agrupado_json('"+ JSON.stringify(jsonCabeceraTXT) + "','" + JSON.stringify(arrayDetalleTXT) + "')";
            };
        };

        var query001 = DATA.SQL({
            no_conexi : 'wfacr',
            no_consul : txt,
            sg_timout : 5
        });
        
        var txt = DATA.CREATE_FILE({
            no_archiv : nombreTXT,
            no_extens : 'txt',
            ob_dindat : query001.result
        });
        
        return OK2([{no_action:'DOWNLOAD', ur_archiv: HTTP.URL(txt)}, {no_action:'REFRESH', ls_pagina: pag_to_refresh }]);
    };

    return OK2([{no_action:'REFRESH', ls_pagina: pag_to_refresh }]);
} else if (CO_PAGBOT == 2){
    var regCodigoDetAbono   = NULLIF(LS_REGIST.co_regist_10, ''); // CÓDIGO DETALLE ABONO
    var regNumeroDocumento  = NULLIF(LS_REGIST.co_regist_50, ''); // RUC
    var regCodigoBanco     = NULLIF(LS_REGIST.co_regist_170, ''); // BANCO
    var regCuentaBancaria  = NULLIF(LS_REGIST.co_regist_190, ''); // CUENTA BANCARIA
    var regCuentaInterBancaria   = NULLIF(LS_REGIST.co_regist_195, ''); // INTERBANCARIA

    return OK2([{no_action:'OPENPOPUP', ur_popup  : 'wf?co_conten=20100&co_conpar_1='+regNumeroDocumento+'&co_conpar_2='+paramClasificacion+'&co_conpar_3='+regCodigoBanco+'&co_conpar_4='+regCuentaBancaria+'&co_conpar_5='+regCuentaInterBancaria+'&co_conpar_6='+regCodigoDetAbono}]);
}



