/*PARAMETROS*/
var p_ti_person = COALESCE(LS_CONPAR.co_conpar_1,'');

// REGISTROS:
var r_co_tippro = NULLIF(LS_REGIST.co_regist_10,''); // Tipo de Producto
var r_co_tipper = NULLIF(LS_REGIST.co_regist_20,''); // Tipo de Persona
var r_nu_docume = NULLIF(LS_REGIST.co_regist_30,''); // Numero de Documento
var r_no_client = NULLIF(LS_REGIST.co_regist_40,''); // Nombres
var r_co_tipdoc = NULLIF(LS_REGIST.co_regist_50,''); // Tipo de Documento
var r_co_paicon = NULLIF(LS_REGIST.co_regist_60,''); // Nacionalidad
var r_co_reside = NULLIF(LS_REGIST.co_regist_70,''); // Residencia
var r_no_depart = NULLIF(LS_REGIST.co_regist_73,''); // Departamento
var r_co_provin = NULLIF(LS_REGIST.co_regist_75,''); // Provincia
var r_co_distri = COALESCE(NULLIF(LS_REGIST.co_regist_80,''), ''); // Distrito
var r_no_direcc = NULLIF(LS_REGIST.co_regist_90,''); // Dirección
var r_co_sececo = NULLIF(LS_REGIST.co_regist_100,''); // Sector Economico
var r_co_acteco = NULLIF(LS_REGIST.co_regist_110,''); // Actividad Económica
var r_co_profes = NULLIF(LS_REGIST.co_regist_120,''); // Profesión u Ocupación
var r_nu_celula = NULLIF(LS_REGIST.co_regist_125,''); // Celular
var r_nu_telfij = NULLIF(LS_REGIST.co_regist_130,''); // Teléfono Fijo
var r_im_estope = NULLIF(LS_REGIST.co_regist_140,''); // Monto estimado de operaciones (S/.)
var r_fe_nacimi = NULLIF(LS_REGIST.co_regist_150,''); // Fecha de Nacimiento
var r_co_correo = NULLIF(LS_REGIST.co_regist_160,''); // Correo
var r_de_oridin = NULLIF(LS_REGIST.co_regist_170,''); // Origen de dinero
 
	// OBTENER SI ES MAYOR DE EDAD
    var v_year = StringUtils.substring(r_fe_nacimi,6,10);
    var v_month = StringUtils.substring(r_fe_nacimi,3,5);
    var v_day = StringUtils.substring(r_fe_nacimi,0,2);
   
    var v_mydate = new Date();
    v_mydate.setFullYear(v_year, v_month-1, v_day);
    
    var currdate = new Date(); 
    var setDate = new Date();

    setDate.setFullYear(v_mydate.getFullYear() + 18, v_month-1, v_day - 1);

expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+/;

/*VALIDACION*/
if (r_co_tipdoc == null){
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_INFO, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Seleccione el tipo de documento.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if (r_nu_docume == null || r_nu_docume.trim() == ''){
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_INFO, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ingrese Número de Documento.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if (r_co_tipdoc == 'E' && r_nu_docume.length !== 11){
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_INFO, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'El Carnet de extranjería ingresado debe tener 11 dígitos.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if (r_co_tipdoc == 'D' && r_nu_docume.length !== 8){
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_INFO, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'EL DNI ingresado debe tener 8 dígitos', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if (r_no_client == null || r_no_client.trim() == ''){
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_INFO, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ingrese nombre del cliente.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null)
} else if (r_co_paicon == null){
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_INFO, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Seleccione la nacionalidad.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if (r_co_reside == null){
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_INFO, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Seleccione residencia.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if (r_no_depart == null && r_co_reside == 187){
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_INFO, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Seleccione departamento.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if (r_co_provin == null && r_co_reside == 187){
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_INFO, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Seleccione provincia.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if ((r_co_distri == null || r_co_distri == '')  && r_co_reside == 187){
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_INFO, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Seleccione distrito.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if (r_no_direcc == null || r_no_direcc.trim() == ''){
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_INFO, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ingrese dirección.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if (r_co_sececo == null){
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_INFO, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Seleccione sector económico.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if (r_co_acteco == null){
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_INFO, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Seleccione actividad económica.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if (r_co_profes == null){
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_INFO, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Seleccione profesión.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if (r_nu_celula == null || r_nu_celula.trim() == ''){
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_INFO, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ingrese celular.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if (r_im_estope == null || r_im_estope.trim() == ''){
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_INFO, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ingrese importe de operación estimado.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if (r_fe_nacimi == null){
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_INFO, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ingrese fecha de nacimiento.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if  ((currdate - setDate) <= 0){
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_INFO, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Persona ingresada es menor de edad.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if (r_co_correo == null || r_co_correo.trim() == '' ){
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_INFO, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ingrese correo.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else if ( !expr.test(r_co_correo) ){
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_INFO, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'La dirección de correo electrónico es incorrecta.', co_conten:CO_CONTEN, ca_timeout: 5});
	return OK('NONE', null, null, null);
} else if (r_de_oridin == null || r_de_oridin.trim() == ''){
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_INFO, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ingrese origen de dinero.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
} else {
    /*PROCESO*/
    /*CONVERTIR MONTO INGRESADO A DOLARES*/
    var v_tx_tipcam = DATA.SQL('wfacr',"select im_tipcamcon from mesdiner.tbtipcamcon order by fe_tipcam desc limit 1" , 10);
    var v_va_tipcam = v_tx_tipcam.result[0];
    r_im_estope = r_im_estope.replace(/,/g, '');
    
    var v_im_scorin = r_im_estope / v_va_tipcam.im_tipcamcon;
    var v_im_scorin = parseFloat(v_im_scorin).toFixed(2);

    var v_tx_evacli = "select * from mesdiner.pbevacli('" + r_nu_docume + "')";
	 
    var v_va_evacli = DATA.SQL('wfacr', v_tx_evacli, 10);  // EVALUAR SI EL CLIENTE SE ENCUENTRA EN ALGUNA LISTA DE PLAFT
    v_va_evacli = v_va_evacli.result[0];

    var v_tx_scorin = 
    "select * from mesdiner.pbscoring_laft('" +
        r_nu_docume + "','" +
        r_no_client + "'," +
        p_ti_person + "," + // Tipo de persona (N) o (J)
        r_co_profes + "," + // Profesión
        r_co_acteco + "," + // Actividad Económica
        r_co_paicon + "," + // Nacionalidad
        r_co_reside + "," + // Código de residencia
        v_im_scorin + "," + // Importe Financiero
        840         + "," + // Soles
        1           + "," + // Producto Compra y venta de dolares 
        1           + "," + // Canal de Distribución (Tradicional­)
        null        + "," + // Tipo de empresa
        null        + ",'" + // Tamaño de empresa
        r_co_distri + "'," + // Código de Ubigeo
        USUARI.co_usuari   + "," + // Usuario
        2           + ")"   // Versión
    ;
    var v_va_scorin = DATA.SQL('wfacr', v_tx_scorin, 10);
    v_va_scorin = v_va_scorin.result[0];

    var pag_to_refresh = new List();
    pag_to_refresh.add(9323);
    pag_to_refresh.add(9377);
    
    var xparams = new List();
    xparams.add(new PARAM('co_conpar_2', v_va_scorin.co_scorie));
    xparams.add(new PARAM('co_conpar_3', r_co_tipdoc)); // Tipo de Documento
    xparams.add(new PARAM('co_conpar_4', r_nu_docume)); // Numero de Documento
    xparams.add(new PARAM('co_conpar_5', r_no_client)); // Nombres
    xparams.add(new PARAM('co_conpar_6', r_co_paicon)); // Nacionalidad
    xparams.add(new PARAM('co_conpar_7', r_co_reside)); // Residencia
    xparams.add(new PARAM('co_conpar_8', r_co_distri)); // Distrito
    xparams.add(new PARAM('co_conpar_9', r_no_direcc)); // Dirección
    xparams.add(new PARAM('co_conpar_10', r_co_sececo)); // Sector Economico
    xparams.add(new PARAM('co_conpar_11', r_co_acteco)); // Actividad Económica
    xparams.add(new PARAM('co_conpar_12', r_co_profes)); // Profesión u Ocupación
    xparams.add(new PARAM('co_conpar_13', r_nu_celula)); // Celular
    xparams.add(new PARAM('co_conpar_14', r_nu_telfij)); // Teléfono Fijo
    xparams.add(new PARAM('co_conpar_15', r_im_estope)); // Monto estimado de operaciones (S/.)
    xparams.add(new PARAM('co_conpar_16', r_fe_nacimi)); // Fecha de Nacimiento
    xparams.add(new PARAM('co_conpar_17', r_co_correo)); // Correo
    xparams.add(new PARAM('co_conpar_23', r_de_oridin)); // Origen de dinero
    xparams.add(new PARAM('co_conpar_24', v_va_scorin.co_scorie)); // Origen de dinero

    //return OK('REFRESH', null, xparams, pag_to_refresh);
    return OK2({no_action : 'REFRESH', 
                ls_params : xparams, 
                ls_pagina :pag_to_refresh});

}

