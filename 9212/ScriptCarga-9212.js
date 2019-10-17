/*PARAMETROS*/
var p_co_client = COALESCE(LS_CONPAR.co_conpar_1,'');
var p_ti_proces = COALESCE(LS_CONPAR.co_conpar_2,''); /*INS - INSERTAR ---- UPD - ACTUALIZAR */

// QUERYS:
var v_tx_query = 
    "select * from mesdiner.pbmostrar_cliente(" + 
    p_co_client + "," + // Codigo de Cliente
    "''" + "," +  
	"''"  + ")" 
;

// PROCESO
var data30 = DATA.SQL('wfacr', 'select co_maeban as co_compag, no_bancos as no_compag from mesdiner.tcmaeban where co_maeban <> 20 order by no_bancos', 1).result;
var data40 = DATA.SQL('wfacr', 'select co_moneda as co_compag, no_moneda as no_compag from mesdiner.tcmoneda', 1).result;
var v_va_resqry = DATA.SQL('wfacr', v_tx_query, 10);  // REGISTRAR EMPRESA
/*
var cache = CACHE.CREATEIF('CP1912',36000);
//CACHE->Data del combo 30
var data30 = cache.get('data30');
//if(data30 == null){
  data30 =  DATA.SQL('wfacr', 'select co_maeban as co_compag, no_bancos as no_compag from mesdiner.tcmaeban', 1).result;
  cache.put('data30', data30);
//}

/*LOGICA*/
var valpagJson = new ValpagJson();
//for each (var rs in v_va_resqry.result){
  //Es solo una vuelta
v_va_resqry = v_va_resqry.result[0];
var row = new Row();
row.addReg(new Reg({co_pagreg : 10, va_pagreg : v_va_resqry.no_client}));
row.addReg(new Reg({co_pagreg : 20, va_pagreg : v_va_resqry.co_docide}));
row.addReg(new Reg({co_pagreg : 30, va_pagreg : '99', ob_dindat: data30}));
row.addReg(new Reg({co_pagreg : 40, va_pagreg : '99', ob_dindat: data40}));
//row.addReg(new Reg({co_pagreg : 50, va_pagreg : ''}));
row.add(new Reg({co_pagreg : 50, ti_pagreg: 22, ls_styles:['font-weight:400', 'color: black','text-transform: uppercase']})); 
row.add(new Reg({co_pagreg : 60, ti_pagreg: 22, ls_styles:['font-weight:400', 'color: black','text-transform: uppercase']})); 
//row.addReg(new Reg({co_pagreg : 60, va_pagreg : ''}));
row.addReg(new Reg({co_pagreg : 70, va_pagreg : p_co_client}));


valpagJson.addRow(row);

if (v_va_resqry.va_person == 1){
    DO_POST_LOAD_DATA = function () {
           // document.getElementById('PAG'+CO_PAGINA).getElementsByTagName('TFOOT')[0].style.display = 'none';
            document.getElementById('BTNG3').style.display = 'none';
            SHOWINFO(true);
    };
} else {
    DO_POST_LOAD_DATA = function () {
       		 document.getElementById('BTNG4').style.display = 'none';
            //document.getElementById('PAG'+CO_PAGINA).getElementsByTagName('TFOOT')[0].style.display = 'none';
            SHOWINFO(true);
    };
};

DO_POST_LOAD_DATA = function () {
            //document.getElementById('PAG'+CO_PAGINA).getElementsByTagName('TFOOT')[0].style.display = 'none';
            SHOWINFO(false);
    AUTO_DYNAMIC(true);
    };

/*RETORNO*/
return valpagJson;

