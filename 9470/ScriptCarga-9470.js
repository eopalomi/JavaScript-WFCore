/*PARAMETROS*/
var p_id_tippag = COALESCE(LS_CONPAR.co_conpar_1, null);
var p_id_blopag = COALESCE(LS_CONPAR.co_conpar_2, null);

//VALIDACION
if (p_id_tippag != 1){ // PAGO PROVEEDORES - SI NO ES
    return OK('NONE', null, null, null);
};

/*LOGICA*/
var valpagJson = new ValpagJson();

if (p_id_blopag != null) {
    var v_tx_query  = "SELECT * FROM pagos.pblistar_blodet_proveedores(" + p_id_blopag + ")";
    var v_va_resqry = DATA.SQL('wfacr', v_tx_query, 10); 

    v_va_resqry.result.forEach(function(rs){
        var rowx = new Row();
        rowx.add(new Reg({co_pagreg: 10, va_pagreg: null}));
        rowx.add(new Reg({co_pagreg: 20, va_pagreg: rs.id_detabo}));  // Código<br>Abono
        rowx.add(new Reg({co_pagreg: 30, va_pagreg: rs.nu_docide}));  // RUC
        rowx.add(new Reg({co_pagreg: 40, va_pagreg: rs.no_person}));  // Razón Social
        rowx.add(new Reg({co_pagreg: 50, va_pagreg: rs.fe_docume}));  // Fecha<br>Documento
        rowx.add(new Reg({co_pagreg: 60, va_pagreg: rs.nu_refere}));  // Número<br>Documento
        rowx.add(new Reg({co_pagreg: 70, va_pagreg: rs.fe_visado}));  // Fecha<br>Visado
        rowx.add(new Reg({co_pagreg: 80, va_pagreg: rs.fe_vencim}));  // Fecha<br>Vencimiento
        rowx.add(new Reg({co_pagreg: 90, va_pagreg: rs.no_bancos}));  // Banco
        rowx.add(new Reg({co_pagreg: 100, va_pagreg: rs.no_tipmon})); // Moneda
        rowx.add(new Reg({co_pagreg: 110, va_pagreg: null}));         // Cuenta<br>Bancaria
        rowx.add(new Reg({co_pagreg: 120, va_pagreg: rs.im_abonar})); // Importe<br>Abonado
        rowx.add(new Reg({co_pagreg: 130, va_pagreg: rs.im_tottes})); // Importe<br>Total
        rowx.add(new Reg({co_pagreg: 140, va_pagreg: rs.im_pagado})); // Importe<br>Pagado
        rowx.add(new Reg({co_pagreg: 150, va_pagreg: rs.im_pendie})); // Importe<br>Pendiente
        rowx.add(new Reg({co_pagreg: 160, va_pagreg: rs.im_retenc})); // Importe de<br>Retención
        rowx.add(new Reg({co_pagreg: 170, va_pagreg: null}));         // ¿Eliminar?
        valpagJson.addRow(rowx);
    });
};

DO_POST_LOAD_DATA = function () {
    SHOWINFO(true);
};

VALPAGJS = valpagJson;