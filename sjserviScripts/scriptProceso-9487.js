
var regCodigoCliente  = NULLIF(LS_REGIST.co_regist_10, '');
    
return OK2([{no_action:'OPENPOPUP', ur_popup  : 'wf?co_conten=8199&co_conpar_1='+regCodigoCliente}]);