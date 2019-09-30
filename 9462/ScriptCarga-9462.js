/*PARAMETROS*/
var p_nu_entreg = COALESCE(LS_CONPAR.co_conpar_1,'');
var p_co_entreg = COALESCE(LS_CONPAR.co_conpar_2,'');

/*LOGICA*/
var valpagJson = new ValpagJson();

var v_tx_query = 
	"SELECT nu_entren, im_tottes, no_perpri, no_descri, no_peraut FROM pagos.pblistar_pagos(3) " + 
    "where co_entren = " + p_co_entreg + " limit 1"
;

var v_va_resqry = DATA.SQL('wfacr', v_tx_query, 30).result[0];
var v_tx_abonad = DATA.SQL('wfacr','SELECT sum(im_abonar) im_abonar FROM pagos.pblistar_cuentas_entregas(' + p_nu_entreg + ') where id_estpag = 1', 30).result[0];
var v_importe = (v_va_resqry.im_tottes - v_tx_abonad.im_abonar);

if(v_importe > 0) {
	var simb = '-';
    var color = 'RED';
} else if(v_importe == 0) {
    var simb = '';
    var color = 'GREEN';
}else if(v_importe < 0) {
    var simb = '+';
    var color = 'ORANGE';
};

var rowx = new Row();
rowx.addReg(new Reg({ co_pagreg: 10,va_pagreg: v_va_resqry.nu_entren})); //N° Entrega 
rowx.addReg(new Reg({ co_pagreg: 20, va_pagreg: v_va_resqry.no_perpri})); //Personal a Rendir
rowx.addReg(new Reg({ co_pagreg: 50,va_pagreg: v_va_resqry.no_peraut})); //Autorizador
rowx.addReg(new Reg({ co_pagreg: 60,va_pagreg: v_va_resqry.im_tottes})); //Importe
rowx.addReg(new Reg({ co_pagreg: 65,va_pagreg: '<font color="' + color + '"><b>' + v_tx_abonad.im_abonar + '</b></font>'})); //Importe
rowx.addReg(new Reg({ co_pagreg: 67,va_pagreg: '<font color="' + color + '"><b>' + simb + Math.abs(v_importe) + '</b></font>'})); //Importe
rowx.addReg(new Reg({ co_pagreg: 80,va_pagreg: v_va_resqry.no_descri})); //Detalle
valpagJson.addRow(rowx);

DO_POST_LOAD_DATA = function () {
    SHOWINFO(true);
};

VALPAGJS = valpagJson;