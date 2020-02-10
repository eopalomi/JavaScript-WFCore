/*PARAMETROS*/
var p_co_client = COALESCE(LS_CONPAR.co_conpar_1,''); 

// REGISTROS:
var r_no_nombre = NULLIF(LS_REGIST.co_regist_30,''); // Nombres y Apellidos
var r_co_tipdoc = NULLIF(LS_REGIST.co_regist_35,''); // Tipo Documento
var r_co_docide = NULLIF(LS_REGIST.co_regist_40,''); // DNI
var r_no_carper = NULLIF(LS_REGIST.co_regist_50,''); // Cargo
var r_nu_telefo = NULLIF(LS_REGIST.co_regist_60,''); // Teléfono
var r_no_correo = NULLIF(LS_REGIST.co_regist_70,''); // E-mail

expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+/;
//MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA',"dato: " + isNaN(r_co_docide));
if (CO_PAGBOT  == 1) { 
    if (r_no_nombre == null || r_no_nombre.trim() == ''){
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ingrese nombre de Personal Autorizado.', co_conten:CO_CONTEN, ca_timeout: 5});
        return OK('NONE', null, null, null);
    } else if (r_co_docide == null || r_co_docide.trim() == '') {
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ingrese DNI de Personal Autorizado.', co_conten:CO_CONTEN, ca_timeout: 5});
        return OK('NONE', null, null, null);
    } else if (r_co_tipdoc == 'D' & r_co_docide.length !== 8) {
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'DNI debe tener 8 caracteres.', co_conten:CO_CONTEN, ca_timeout: 5});
        return OK('NONE', null, null, null);
    } else if (r_co_tipdoc == 'D' & isNaN(r_co_docide) == true) {
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'DNI debe contener solo números.', co_conten:CO_CONTEN, ca_timeout: 5});
        return OK('NONE', null, null, null);
    } else if (r_co_tipdoc == 'E' & r_co_docide.length !== 11) {
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Carnet de extranjeria debe tener 11 caracteres.', co_conten:CO_CONTEN, ca_timeout: 5});
          return OK('NONE', null, null, null);
    } else if (r_co_tipdoc == 'E' & isNaN(r_co_docide) == true) {
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Carnet de extranjeria debe contener solo números.', co_conten:CO_CONTEN, ca_timeout: 5});
        return OK('NONE', null, null, null);
    } else if (r_no_carper == null || r_no_carper.trim() == '') {
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ingrese cargo de Personal Autorizado.', co_conten:CO_CONTEN, ca_timeout: 5});
        return OK('NONE', null, null, null);
    } else if (r_nu_telefo == null || r_nu_telefo.trim() == '') {
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ingrese teléfono de Personal Autorizado.', co_conten:CO_CONTEN, ca_timeout: 5});
        return OK('NONE', null, null, null);
    } else if (isNaN(r_nu_telefo) == true) {
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'El número de teléfono debe contener solo números.', co_conten:CO_CONTEN, ca_timeout: 5});
        return OK('NONE', null, null, null);
    } else if (r_nu_telefo.length !== 9) {
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'El número de teléfono debe contener 9 digitos.', co_conten:CO_CONTEN, ca_timeout: 5});
        return OK('NONE', null, null, null);
    } else if (r_no_correo == null || r_no_correo.trim() == '') {
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ingrese correo de Personal Autorizado.', co_conten:CO_CONTEN, ca_timeout: 5});
        return OK('NONE', null, null, null);
    } else if ( !expr.test(r_no_correo) ){
        MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:"La dirección de correo " + r_no_correo + " es incorrecta.", co_conten:CO_CONTEN, ca_timeout: 5});
        return OK('NONE', null, null, null);
    } else {
        // QUERYS:
        var v_tx_query = 
            "select * from mesdiner.pbmovimiento_personas_autorizadas(" + 
            p_co_client + ",'" + // Codigo de Cliente
            r_no_nombre + "','" + // Nombre y Apellidos
            r_co_docide + "','" + // DNI
            r_no_carper + "','" + // Cargo
            r_nu_telefo + "','" + // Teléfono
            r_no_correo + "'," + // E-mail
            USUARI.co_usuari      + "," + // Usuario Registrante
            null        + ")"    // Código para eliminar
        ;

        // PROCESO
        var v_va_resqry = DATA.SQL('wfacr', v_tx_query, 10);  // REGISTRAR EMPRESA


        // MENSAJE DE VALIDACIÓN
        v_va_resqry = v_va_resqry.result[0];

        if(v_va_resqry.co_estado == '00'){
            //MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_SUCCESS, 'CORRECTO', "El registro se realizó correctamente");
            MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_SUCCESS, no_title:'<center><b>CORRECTO</b></center>', no_body:'El registro se realizó correctamente', co_conten:CO_CONTEN, ca_timeout: 5});

            var pag_to_refresh = new List();
            pag_to_refresh.add(9223);
            pag_to_refresh.add(9224);
            return OK('REFRESH', null, null, pag_to_refresh);

        }else{
            //MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_ERROR,'ALERTA',"Ha ocurrido un problema al intentar realizar el registro.");
            MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_ERROR, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ha ocurrido un problema al realizar el registro.', co_conten:CO_CONTEN, ca_timeout: 5});
            
            //var pag_to_refresh = new List();
            //pag_to_refresh.add(9223);
            // pag_to_refresh.add(9224);
            return OK('NONE', null, null, null);
        }

    };
} else if (CO_PAGBOT  == 3){
    var data1 = DATA.SQL("wfacr", "select count(*) cantidad from mesdiner.tbperaut where co_client = " + p_co_client + " and il_estado", 10);
    v_va_resqry = data1.result[0];
  
    if (v_va_resqry.cantidad == 0){
      MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_WARNING, no_title:'<center><b>MENSAJE DE ALERTA</b></center>', no_body:'Ingrese personal autorizado.', co_conten:CO_CONTEN, ca_timeout: 5});
      return OK('NONE', null, null, null);
    } else {
      var xparams = new List();
      xparams.add(new PARAM('co_conpar_1', p_co_client));
      return OK('REDIRECT',null, xparams, null);
    };
}

