/*PARAMETROS*/
var p_no_busque = COALESCE(LS_CONPAR.co_conpar_1,''); /*DEFAULT*/

/*LOGICA*/
var valpagJson = new ValpagJson();

if (CO_CONTEN == 8114){
    var v_ti_report = 'GCA'; //Gerente Central de Administración y Finanzas
} else {
    var v_ti_report = 'SGT'; //Sub Gerente Tesorería
};
// QUERYS:
var v_tx_query = 
    "select * from mesdiner.pbmostrar_cliente(" + 
    null + ",'" + // Codigo de Cliente
    p_no_busque + "','" + 
    v_ti_report + "')"   
;

 if (CO_CONTEN == 8114){
     var v_co_conten = 8116;
 } else if (CO_CONTEN == 8115){
     var v_co_conten = 8121;
 };    
var v_va_resqry = DATA.SQL('wfacr', v_tx_query, 10);  // REGISTRAR EMPRESA

function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
};

for each (var rs in v_va_resqry.result){
  var url_detalle = '[<a  href="../wf?co_conten=' + v_co_conten +'&co_conpar_1=' + rs.co_client + ' " target=_parent> Evaluar </a>]';

  var rowx = new Row();
  rowx.addReg(new Reg({co_pagreg: 10, va_pagreg: rs.nu_ordcli}));
  rowx.addReg(new Reg({co_pagreg: 20, va_pagreg: rs.va_client}));
  rowx.addReg(new Reg({co_pagreg: 30, va_pagreg: rs.ti_person}));
  rowx.addReg(new Reg({co_pagreg: 40, va_pagreg: rs.co_docide}));
  rowx.addReg(new Reg({co_pagreg: 50, va_pagreg: rs.ti_docide}));
  rowx.addReg(new Reg({co_pagreg: 60, va_pagreg: rs.no_client}));
  rowx.addReg(new Reg({co_pagreg: 70, va_pagreg: rs.fe_regist}));
  rowx.addReg(new Reg({co_pagreg: 80, va_pagreg: formatNumber(rs.im_operac)}));
  rowx.addReg(new Reg({co_pagreg: 90, va_pagreg: rs.no_nivrie}));
  rowx.addReg(new Reg({co_pagreg: 100, va_pagreg: rs.ti_basneg}));
  rowx.addReg(new Reg({co_pagreg: 110, va_pagreg: rs.va_estado}));
  rowx.addReg(new Reg({co_pagreg: 120, va_pagreg: url_detalle}));
  valpagJson.addRow(rowx);
};

DO_POST_LOAD_DATA = function () {
    // window.parent.container(CO_PAGINA).css('width','700px');
    document.getElementById('PAG'+CO_PAGINA).setAttribute('class',document.getElementById('PAG'+CO_PAGINA).getAttribute('class')+'2');

    SHOWINFO(true);
    //PRINTABLE(true);
    
    CFGDATATABLE({
        searching: true, //no buscar
        ordering: true, //no ordenable
        paging: true, //no paginacion
        pageLength: 20
        //"scrollX": true, // ver scroll horizontal
        //"scrollY": true, //altura maxima de tabla  - "400px"
        //select: true //se puede seleccionar
    });


};

/*RETORNO*/
return valpagJson;

