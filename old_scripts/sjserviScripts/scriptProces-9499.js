var r_co_posven = NULLIF(LS_REGIST.co_regist_125,''); // Codigo Postventa


if (CO_PAGBOT == 2)
    return OK2([{no_action:'OPENPOPUP', ur_popup  : 'wf?co_conten=8203&co_conpar_1='+r_co_posven}]);