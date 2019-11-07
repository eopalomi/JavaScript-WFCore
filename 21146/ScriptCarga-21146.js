/*PARAMETROS*/

/*LOGICA*/
var valpagJson  = new ValpagJson();
var row = new Row();

for (i=0; i<15; i++){
    row.addReg(new Reg({co_pagreg: 100, va_pagreg: null})); // Nro.
    row.addReg(new Reg({co_pagreg: 110, va_pagreg: 'Contabilidad'})); // Area
    row.addReg(new Reg({co_pagreg: 120, va_pagreg: 'Luis Perez'})); // Personal
    row.addReg(new Reg({co_pagreg: 130, va_pagreg: '25'})); // Cantidad
    row.addReg(new Reg({co_pagreg: 140, va_pagreg: '2019-08-11'})); // Fecha Requerimiento
    row.addReg(new Reg({co_pagreg: 150, va_pagreg: 'Suministros'})); // TIpo
    row.addReg(new Reg({co_pagreg: 160, va_pagreg: 'San Isidro'})); // Ubicacion
    row.addReg(new Reg({co_pagreg: 170, va_pagreg: 'PENDIENTE'})); // Estado
    valpagJson.addRow(row);
};


/*DOM: Luego de cargar datos ejecutar:*/
DO_POST_LOAD_DATA = function () {
    SHOWINFO(true);
    document.getElementById('PAG' + CO_PAGINA).setAttribute('class',document.getElementById('PAG' + CO_PAGINA).getAttribute('class') + '1');
};

/*RETORNO*/
VALPAGJS = valpagJson;