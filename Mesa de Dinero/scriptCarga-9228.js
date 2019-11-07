/*PARAMETROS*/
var p_co_maeban = COALESCE(LS_CONPAR.co_conpar_1,''); 
var p_co_moneda = COALESCE(LS_CONPAR.co_conpar_2,'');
var p_co_busque = COALESCE(LS_CONPAR.co_conpar_3,'');

/*LOGICA*/
var valpagJson = new ValpagJson();

// QUERYS:
var v_tx_query = 
    "select * from mesdiner.pbmostrar_ctaban(" + 
    null + "," +
    null + ",'" +
    'PEND' + "','" +
    p_co_maeban + "','" +
    p_co_moneda + "','" +
    p_co_busque + "')"  // Dato de busque
;

//MSG.PUSH_TO_USER(USUARI.co_usuari,'v_tx_query:' + v_tx_query);

// PROCESO
var v_va_resqry = DATA.SQL('wfacr', v_tx_query, 10);  // REGISTRAR EMPRESA

for each (var rs in v_va_resqry.result){
    var url_eva = '<a href="../wf?co_conten=8082&co_conpar_1=' + rs.co_ctaban + '&co_conpar_2=' + rs.co_client + '" target="_parent"> [Evaluar]</a>';

    var rowx = new Row();
    rowx.addReg(new Reg(10, null, null, null, null, null, null));
    rowx.addReg(new Reg(15, null, null, null, null, null, null));
    rowx.addReg(new Reg(20, rs.co_ctaban, null, null, null, null, null));
    rowx.addReg(new Reg(25, rs.va_client, null, null, null, null, null));
    rowx.addReg(new Reg(30, rs.no_client, null, null, null, null, null));
    rowx.addReg(new Reg(40, rs.no_maeban, null, null, null, null, null));
    rowx.addReg(new Reg(50, rs.ti_moneda, null, null, null, null, null));
    rowx.addReg(new Reg(60, rs.nu_ctaban, null, null, null, null, null));
    rowx.addReg(new Reg(70, rs.nu_intban, null, null, null, null, null));
    rowx.addReg(new Reg(80, rs.fe_regist, null, null, null, null, null));
    rowx.addReg(new Reg(90, rs.no_usuari, null, null, null, null, null));
    rowx.addReg(new Reg(100, url_eva, null, null, null, null, null));

    valpagJson.addRow(rowx);
};

/*DOM: Luego de cargar datos ejecutar:*/
DO_POST_LOAD_DATA = function () {
    //window.parent.container(CO_PAGINA).css('width','1000px');
   	document.getElementById('PAG'+CO_PAGINA).setAttribute('class',document.getElementById('PAG'+CO_PAGINA).getAttribute('class')+'2');
    SHOWINFO(true);
    //PRINTABLE(true);
    //"pageLength": 20,
    CFGDATATABLE({
        searching: true, //no buscar
        ordering: true, //no ordenable
        paging: true //no paginacion
        //"pageLength": 20, // Número de Registros por página
        //"scrollX": "700px", // ver scroll horizontal // "900px"
        //"scrollY": true, //altura maxima de tabla  - "400px"
        //select: true //se puede seleccionar
    });
    
};

/*RETORNO*/
return valpagJson;

