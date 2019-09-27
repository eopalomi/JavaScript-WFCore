// VARIABLES
var fecha = new Date();
var diaUno = '1/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear();
var hoy = fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear();

/*PARAMETROS*/
var p_id_bancos = COALESCE(LS_CONPAR.co_conpar_1,null);
var p_co_tipmon = COALESCE(LS_CONPAR.co_conpar_2,null);
var p_co_filtro = COALESCE(LS_CONPAR.co_conpar_3,null);
var p_fe_inicio = COALESCE(LS_CONPAR.co_conpar_4,diaUno);
var p_fe_finale = COALESCE(LS_CONPAR.co_conpar_5,hoy);
var p_da_busque = COALESCE(LS_CONPAR.co_conpar_6,'');
var paramNroCtaCargo = COALESCE(LS_CONPAR.co_conpar_9,  9);

var valpagJson = new ValpagJson();
var row = new Row();

switch(CO_PAGREG) {
    case 10: { // BANCO
        var cacheCalc = CACHE.CREATEIF('PAG9431', -1);       // CREAR MEMORIA CACHE
        
        if (VA_PAGREG == '' || VA_PAGREG == null){
            row.add(new Reg({co_pagreg :  20, ti_estreg:'O'}));  // MONEDA
            row.add(new Reg({co_pagreg :  70, ti_estreg:'O'}));  // FORMA DE PAGO
            row.add(new Reg({co_pagreg :  90, ti_estreg:'O'}));  // CUENTA BANCARIA
            row.add(new Reg({co_pagreg : 100, ti_estreg:'O'}));  // MEDIO DE PAGO
        } else {
            cacheCalc.put(ID_FRAWOR+'REG10', VA_PAGREG);     // BANCO | GUARDAR EN CACHE

            var data20  = DATA.SQL('wfacr', 'select id_tipmon as co_compag, no_tipmon as no_compag from pagos.tctipmon order by no_tipmon desc', 1).result; // MONEDA
            var data70  = DATA.SQL('wfacr', 'select id_forpag as co_compag, no_forpag as no_compag from pagos.tcforpag order by no_forpag desc', 1).result; // FORMA DE PAGO
            var data100 = DATA.SQL('wfacr', "select id_medpag as co_compag, va_medpag || '-' ||no_medpag as no_compag from pagos.tcmedpag where il_estado order by va_medpag", 1).result;
            
            if(cacheCalc.get(ID_FRAWOR+'REG20') == null){        // MONEDA | VALIDAR SI ESTA EN CACHE
                cacheCalc.put(ID_FRAWOR+'REG20', 1);             // MONEDA | GUARDAR EN CACHE
                var valreg20 = cacheCalc.get(ID_FRAWOR+'REG20'); // MONEDA | OBTENER DE CACHE
                var data90 = DATA.SQL('wfacr',"select id_ctaban as co_compag, va_ctaban || ' - ' || no_ctaban as no_compag from pagos.tcctaban where id_bancos = " + VA_PAGREG + " order by va_ctaban", 1).result;
            } else {
                var valreg20 = cacheCalc.get(ID_FRAWOR+'REG20'); // MONEDA | OBTENER DE CACHE
                var data90 = DATA.SQL('wfacr',"select id_ctaban as co_compag, va_ctaban || ' - ' || no_ctaban as no_compag from pagos.tcctaban where id_bancos = " + VA_PAGREG + " and id_tipmon = " + valreg20 + " order by va_ctaban", 1).result;
            };

            row.add(new Reg({co_pagreg :  20, ti_estreg:'E', ob_dindat: data20}));  // MONEDA
            row.add(new Reg({co_pagreg :  70, ti_estreg:'E', ob_dindat: data70}));  // FORMA DE PAGO
            row.add(new Reg({co_pagreg :  90, ti_estreg:'E', ob_dindat: data90}));  // NUMERO DE CUENTA BANCARIA
            row.add(new Reg({co_pagreg : 100, ti_estreg:'E', ob_dindat: data100})); // MEDIO DE PAGO
        };

        // MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA',"select id_ctaban as co_compag, va_ctaban || ' - ' || no_ctaban as no_compag from pagos.tcctaban where id_bancos = " + VA_PAGREG + " and id_tipmon = " + valreg20 + " order by va_ctaban", CO_CONTEN, true);
        // MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA',"select id_ctaban as co_compag, va_ctaban || ' - ' || no_ctaban as no_compag from pagos.tcctaban where id_bancos = " + VA_PAGREG + " order by va_ctaban", CO_CONTEN, true);
      	break;
    }

    case 30: { // BUSCAR POR:
        if (VA_PAGREG == '4' || VA_PAGREG == '5'){ // FEC. MOVIMIENTO | FEC. REGISTRO
            row.add(new Reg({co_pagreg : 40, ti_pagreg:7, va_pagreg : p_fe_inicio, ti_estreg:'E'})); // FECHA INICIAL
            row.add(new Reg({co_pagreg : 50, ti_pagreg:7, va_pagreg : p_fe_finale, ti_estreg:'E'})); // FECHA FINAL
            row.add(new Reg({co_pagreg : 60, ti_pagreg:1, null      : p_fe_finale, ti_estreg:'O'})); // DATO
        } else if ( VA_PAGREG == '6' ) { // INGRESAR DATO
            row.add(new Reg({co_pagreg : 40, ti_pagreg:7, va_pagreg : p_fe_inicio, ti_estreg:'O'})); // FECHA INICIAL
            row.add(new Reg({co_pagreg : 50, ti_pagreg:7, va_pagreg : p_fe_finale, ti_estreg:'O'})); // FECHA FINAL
            row.add(new Reg({co_pagreg : 60, ti_pagreg:1, null      : p_fe_finale, ti_estreg:'E'})); // DATO
        }
        else {
            row.add(new Reg({co_pagreg : 40, ti_pagreg:7, va_pagreg : p_fe_inicio, ti_estreg:'O'})); // FECHA INICIAL
            row.add(new Reg({co_pagreg : 50, ti_pagreg:7, va_pagreg : p_fe_finale, ti_estreg:'O'})); // FECHA FINAL
            row.add(new Reg({co_pagreg : 60, ti_pagreg:1, null      : p_fe_finale, ti_estreg:'O'})); // DATO
        }
        break;
    }

    case 20: { // MONEDA
        var cacheCalc = CACHE.CREATEIF('PAG9431', -1);
        cacheCalc.put(ID_FRAWOR+'REG20', VA_PAGREG);     // MONEDA | GUARDAR EN CACHE

        var valreg10 = cacheCalc.get(ID_FRAWOR+'REG10'); // BANCO | OBTENER DE CACHE
        var valreg70 = cacheCalc.get(ID_FRAWOR+'REG70'); // FORMA DE PAGO | | OBTENER DE CACHE

        if (valreg10 != null & (valreg70 == 3 || valreg70 == 2)){
            var data90 = DATA.SQL('wfacr',"select id_ctaban as co_compag, va_ctaban || '-' || no_ctaban as no_compag from pagos.tcctaban where id_bancos = " + valreg10 + " and id_tipmon = " + VA_PAGREG + "  order by va_ctaban", 1).result;
            row.add(new Reg({co_pagreg : 90, ob_dindat: data90})); // NUMERO DE CUENTA BANCARIA
        }
        break;
    }
    
    case 70: { // FORMA DE PAGO
        var cacheCalc = CACHE.CREATEIF('PAG9431', -1);
        cacheCalc.put(ID_FRAWOR+'REG70', VA_PAGREG);  // FORMA DE PAGO | GUARDAR EN CACHE

        var valreg10 = cacheCalc.get(ID_FRAWOR+'REG10'); // BANCO | OBTENER DE CACHE
        var valreg20 = cacheCalc.get(ID_FRAWOR+'REG20'); // MONEDA | OBTENER DE CACHE
        
        if ((VA_PAGREG == 3 || VA_PAGREG == 2) & valreg10 != null) { // TRANSFERENCIA | OTRAS TRANSFERENCIAS
            var data90 = DATA.SQL('wfacr',"select id_ctaban as co_compag, va_ctaban || '-' || no_ctaban as no_compag from pagos.tcctaban where id_bancos = " + valreg10 + " and id_tipmon = " + valreg20 + "  order by va_ctaban", 1).result;
            row.add(new Reg({co_pagreg : 90, ti_estreg:'E', ob_dindat: data90})); // NUMERO DE CUENTA BANCARIA
        } else {
            row.add(new Reg({co_pagreg : 90, ti_estreg:'O'}));  // NUMERO DE CUENTA BANCARIA
        }
        break;
    }
}

valpagJson.add(row);
return valpagJson;
/*ESTO ES UN SALUDO */
/*ESTO ES UN SEGUNDO SALUDO */
/*TERCER SALUDO */
/*CUARTO SALUDO */