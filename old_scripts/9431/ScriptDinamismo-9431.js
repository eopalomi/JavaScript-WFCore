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
var p_id_forpag = COALESCE(LS_CONPAR.co_conpar_7,'');
var paramBancoCargo = COALESCE(LS_CONPAR.co_conpar_8,'');

var p_id_ctacar = COALESCE(LS_CONPAR.co_conpar_9,null);
var p_id_medpag = COALESCE(LS_CONPAR.co_conpar_10,4);

var valpagJson = new ValpagJson();
var row = new Row();

switch(CO_PAGREG) {
    case 10: { // BANCO
        var cacheCalc = CACHE.CREATEIF('PAG9431', -1);     // CREAR MEMORIA CACHE
        var valreg70  = cacheCalc.get(ID_FRAWOR+'REG70');  // FORMA DE PAGO |  OBTENER DE CACHE
        var valreg80  = cacheCalc.get(ID_FRAWOR+'REG80');  // BANCO DE TRANSACCIÓN	| OBTENER DE CACHE
		var valreg90  = cacheCalc.get(ID_FRAWOR+'REG90');  // CTA CARGO   	 |  OBTENER DE CACHE
        var valreg100 = cacheCalc.get(ID_FRAWOR+'REG100'); // MEDIO DE PAGO |  OBTENER DE CACHE
        
        if (VA_PAGREG == '' || VA_PAGREG == null){
            row.add(new Reg({co_pagreg :  20, ti_estreg:'O'})); // MONEDA
            row.add(new Reg({co_pagreg :  70, ti_estreg:'O'})); // FORMA DE PAGO
            row.add(new Reg({co_pagreg :  80, ti_estreg:'O'})); // BANCO CARGO
            row.add(new Reg({co_pagreg :  90, ti_estreg:'O'})); // CUENTA BANCARIA
            row.add(new Reg({co_pagreg : 100, ti_estreg:'O'})); // MEDIO DE PAGO
        } else {
            cacheCalc.put(ID_FRAWOR+'REG10', VA_PAGREG); // BANCO | GUARDAR EN CACHE

            var data20  = DATA.SQL('wfacr', `select id_tipmon as co_compag, no_tipmon as no_compag from pagos.tctipmon order by no_tipmon desc` , 1).result; // MONEDA
            var data70  = DATA.SQL('wfacr', `select id_forpag as co_compag, no_forpag as no_compag from pagos.tcforpag order by no_forpag desc` , 1).result; // FORMA DE PAGO
            var data80  = DATA.SQL('wfacr', `select id_bancos as co_compag, no_bancos as no_compag from pagos.tcbancos where id_bancos in (1, 2, 3, 4, 5)` , 1).result; // BANCOS CON ARCHIVO PLANO (TXT)
            var data100 = DATA.SQL('wfacr', `select id_medpag as co_compag, va_medpag || '-' ||no_medpag as no_compag from pagos.tcmedpag where il_estado order by va_medpag`, 1).result; // MEDIOS DE PAGO
            
            if(cacheCalc.get(ID_FRAWOR+'REG20') == null){        // MONEDA | VALIDAR SI ESTA EN CACHE
                cacheCalc.put(ID_FRAWOR+'REG20', 1);             // MONEDA | GUARDAR EN CACHE
                var valreg20 = cacheCalc.get(ID_FRAWOR+'REG20'); // MONEDA | OBTENER DE CACHE
                var data90 = DATA.SQL('wfacr',`select id_ctaban as co_compag, va_ctaban || ' - ' || no_ctaban as no_compag from pagos.tcctaban where id_bancos = ${VA_PAGREG} order by va_ctaban`, 1).result;
            } else {
                var valreg20 = cacheCalc.get(ID_FRAWOR+'REG20'); // MONEDA | OBTENER DE CACHE
                var data90 = DATA.SQL('wfacr',`select id_ctaban as co_compag, va_ctaban || ' - ' || no_ctaban as no_compag from pagos.tcctaban where id_bancos = ${VA_PAGREG} and id_tipmon = ${valreg20} order by va_ctaban`, 1).result;
            };
            
            row.add(new Reg({co_pagreg :  20, va_pagreg: valreg20, ti_estreg:'E', ob_dindat: data20}));  // MONEDA
            row.add(new Reg({co_pagreg :  70, va_pagreg: valreg70, ti_estreg:'E', ob_dindat: data70}));  // FORMA DE PAGO
            row.add(new Reg({co_pagreg :  80, va_pagreg: VA_PAGREG, ti_pagreg:3, ti_estreg:'E', ob_dindat: data80}));  // FORMA DE PAGO
            row.add(new Reg({co_pagreg :  90, va_pagreg: valreg90, ti_estreg:'E', ob_dindat: data90}));  // NUMERO DE CUENTA BANCARIA
            row.add(new Reg({co_pagreg : 100, va_pagreg: valreg100, ti_estreg:'E', ob_dindat: data100})); // MEDIO DE PAGO
        };
      	break;
    }

    case 30: { // BUSCAR POR:
        if (VA_PAGREG == '4' || VA_PAGREG == '5'){ // FEC. MOVIMIENTO | FEC. REGISTRO
            row.add(new Reg({co_pagreg : 40, ti_pagreg:7, va_pagreg : p_fe_inicio, ti_estreg:'E'})); // FECHA INICIAL
            row.add(new Reg({co_pagreg : 50, ti_pagreg:7, va_pagreg : p_fe_finale, ti_estreg:'E'})); // FECHA FINAL
            row.add(new Reg({co_pagreg : 60, ti_pagreg:1, va_pagreg : p_da_busque, ti_estreg:'O'})); // DATO
        } else if ( VA_PAGREG == '6' ) { // INGRESAR DATO
            row.add(new Reg({co_pagreg : 40, ti_pagreg:7, va_pagreg : p_fe_inicio, ti_estreg:'O'})); // FECHA INICIAL
            row.add(new Reg({co_pagreg : 50, ti_pagreg:7, va_pagreg : p_fe_finale, ti_estreg:'O'})); // FECHA FINAL
            row.add(new Reg({co_pagreg : 60, ti_pagreg:1, va_pagreg : p_da_busque, ti_estreg:'E'})); // DATO
        }
        else {
            row.add(new Reg({co_pagreg : 40, ti_pagreg:7, va_pagreg : null, ti_estreg:'O'})); // FECHA INICIAL
            row.add(new Reg({co_pagreg : 50, ti_pagreg:7, va_pagreg : null, ti_estreg:'O'})); // FECHA FINAL
            row.add(new Reg({co_pagreg : 60, ti_pagreg:1, va_pagreg : null, ti_estreg:'O'})); // DATO
        }
        break;
    }

    case 20: { // MONEDA
        var cacheCalc = CACHE.CREATEIF('PAG9431', -1);   // CREAR MEMORIA CACHE
        cacheCalc.put(ID_FRAWOR+'REG20', VA_PAGREG);     // MONEDA | GUARDAR EN CACHE

        var valreg10 = cacheCalc.get(ID_FRAWOR+'REG10'); // BANCO BUSQUEDA | OBTENER DE CACHE
        var valreg80 = cacheCalc.get(ID_FRAWOR+'REG80'); // BANCO CARGO    | OBTENER DE CACHE
        var valreg70 = cacheCalc.get(ID_FRAWOR+'REG70'); // FORMA DE PAGO  | OBTENER DE CACHE
		var valreg90 = cacheCalc.get(ID_FRAWOR+'REG90'); // CTA CARGO      | OBTENER DE CACHE
        
        if (valreg10 != null && valreg80 != null && (valreg70 == 3 || valreg70 == 2)){
            var data90 = DATA.SQL('wfacr',`select id_ctaban as co_compag, va_ctaban || '-' || no_ctaban as no_compag from pagos.tcctaban where id_bancos = ${valreg80} and id_tipmon = ${VA_PAGREG} order by va_ctaban`, 1).result;
            row.add(new Reg({co_pagreg : 90, va_pagreg : valreg90, ob_dindat: data90})); // NUMERO DE CUENTA BANCARIA
        } else {
        	row.add(new Reg({co_pagreg : 90, ti_estreg:'O'}));  // NUMERO DE CUENTA BANCARIA

        }
        break;
    }
    
    case 70: { // FORMA DE PAGO
        var cacheCalc = CACHE.CREATEIF('PAG9431', -1);   // CREAR MEMORIA CACHE
        cacheCalc.put(ID_FRAWOR+'REG70', VA_PAGREG);     // FORMA DE PAGO | GUARDAR EN CACHE

        var valreg80 = cacheCalc.get(ID_FRAWOR+'REG80'); // BANCO | OBTENER DE CACHE
        var valreg20 = cacheCalc.get(ID_FRAWOR+'REG20'); // MONEDA | OBTENER DE CACHE
		var valreg90 = cacheCalc.get(ID_FRAWOR+'REG90'); // CTA CARGO   	| OBTENER DE CACHE
        //Sobreescribir parametro--COMENTADO!
        HTTP.UPDATE_CONPAR(CO_CONTEN,ID_FRAWOR, 'co_conpar_7', VA_PAGREG);
        
        if ((VA_PAGREG == 3 || VA_PAGREG == 2 || VA_PAGREG == 5) & valreg80 != null) { // TRANSFERENCIA | OTRAS TRANSFERENCIAS | CUENTA BANCARIA
            var data90 = DATA.SQL('wfacr',`select id_ctaban as co_compag, va_ctaban || '-' || no_ctaban as no_compag from pagos.tcctaban where id_bancos = ${valreg80} and id_tipmon = ${valreg20} order by va_ctaban`, 1).result;
            row.add(new Reg({co_pagreg : 90, va_pagreg : valreg90, ti_estreg:'E', ob_dindat: data90})); // NUMERO DE CUENTA BANCARIA
        } else {
            row.add(new Reg({co_pagreg : 90, ti_estreg:'O'}));  // NUMERO DE CUENTA BANCARIA
        }
        break;
    }
    case 80: { // BANCO CARGO
        var cacheCalc = CACHE.CREATEIF('PAG9431', -1);   // CREAR MEMORIA CACHE
        cacheCalc.put(ID_FRAWOR+'REG80', VA_PAGREG);     // MONEDA | GUARDAR EN CACHE
        
        HTTP.UPDATE_CONPAR(CO_CONTEN,ID_FRAWOR, 'co_conpar_8', VA_PAGREG);

        var valreg20 = cacheCalc.get(ID_FRAWOR+'REG20'); // MONEDA | GUARDAR EN CACHE
        var valreg80 = cacheCalc.get(ID_FRAWOR+'REG80'); // BANCO CARGO  	| OBTENER DE CACHE
        var valreg70 = cacheCalc.get(ID_FRAWOR+'REG70'); // FORMA DE PAGO   | OBTENER DE CACHE
        var valreg90 = cacheCalc.get(ID_FRAWOR+'REG90'); // CTA CARGO   	| OBTENER DE CACHE
        		
        if ((valreg70 == 3 || valreg70 == 2 || valreg70 == 5) & valreg80 != null) { // TRANSFERENCIA | OTRAS TRANSFERENCIAS | CUENTA BANCARIA
            var data90 = DATA.SQL('wfacr',`select id_ctaban as co_compag, va_ctaban || '-' || no_ctaban as no_compag from pagos.tcctaban where id_bancos = ${valreg80} and id_tipmon = ${valreg20} order by va_ctaban`, 1).result;
            
            row.add(new Reg({co_pagreg : 90, va_pagreg: valreg90, ti_estreg:'E', ob_dindat: data90})); // NUMERO DE CUENTA BANCARIA
        } else {
            row.add(new Reg({co_pagreg : 90, ti_estreg:'O'}));  // NUMERO DE CUENTA BANCARIA
        }
        break;
    }
    case 90: { // BANCO CARGO
        var cacheCalc = CACHE.CREATEIF('PAG9431', -1);   // CREAR MEMORIA CACHE
        cacheCalc.put(ID_FRAWOR+'REG90', VA_PAGREG);     // MONEDA | GUARDAR EN CACHE
        
        HTTP.UPDATE_CONPAR(CO_CONTEN,ID_FRAWOR, 'co_conpar_9', VA_PAGREG);
        break;
    }
    case 100: { // MEDIO DE PAGO
        var cacheCalc = CACHE.CREATEIF('PAG9431', -1);   // CREAR MEMORIA CACHE
        cacheCalc.put(ID_FRAWOR+'REG100', VA_PAGREG);     // MEDIO DE PAGO | GUARDAR EN CACHE
        
        HTTP.UPDATE_CONPAR(CO_CONTEN,ID_FRAWOR, 'co_conpar_10', VA_PAGREG);
        break;
    }
}

valpagJson.add(row);
return valpagJson;