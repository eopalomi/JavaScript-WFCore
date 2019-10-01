/*PARAMETROS*/
var p_nu_entreg = COALESCE(LS_CONPAR.co_conpar_1,null);
var p_co_entreg = COALESCE(LS_CONPAR.co_conpar_2,'');

/*LOGICA*/
var valpagJson = new ValpagJson();

var v_tx_query = 
	"SELECT pd.*, bn.no_bancos FROM pagos.pbbenpag_listar('" + p_nu_entreg + "')  as pd, pagos.tcbancos bn where pd.id_bancos = bn.id_bancos and pd.id_estpag = 1"
;
var v_va_resqry = DATA.SQL('wfacr', v_tx_query, 10); 

for each (var rs in v_va_resqry.result){  
    var rowx = new Row();
    rowx.addReg(new Reg({ co_pagreg: 10,va_pagreg: rs.co_entdet})); // Código
    rowx.addReg(new Reg({ co_pagreg: 20, va_pagreg: rs.nu_docide})); // Número de Documento de Indentidad
    rowx.addReg(new Reg({ co_pagreg: 30, va_pagreg: rs.no_person})); // Nombres y Apellidos
    rowx.addReg(new Reg({ co_pagreg: 40, va_pagreg: rs.id_bancos})); // Código de Banco
    rowx.addReg(new Reg({ co_pagreg: 45, va_pagreg: rs.no_bancos})); // Banco
    rowx.addReg(new Reg({ co_pagreg: 50,va_pagreg: rs.nu_ctaban})); // N° Cuenta Bancaria
    rowx.addReg(new Reg({ co_pagreg: 60,va_pagreg: rs.im_abonar})); // Importe

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

// far fa-trash-alt    - ICONO DELETE

/*RETORNO*/
VALPAGJS = valpagJson;