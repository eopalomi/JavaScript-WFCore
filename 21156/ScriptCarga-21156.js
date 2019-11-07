/*PARAMETROS*/
var p_fe_objpas = COALESCE(LS_CONPAR.co_conpar_1,'');
var p_ti_objpas = COALESCE(LS_CONPAR.co_conpar_2,'');

/*LOGICA*/
var valpagJson = new ValpagJson();

var row = new Row();
row.addReg(new Reg({co_pagreg: 100, va_pagreg: 'Sumnistros'}));
row.addReg(new Reg({co_pagreg: 110, va_pagreg: 'Comentario explicando el asunto'}));
row.addReg(new Reg({co_pagreg: 120, va_pagreg: 'Comentario explicando el Justificacion'}));
row.addReg(new Reg({co_pagreg: 130, va_pagreg: 'Suministros'}));
row.addReg(new Reg({co_pagreg: 140, va_pagreg: 'Cartulina/Separadora'}));
row.addReg(new Reg({co_pagreg: 150, va_pagreg: 'Alta'}));
row.addReg(new Reg({co_pagreg: 160, va_pagreg: '6'}));
valpagJson.addRow(row);

/*DOM: Luego de cargar datos ejecutar:*/
DO_POST_LOAD_DATA = function () {

};

/*RETORNO*/
VALPAGJS = valpagJson;