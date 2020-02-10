/*PARAMETROS*/

/*LOGICA*/
var data50  = DATA.SQL('wfacr', `select ti_genero co_compag, no_genero no_compag from personx.tcgenero;`,  1).result; // GENERO
var data70  = DATA.SQL('wfacr', `select co_sigpro co_compag, no_sigpro no_compag from sjservi.tcsigpro;`,  1).result; // SIGLA PROFESION
MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA',"dato: " + `select co_sigpro co_compag, no_sigpro no_compag from sjservi.tcsigpro`);
//LOGICA
var rowx = new Row();
var valpagJson = new ValpagJson();

rowx.add(new Reg({co_pagreg: 10, va_pagreg: null}));
rowx.add(new Reg({co_pagreg: 20, va_pagreg: null}));
rowx.add(new Reg({co_pagreg: 30, va_pagreg: null}));
rowx.add(new Reg({co_pagreg: 35, va_pagreg: null}));
rowx.add(new Reg({co_pagreg: 38, va_pagreg: null}));
rowx.add(new Reg({co_pagreg: 40, va_pagreg: null}));
rowx.add(new Reg({co_pagreg: 50, va_pagreg: null, ob_dindat: data50}));
rowx.add(new Reg({co_pagreg: 60, va_pagreg: null}));
rowx.add(new Reg({co_pagreg: 65, va_pagreg: null}));
rowx.add(new Reg({co_pagreg: 70, va_pagreg: null, ob_dindat: data70}));


valpagJson.addRow(rowx);

DO_POST_LOAD_DATA = function () {
    SHOWINFO(true);
};

VALPAGJS = valpagJson;
