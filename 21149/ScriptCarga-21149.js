/*PARAMETROS*/

/*LOGICA*/
var valpagJson  = new ValpagJson();
var row = new Row();
var data100 = DATA.SQL('wfacr', "SELECT co_catart AS co_compag, no_catart AS no_compag FROM wflogist.tccatart", 5).result;
var data110 = DATA.SQL('wfacr', "SELECT co_articu AS co_compag, no_articu AS no_compag FROM wflogist.tcarticu", 5).result;
var data120 = DATA.SQL('wfacr', "select nu_cantid as co_compag, nu_cantid as no_compag from generate_series(1,99) nu_cantid", 5).result;
var data130 = DATA.SQL('wfacr', "select nu_cantid as co_compag, case nu_cantid when 1 then 'Ciento' when 2 then 'Millar' when 2 then 'Caja' end as no_compag from generate_series(1,2) nu_cantid;", 5).result;

row.addReg(new Reg({co_pagreg: 100, va_pagreg: null, ob_dindat: data100})); // Categoria
row.addReg(new Reg({co_pagreg: 110, va_pagreg: null, ob_dindat: data110, cf_search:{il_search: true, tx_search: 'Buscar Articulo'}})); // Articulo
row.addReg(new Reg({co_pagreg: 120, va_pagreg: null, ob_dindat: data120})); // Cantidad
row.addReg(new Reg({co_pagreg: 130, va_pagreg: null, ob_dindat: data130})); // Unidad de Medida
row.addReg(new Reg({co_pagreg: 140, va_pagreg: 'Descripcion del articulo'})); // Descripcion
valpagJson.addRow(row);

/*DOM: Luego de cargar datos ejecutar:*/
DO_POST_LOAD_DATA = function () {
    SHOWINFO(true);
    document.getElementById('PAG' + CO_PAGINA).setAttribute('class',document.getElementById('PAG' + CO_PAGINA).getAttribute('class') + '1');
};

/*RETORNO*/
VALPAGJS = valpagJson;