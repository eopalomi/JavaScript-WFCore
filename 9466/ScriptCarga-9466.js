/*PARAMETROS*/
var p_co_blopag = COALESCE(LS_CONPAR.co_conpar_3,'');
//var p_ti_objpas = COALESCE(LS_CONPAR.co_conpar_2,'');

/*LOGICA*/
var valpagJson = new ValpagJson();

var v_tx_query = 
    "SELECT * FROM pagos.pbmovimiento_contable(" + p_co_blopag + ")"  
;
    MSG.PUSH_TO_USER(USUARI.co_usuari, MSG_TYPE_SUCCESS,'ALERTA',v_tx_query, CO_CONTEN, true);

// PROCESO
var v_va_resqry = DATA.SQL('wfacr', v_tx_query, 10); 

for each (var rs in v_va_resqry.result){
    var rowx = new Row();
    rowx.add(new Reg({co_pagreg: 10, va_pagreg: null}));
    rowx.add(new Reg({co_pagreg: 20, va_pagreg: rs.co_tipaux})); // Tipo de Auxiliar
    rowx.add(new Reg({co_pagreg: 30, va_pagreg: rs.nu_docide})); // Documento<br>Identidad
    rowx.add(new Reg({co_pagreg: 40, va_pagreg: rs.no_refere})); // Referencia
    rowx.add(new Reg({co_pagreg: 60, va_pagreg: rs.nu_cuecon})); // Cuenta
    rowx.add(new Reg({co_pagreg: 70, va_pagreg: rs.no_descri})); // Descripción
    rowx.add(new Reg({co_pagreg: 80, va_pagreg: rs.im_cargmn})); // Cargo
    rowx.add(new Reg({co_pagreg: 90, va_pagreg: rs.im_abonmn})); // Abono
    rowx.add(new Reg({co_pagreg: 100, va_pagreg: rs.im_cargme})); // Cargo ME
    rowx.add(new Reg({co_pagreg: 110, va_pagreg: rs.im_abonme})); // Abono ME
    valpagJson.addRow(rowx);
}
/*DOM: Luego de cargar datos ejecutar:*/
DO_POST_LOAD_DATA = function () {
        /*document.getElementById('PAG' + CO_PAGINA)
          .getElementsByTagName('TBODY')[0]
          .getElementsByTagName('TR')[0]
          .style.display = 'none';*/
    window.parent.container(CO_PAGINA).css('width','605px');
   		 document.getElementById('PAG'+CO_PAGINA).setAttribute('class',document.getElementById('PAG'+CO_PAGINA).getAttribute('class')+'2');
SHOWINFO(true);
    };

/*RETORNO*/
VALPAGJS = valpagJson;