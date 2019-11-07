/*PARAMETROS*/

/*LOGICA*/
var valpagJson  = new ValpagJson();
var row = new Row();

row.addReg(new Reg({co_pagreg: 100, va_pagreg: 'Suministros'})); // Nro.
row.addReg(new Reg({co_pagreg: 110, va_pagreg: 'Contabilidad'})); // Area Laboral
row.addReg(new Reg({co_pagreg: 120, va_pagreg: 'Luis Perez'})); // Personal Solicitante
row.addReg(new Reg({co_pagreg: 130, va_pagreg: '2019-08-11'})); // Fecha de Requerimiento
row.addReg(new Reg({co_pagreg: 140, va_pagreg: 'Texto explicando el asunto'})); // Asunto
row.addReg(new Reg({co_pagreg: 150, va_pagreg: 'Texto explicando la justificacion'})); // Justificación
valpagJson.addRow(row);

/*DOM: Luego de cargar datos ejecutar:*/
DO_POST_LOAD_DATA = function () {
    SHOWINFO(true);
    document.getElementById('PAG' + CO_PAGINA).setAttribute('class',document.getElementById('PAG' + CO_PAGINA).getAttribute('class') + '1');
};

/*RETORNO*/
VALPAGJS = valpagJson;