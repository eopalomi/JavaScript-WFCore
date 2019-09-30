// VARIABLES
var fecha = new Date();
var diaUno = '1/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear();
var hoy = fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear();

/*PARAMETROS*/
var p_co_bancos = COALESCE(LS_CONPAR.co_conpar_1,'');
var p_co_moneda = COALESCE(LS_CONPAR.co_conpar_2,'');
var p_co_filtro = COALESCE(LS_CONPAR.co_conpar_3,'');
var p_fe_inicio = COALESCE(LS_CONPAR.co_conpar_4,diaUno);
var p_fe_finale = COALESCE(LS_CONPAR.co_conpar_5,hoy);
var p_da_busque = COALESCE(LS_CONPAR.co_conpar_6,'');
var p_id_forpag = COALESCE(LS_CONPAR.co_conpar_7,'');
var p_co_banacc = COALESCE(LS_CONPAR.co_conpar_8,'');
var p_co_ctaacc = COALESCE(LS_CONPAR.co_conpar_9,'');
var p_id_medpag = COALESCE(LS_CONPAR.co_conpar_10,4);

var data10  = DATA.SQL('wfacr', 'select id_bancos as co_compag, no_bancos as no_compag from pagos.tcbancos where il_estado AND id_bancos IN (SELECT co_bancos FROM pagos.pblistar_pagos(3) where co_estpag = 1) order by no_bancos', 1).result; // BANCOS
var data20  = DATA.SQL('wfacr', 'select id_tipmon as co_compag, no_tipmon as no_compag from pagos.tctipmon order by no_tipmon desc', 1).result; // MONEDA
var data30  = DATA.SQL('wfacr', 'select co_filtros as co_compag, no_filtros as no_compag from pagos.tcfiltros where co_tippag = 3 and co_filtros <> 2 order by no_filtros', 1).result; 
var data70  = DATA.SQL('wfacr', 'select id_forpag as co_compag, no_forpag as no_compag from pagos.tcforpag order by no_forpag desc', 1).result; // FORMA DE PAGO
var data80  = DATA.SQL('wfacr', "select ct.id_bancos as co_compag, bn.no_bancos as no_compag from pagos.tcctaban ct, pagos.tcbancos bn where bn.il_estado and bn.id_bancos = ct.id_bancos group by ct.id_bancos, bn.no_bancos order by bn.no_bancos", 1).result; // BANCOS
var data100 = DATA.SQL('wfacr', "select id_medpag as co_compag, va_medpag || '-' ||no_medpag as no_compag from pagos.tcmedpag where il_estado order by va_medpag", 1).result;

/*LOGICA*/
var valpagJson = new ValpagJson();
var rowx = new Row();

rowx.add(new Reg({co_pagreg:  10, va_pagreg: p_co_bancos, ob_dindat: data10}));     // BANCO
rowx.add(new Reg({co_pagreg:  20, va_pagreg: p_co_moneda, ob_dindat: data20}));     // MONEDA
rowx.add(new Reg({co_pagreg:  30, va_pagreg: p_co_filtro, ob_dindat: data30}));     // BUSCAR
rowx.add(new Reg({co_pagreg:  40, va_pagreg: p_fe_inicio, ti_estreg:'O'}));         // FECHA INICIAL
rowx.add(new Reg({co_pagreg:  50, va_pagreg: p_fe_finale, ti_estreg:'O'}));         // FECHA FINAL
rowx.add(new Reg({co_pagreg:  60, va_pagreg: p_da_busque}));                        // DATO BUSQUEDA
rowx.add(new Reg({co_pagreg:  70, va_pagreg: p_id_forpag, ob_dindat: data70}));     // FORMA DE PAGO
rowx.add(new Reg({co_pagreg:  80, va_pagreg: p_co_banacc, ob_dindat: data80}));     // BANCO GENERAR PAGO
rowx.add(new Reg({co_pagreg:  90, va_pagreg: p_co_ctaacc}));                        // CUENTA BANCARIA TESORERIA
rowx.add(new Reg({co_pagreg:  100, va_pagreg: p_id_medpag, ob_dindat: data100}));   // MEDIO DE PAGO
valpagJson.addRow(rowx);

DO_POST_LOAD_DATA = function () {
    SHOWINFO(true);
};

VALPAGJS = valpagJson;