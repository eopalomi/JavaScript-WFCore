// PARAMETROS

// LOGICA

// REGISTROS
var valpagJson  = new ValpagJson();
var row = new Row();

for (i=0; i<15; i++){
    row.addReg(new Reg({co_pagreg: 5, va_pagreg: null})); // Nro.
    row.addReg(new Reg({co_pagreg: 10, va_pagreg: 'Suministros'})); // Tipo Requerimiento
    row.addReg(new Reg({co_pagreg: 20, va_pagreg: '2019-09-11'})); // Fecha Requerimiento
    row.addReg(new Reg({co_pagreg: 30, va_pagreg: 'Luis Perez'})); // Usuario Solicitante
    row.addReg(new Reg({co_pagreg: 40, va_pagreg: '<font color=green>PENDIENTE</font>'})); // Estado Requerimiento
    row.addReg(new Reg({co_pagreg: 50, va_pagreg: 11 + i})); // Cantidad Articulos
    row.addReg(new Reg({co_pagreg: 60, va_pagreg: 3 + i})); // Días Transcurridos
    valpagJson.addRow(row);
};

//DOM: Luego de cargar datos ejecutar
DO_POST_LOAD_DATA = function () {
    SHOWINFO(true);
    document.getElementById('PAG' + CO_PAGINA).setAttribute('class',document.getElementById('PAG' + CO_PAGINA).getAttribute('class') + '1');
};

//RETORNO
return valpagJson;