var r_co_client = NULLIF(LS_REGIST.co_regist_5,''); // Numero de documento

if (CO_PAGBOT==1)
return OK2([{no_action:'OPENPOPUP', ur_popup  : 'wf?co_conten=8208&co_conpar_1='+r_co_client}]);
else if (CO_PAGBOT==2) {
    MSG.PUSH_TO_USER({co_usuari: USUARI.co_usuari, ti_messag: MSG_TYPE_SUCCESS, no_title:'<center><b>CORRECTO</b></center>', no_body:'Se envio el correo de consulta correctamente.', co_conten:CO_CONTEN, ca_timeout: 5});
    return OK('NONE', null, null, null);
}
else if (CO_PAGBOT==3)
return OK2([{no_action:'OPENPOPUP', ur_popup  : 'wf?co_conten=8205&co_conpar_1='+r_co_client}]);