/*PARAMETROS*/
var p_co_client = COALESCE(LS_CONPAR.co_conpar_1,'');

//
var query = `select * from clientx.listar_clientes(${p_co_client});`;
//var query = `select * from clientx.listar_clientes(12);`;
var data  = DATA.SQL('wfacr', query,  1); // BANCOS




//MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA',"EXISTEN 3 REQUERIMIENTOS DEL CONTACTO EL DIA DE HOY");
/*LOGICA*/
//LOGICA

var valpagJson = new ValpagJson();

if (p_co_client > 0) {
    data.result.forEach(function(rs){
        var query30 = `select co_person as co_compag, (no_nombre || ' ' || no_apepat) as no_compag from clientx.listar_personas_contacto(${p_co_client});`;
        var query35 = `select co_ubigeo co_compag, no_direcc no_compag from clientx.listar_direccion(${p_co_client});`;
        var data30  = DATA.SQL('wfacr', query30,  1).result; // BANCOS
        var data35  = DATA.SQL('wfacr', query35,  1).result; // BANCOS
        //MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA',"=  "+query30);
        var rowx = new Row();
        rowx.add(new Reg({co_pagreg:  10, va_pagreg: null}));
        rowx.add(new Reg({co_pagreg:  20, va_pagreg: rs.no_razsoc}));
        rowx.add(new Reg({co_pagreg:  30, va_pagreg: null, ob_dindat: data30, cf_search:{il_search: true, tx_search: 'Buscar Cliente'} }));
        rowx.add(new Reg({co_pagreg:  35, va_pagreg: null, ob_dindat: data35, cf_search:{il_search: true, tx_search: 'Buscar Cliente'} }));
        rowx.add(new Reg({co_pagreg:  38, va_pagreg: null}));
        rowx.add(new Reg({co_pagreg:  40, va_pagreg: null}));
        rowx.add(new Reg({co_pagreg:  50, va_pagreg: null}));

        valpagJson.addRow(rowx);
    });
};

/*DOM: Luego de cargar datos ejecutar:*/
DO_POST_LOAD_DATA = function () {
    SHOWINFO(true);
};

/*RETORNO*/
VALPAGJS = valpagJson;

