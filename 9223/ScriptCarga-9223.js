/*PARAMETROS*/
var p_co_client = COALESCE(LS_CONPAR.co_conpar_1,''); /*DEFAULT*/

/*LOGICA*/
var valpagJson = new ValpagJson();

// QUERYS:
var v_tx_query = 
    "select * from mesdiner.pbmostrar_cliente(" + 
    p_co_client + "," + // Codigo de Cliente
    "''"  + "," +
 	"''"  + ")"   
;

var data10 = DATA.SQL('wfacr', "select ti_docide as co_compag, no_docide as no_compag from mesdiner.tcdocide  where ti_docide IN ('D','T','E')", 1).result;

// PROCESO
var v_va_resqry = DATA.SQL('wfacr', v_tx_query, 10);  // REGISTRAR EMPRESA

for each (var rs in v_va_resqry.result){
  var rowx = new Row();
  rowx.addReg(new Reg(10, rs.no_client, null, null, null, null, null));
  rowx.addReg(new Reg(20, rs.co_docide, null, null, null, null, null));
  rowx.addReg(new Reg(30, '', null, null, null, null, null));
  rowx.add(new Reg({co_pagreg:  35, va_pagreg: null, ob_dindat: data10})); 
  rowx.addReg(new Reg(40, '', null, null, null, null, null));
  rowx.addReg(new Reg(50, '', null, null, null, null, null));
  rowx.addReg(new Reg(60, '', null, null, null, null, null));
  rowx.addReg(new Reg(70, '', null, null, null, null, null));
  rowx.addReg(new Reg(80, p_co_client, null, null, null, null, null));

  valpagJson.addRow(rowx);
};


/*DOM: Luego de cargar datos ejecutar:*/
DO_POST_LOAD_DATA = function () {
        /*document.getElementById('PAG' + CO_PAGINA)
          .getElementsByTagName('TBODY')[0]
          .getElementsByTagName('TR')[0]
          .style.display = 'none';*/
    SHOWINFO(true);

};

/*RETORNO*/
return valpagJson;

