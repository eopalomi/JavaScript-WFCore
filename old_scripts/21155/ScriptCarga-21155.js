/*PARAMETROS*/

/*LOGICA*/
var valpagJson  = new ValpagJson();
var row = new Row();

var data10  = DATA.SQL('wfacr', "select co_tipcom as co_compag, no_tipcom as no_compag from wflogist.tctipcom;", 5).result;
var data70  = DATA.SQL('wfacr', "select co_conpag as co_compag, no_conpag as no_compag from wflogist.tcconpag;", 5).result;
var data80  = DATA.SQL('wfacr', "select co_tipmon as co_compag, no_tipmon as no_compag from wflogist.tctipmon;", 5).result;
var data90  = DATA.SQL('wfacr', "select co_negaci as co_compag, no_negaci as no_compag from wflogist.tcnegaci;", 5).result;
var data100 = DATA.SQL('wfacr', "select co_negaci as co_compag, no_negaci as no_compag from wflogist.tcnegaci;", 5).result;

row.addReg(new Reg({co_pagreg:  10, va_pagreg: '20502035040'})); // Tipo de Comprobante
row.addReg(new Reg({co_pagreg:  20, va_pagreg: null, ob_dindat: data10})); // Categoria
row.addReg(new Reg({co_pagreg:  30, va_pagreg: null})); // Fecha Documento/Comprobante 
row.addReg(new Reg({co_pagreg:  40, va_pagreg: null})); // Nro. Serie 
row.addReg(new Reg({co_pagreg:  50, va_pagreg: null})); // Nro. Documento 
row.addReg(new Reg({co_pagreg:  60, va_pagreg: null})); // Motivo Compra 
row.addReg(new Reg({co_pagreg:  70, va_pagreg: null, ob_dindat: data70})); // Condicion de Pago 
row.addReg(new Reg({co_pagreg:  80, va_pagreg: null, ob_dindat: data80})); // Tipo de Moneda 
row.addReg(new Reg({co_pagreg:  90, va_pagreg: null, ob_dindat: data90})); // Afecto a IGV 
row.addReg(new Reg({co_pagreg: 100, va_pagreg: null, ob_dindat: data100})); // Incluye a IGV 
valpagJson.addRow(row);

/*DOM: Luego de cargar datos ejecutar:*/
DO_POST_LOAD_DATA = function () {
    SHOWINFO(true);
    document.getElementById('PAG' + CO_PAGINA).setAttribute('class',document.getElementById('PAG' + CO_PAGINA).getAttribute('class') + '1');
};

/*RETORNO*/
VALPAGJS = valpagJson;