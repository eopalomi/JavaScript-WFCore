/*PARAMETROS*/
var p_co_client = COALESCE(LS_CONPAR.co_conpar_1,''); 
var p_ti_proces = COALESCE(LS_CONPAR.co_conpar_2,''); /*INS - INSERTAR ---- UPD - ACTUALIZAR */

// REGISTROS:
var r_co_maeban = NULLIF(LS_REGIST.co_regist_30,''); // Código de Banco
var r_co_moneda = NULLIF(LS_REGIST.co_regist_40,''); // Código de Moneda
var r_nu_ctaban = NULLIF(LS_REGIST.co_regist_50,''); // Número de Cuenta
var r_cu_intban = NULLIF(LS_REGIST.co_regist_60,''); // Cuenta Interbancaria

var v_nu_ctaban = DATA.SQL('wfacr', `select nu_ctaban from mesdiner.tbctaban where nu_ctaban = '${r_nu_ctaban}'`, 10);
var v_cu_intban = DATA.SQL('wfacr', `SELECT co_intban FROM mesdiner.tbctaban where co_intban = '${r_cu_intban}'`, 10);

var v_ti_person = 
    "select * from mesdiner.pbmostrar_cliente(" + 
    p_co_client + "," + // Codigo de Cliente
    "''" + "," +  
	"''"  + ")" 
;

var v_va_person = DATA.SQL('wfacr', v_ti_person, 10).result[0];  // REGISTRAR EMPRESA

if (CO_PAGBOT  == 1) {
    if (r_co_maeban == null) {
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Seleccione el banco.', co_conten:CO_CONTEN, ca_timeout: 5});
        return OK('NONE', null, null, null);
    } else if (r_co_moneda == null){
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Seleccione la moneda.', co_conten:CO_CONTEN, ca_timeout: 5});
        return OK('NONE', null, null, null);
    } else if (r_nu_ctaban == null || r_nu_ctaban.trim() == ''){
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ingrese cuenta bancaria.', co_conten:CO_CONTEN, ca_timeout: 5});
        return OK('NONE', null, null, null);
    } else {
		for each (var nu in v_nu_ctaban.result){
            if (nu.nu_ctaban != null || nu.nu_ctaban != '') {
                MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'El número de cuenta bancaria ' + r_nu_ctaban + ' ya se encuentra registrado.', co_conten:CO_CONTEN, ca_timeout: 5});
                return OK('NONE', null, null, null);
            }
        }
        
        for each (var it in v_cu_intban.result){
            if (it.cu_intban != null || it.cu_intban != '') {
                MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'El número de cuenta interbancaria ' + r_cu_intban + ' ya se encuentra registrado.', co_conten:CO_CONTEN, ca_timeout: 5});
                return OK('NONE', null, null, null);
            }
        }
        
        var v_tx_query = "select * from mesdiner.pbmovimiento_ctaban('" + 
            p_ti_proces  + "'," + // TIPO DE PROCESO
            p_co_client  + "," + // Cliente
            r_co_maeban  + "," + // Banco
            r_co_moneda  + ",'" + // Moneda
            r_nu_ctaban  + "','" + // Número de cuenta bancaria
            r_cu_intban  + "'," + // Código Interbancario
            USUARI.co_usuari    + "," + // Usuario
            null         + "," + // Código cuenta bancaria para eliminar
            null         + "," + // Código de estado de evaluación
            null         + "," + // Motivo de observación de evaluación
            null         + ")"    // Clasificación
            ;
        // PROCESO
        var v_va_resqry = DATA.SQL('wfacr', v_tx_query, 10);  // REGISTRAR EMPRESA
        
        // MENSAJE DE VALIDACIÓN
        v_va_resqry = v_va_resqry.result[0];
        
        if(v_va_resqry.co_estado == '00'){
            // MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_SUCCESS,'CORRECTO', 'El registro se realizó correctamente.');
            MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_SUCCESS, no_title:'<center><b>CORRECTO</b></center>', no_body:'El registro se realizó correctamente.', co_conten:CO_CONTEN, ca_timeout: 5});
            var pag_to_refresh = new List();
            pag_to_refresh.add(9213);
            pag_to_refresh.add(9212);
            return OK('REFRESH', null, null, pag_to_refresh);
        }else{
            // MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_ERROR,'ALERTA','Ha ocurrido un problema al realizar el registro.');
            MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_ERROR, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ha ocurrido un problema al realizar el registro. ERROR [' + v_va_resqry.no_estado + ']', co_conten:CO_CONTEN, ca_timeout: 5});
            return OK('NONE', null, null, null);
        }
    }
} else if (CO_PAGBOT  == 3) {
    var data1 = DATA.SQL("wfacr", "select count(*) cantidad from mesdiner.tbctaban where co_client = " + p_co_client + " and il_estado", 10);
    v_data1 = data1.result[0];
    
    if (v_data1.cantidad == 0){
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ingrese la cuenta bancaria del cliente.', co_conten:CO_CONTEN, ca_timeout: 5});
        return OK('NONE', null, null, null);
    } else {
        var xparams = new List();
        xparams.add(new PARAM('co_conpar_1', p_co_client));
        //LOGICA DE BOTON
        print('v_va_person.va_person:'+v_va_person.va_person);
        if (v_va_person.va_person == 1){
            return OK2({no_action:'REDIRECT', co_condes: 8057, ls_params: xparams});
        }else{
            return OK2({no_action:'REDIRECT', co_condes: 8108, ls_params: xparams});
        }
        //return OK('REDIRECT',null, xparams, null);
    }
}


