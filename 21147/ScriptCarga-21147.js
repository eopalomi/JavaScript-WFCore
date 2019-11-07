/*PARAMETROS*/

/*LOGICA*/
var valpagJson  = new ValpagJson();
var row = new Row();

var data150  = DATA.SQL('wfacr', "select nu_cantid as co_compag, nu_cantid as no_compag from generate_series(1,99) nu_cantid",  1).result; // BANCOS
var data160  = DATA.SQL('wfacr', "select nu_cantid as co_compag, case nu_cantid when 1 then 'Despachado' when 2 then 'Rechazado' end as no_compag from generate_series(1,2) nu_cantid",  1).result; // BANCOS

for (i=0; i<4; i++){
    row.addReg(new Reg({co_pagreg: 100, va_pagreg: null})); // Nro.
    row.addReg(new Reg({co_pagreg: 110, va_pagreg: 'Suministros'})); // Categoria
    row.addReg(new Reg({co_pagreg: 120, va_pagreg: 'Cartulina/Separadora'})); // Articulo
    row.addReg(new Reg({co_pagreg: 130, va_pagreg: '25'})); // Cantidad Solicitda
    row.addReg(new Reg({co_pagreg: 140, va_pagreg: '9'})); // Stock
    row.addReg(new Reg({co_pagreg: 150, va_pagreg: null, ob_dindat: data150})); // Cantidad Despachada
    row.addReg(new Reg({co_pagreg: 160, va_pagreg: 'PENDIENTE', ob_dindat: data160})); // Estado
    valpagJson.addRow(row);
};

/*DOM: Luego de cargar datos ejecutar:*/
DO_POST_LOAD_DATA = function () {
    SHOWINFO(true);
    document.getElementById('PAG' + CO_PAGINA).setAttribute('class',document.getElementById('PAG' + CO_PAGINA).getAttribute('class') + '1');
};

/*RETORNO*/
VALPAGJS = valpagJson;