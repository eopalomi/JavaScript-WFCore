/* PARAMETROS*/ 

/*LOGICA*/
var valpagJson = new ValpagJson();

// QUERYS:
var v_tx_query = `
    select cl.no_razsoc, cl.co_doctri, (pc.no_nombre || ' ' || pc.no_apemat) no_contac
    from clientx.listar_clientes(null) cl
        left join clientx.listar_personas_contacto(null) pc on cl.co_client = pc.co_client;
`;

var v_va_resqry = DATA.SQL('wfacr', v_tx_query, 10);

v_va_resqry.result.forEach(function(rs){
	var rowx = new Row();
	rowx.addReg(new Reg({co_pagreg:  5, va_pagreg: null, tx_pagreg: null}));
	rowx.addReg(new Reg({co_pagreg: 10, va_pagreg: rs.no_razsoc, tx_pagreg: rs.no_razsoc}));
	rowx.addReg(new Reg({co_pagreg: 20, va_pagreg: rs.co_doctri, tx_pagreg: rs.co_doctri}));
    rowx.addReg(new Reg({co_pagreg: 30, va_pagreg: rs.no_contac, tx_pagreg: rs.no_contac}));
    rowx.addReg(new Reg({co_pagreg: 40, va_pagreg: null, tx_pagreg: null}));
    rowx.addReg(new Reg({co_pagreg: 50, va_pagreg: null, tx_pagreg: null}));
    rowx.addReg(new Reg({co_pagreg: 60, va_pagreg: null, tx_pagreg: null}));
    rowx.addReg(new Reg({co_pagreg: 70, va_pagreg: null, tx_pagreg: null}));
    
	valpagJson.addRow(rowx);
});

/*DOM: Luego de cargar datos ejecutar:*/
DO_POST_LOAD_DATA = function () {
	SHOWINFO(true);
	document.getElementById('PAG'+CO_PAGINA).setAttribute('class',document.getElementById('PAG'+CO_PAGINA).getAttribute('class')+'2');
    CFGDATATABLE({
        searching: true, //no buscar
        ordering: true, //no ordenable
        paging: true, //no paginacion
        pageLength: 20 // Número de Registros por página
    });
};

/*RETORNO*/
return valpagJson;