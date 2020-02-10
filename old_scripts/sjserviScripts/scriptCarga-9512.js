/* PARAMETROS*/ 
var p_co_envcor = COALESCE(LS_CONPAR.co_conpar_1,'');

//MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA',"CODIGO:  " + p_co_envcor);
/*LOGICA*/
var valpagJson = new ValpagJson();

// QUERYS:
var v_co_concep = new Set(['1', '2']);

if (v_co_concep.has(p_co_envcor) == false) return OK('NONE', null, null, null);


var tx_regist1 = `
TITULO: CARTA DE PRESENTACION SJ SERVI S.A.C. 2019
 
 
Señores: [NOMBRE DE EMPRESA]
 
Atención: Contacto
 
 
Nuestra empresa SJ SERVI S.A.C, está  dedicada al sector Industrial en General, Petrolero, Gas, Minera, Cementeras, Termoeléctrica, Hidroeléctricas y Pesqueras, el cual contamos con una gama óptimos Productos para brindar un mejor servicio  a nuestros clientes de diversos Sectores.
SJ SERVI S.A.C ofrece a nuestros a clientes una gama más amplia de productos que podemos suministrar en los  siguientes materiales
 
 
Adjuntamos nuestro catálogo para su revisión
 
* Juntas Espirometalica en acero inoxidable 304, 316 y aleación especial en clase 150 y 2500
* Ring Joint 
* Juntas Kammprofile
* Laminas y juntas en material sintética, PTFE, Grafito y en Teflon expandido (EPTFE )
* Espárragos y Ubotls con recubrimiento zincado, galvanizado y PTFE.
* Juntas dieléctricas 
* Planchas y fabricación de caucho
* Barras, planchas y fabricación de Teflon / Nylon / Polietileno / UHMWPE
* Bridas Welding Neck / Slip on / Ciega / Roscada / Socket Weld en material ASTM A105 / inox 304SS / Inox 316SS y Aceros especiales ( Duplex, inconel, Titanio, etc ) - Diametros de 1/2" hasta  24" en clase 150 hasta 2500 / En cara RF, FF  y RTJ 
* Conexiones soldables ( Codo, tee, reducciones, Caps ) en acero carbono / Acero inoxidables y en aleación especial  ( Duplex, inconel, Titanio, etc ) - En Schedule STD / 40 / 80 / 100 / 120 / 140 / 160 / XS / XXS
* Conexiones forjadas en acero carbono / Acero inoxidables y en aleación especial  ( Duplex, inconel, Titanio, etc ) - Clase 3000 / 6000 / 9000 en conexiones Roscadas y Socket Weld
* Válvulas compuerta, Check Swing, Globo, Bola, Trunnión, Mariposa en acero carbono / Acero inoxidables y en aleación especial  ( Duplex, inconel, Titanio, etc ) - Extremos bridados en Clase 150 / 300 / 600 / 900 / 1500 y 2500 - Extremos Socket Weld y roscado en clase 800 - 1500 - 2500
* (IMPORTACION) Tuberías y planchas en aleación especial ( Inoxidables 410 /310 / 321, Inconel, Titianio, etc )
 
[IMAGEN]
 
Cualquier consulta estamos a sus gratas órdenes.
 
Saludos cordiales 
`;

var tx_regist2 = `
    TITULO: Consulta de requerimiento de cotización - SJ SERVI S.A.C.
    Estimados :  [CONTACTO]
    Enviamos un cordial saludo y a su vez quería saber si tiene algún requerimiento de los siguientes productos.
    Favor de Escribirnos a: ventas.lima@sjservi.com

    [IMAGEN - PRODUCTOS]
`;

if (v_co_concep.has(p_co_envcor) == true) {
    //MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA',"ENTRO 1");
    var rowx = new Row();
    rowx.addReg(new Reg({co_pagreg: 10, va_pagreg: null, tx_pagreg: p_co_envcor==1?tx_regist1:p_co_envcor==2?tx_regist2:null}));
    valpagJson.addRow(rowx);
} else{
    //MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_WARNING,'ALERTA',"ENTRO 2");
    var rowx = new Row();
    //rowx.addReg(new Reg({co_pagreg: 10, va_pagreg: null, tx_pagreg:null}));
    valpagJson.addRow(rowx);
};

/*DOM: Luego de cargar datos ejecutar:*/
DO_POST_LOAD_DATA = function () {
    //document.getElementById('PAG'+ CO_PAGINA).setAttribute('class',document.getElementById('PAG'+ CO_PAGINA).getAttribute('class')+'2');
    SHOWINFO(true);
    /*CFGDATATABLE({
        searching:true, 
        ordering:false, 
        paging:true, 
        pageLength:15, 
        scrollX:true,
        scrollY:false,
        fixedHeader: true,
        "sDom":'<"H"Cfr>t<"F"ip>'
    });*/
};


/*RETORNO*/
return valpagJson;