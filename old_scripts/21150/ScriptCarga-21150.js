/*PARAMETROS*/

/*LOGICA*/
var valpagJson  = new ValpagJson();
var row = new Row();

for (i=0; i<25; i++){
    row.addReg(new Reg({co_pagreg: 10, va_pagreg: null})); // Nro.
    row.addReg(new Reg({co_pagreg: 20, va_pagreg: 'Suministros'})); // Categoria
    row.addReg(new Reg({co_pagreg: 30, va_pagreg: 'Cartulina/Separadora'})); // Articulo
    row.addReg(new Reg({co_pagreg: 40, va_pagreg: '1'})); // Cantidad
    row.addReg(new Reg({co_pagreg: 50, va_pagreg: 'Ciento'})); // UDM
    row.addReg(new Reg({co_pagreg: 60, va_pagreg: 'Prueba/100'})); // Descripción
    valpagJson.addRow(row);
};

/*DOM: Luego de cargar datos ejecutar:*/
DO_POST_LOAD_DATA = function () {
    SHOWINFO(true);
    document.getElementById('PAG' + CO_PAGINA).setAttribute('class',document.getElementById('PAG' + CO_PAGINA).getAttribute('class') + '1');
};

/*RETORNO*/
VALPAGJS = valpagJson;